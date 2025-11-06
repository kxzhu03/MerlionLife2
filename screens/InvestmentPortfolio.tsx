import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Modal
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState } from '../types';
import { PortfolioService } from '../services/PortfolioService';
import { InvestmentService } from '../services/InvestmentService';
import { ASSET_MARKET_DATA, LIABILITY_MARKET_DATA } from '../data/marketData';
import { AssetMarketData, LiabilityMarketData, Asset, Liability } from '../types/assets';
import { Investment } from '../types/investments';
import { GameService } from '../services/GameService';

type NavProp = StackNavigationProp<RootStackParamList, 'InvestmentPortfolio'>;
type RouteProps = RouteProp<RootStackParamList, 'InvestmentPortfolio'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

const InvestmentPortfolio: React.FC<Props> = ({ navigation, route }) => {
  const [gameState, setGameState] = useState<GameState>(route.params.gameState);
  const { player } = gameState;
  const [activeTab, setActiveTab] = useState<'portfolio' | 'assets' | 'store'>('portfolio');
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetMarketData | null>(null);
  const [selectedLiability, setSelectedLiability] = useState<LiabilityMarketData | null>(null);
  const [buyQuantity, setBuyQuantity] = useState('1');

  const portfolio = useMemo(() => PortfolioService.snapshotPortfolio(player), [player]);
  const legacyInvestments: Investment[] = player.investments || [];
  const availableAssets = PortfolioService.getAvailableAssets(player);
  const availableLiabilities = PortfolioService.getAvailableLiabilities(player);
  const legacyInvestmentValue = legacyInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const combinedAssetValue = portfolio.totalAssetValue + legacyInvestmentValue;
  const combinedNetWorth = combinedAssetValue - portfolio.totalLiabilityValue;
  const legacyGain = legacyInvestments.reduce((sum, inv) => sum + (inv.currentValue - inv.initialInvestment), 0);

  const handleBuyAsset = async () => {
    if (!selectedAsset) return;

    const quantity = parseFloat(buyQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      Alert.alert('Invalid Quantity', 'Please enter a valid number');
      return;
    }

    const result = PortfolioService.buyAsset(player, selectedAsset, quantity);
    
    if (result.success && result.updatedPlayer) {
      const newGameState = { ...gameState, player: result.updatedPlayer };
      await GameService.saveGameState(newGameState);
      setGameState(newGameState);
      setShowBuyModal(false);
      setBuyQuantity('1');
      setSelectedAsset(null);
      Alert.alert('Success!', result.message);
    } else {
      Alert.alert('Purchase Failed', result.message);
    }
  };

  const handleBuyLiability = async () => {
    if (!selectedLiability) return;

    const result = PortfolioService.buyLiability(player, selectedLiability);
    
    if (result.success && result.updatedPlayer) {
      const newGameState = { ...gameState, player: result.updatedPlayer };
      await GameService.saveGameState(newGameState);
      setGameState(newGameState);
      setShowBuyModal(false);
      setSelectedLiability(null);
      Alert.alert('Success!', result.message);
    } else {
      Alert.alert('Purchase Failed', result.message);
    }
  };

  const handleSellAsset = async (assetId: string) => {
    Alert.alert(
      'Sell Asset',
      'Are you sure you want to sell this asset?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sell',
          style: 'destructive',
          onPress: async () => {
            const result = PortfolioService.sellAsset(player, assetId);
            if (result.success && result.updatedPlayer) {
              const newGameState = { ...gameState, player: result.updatedPlayer };
              await GameService.saveGameState(newGameState);
              setGameState(newGameState);
              Alert.alert('Sold!', result.message);
            } else {
              Alert.alert('Sale Failed', result.message);
            }
          }
        }
      ]
    );
  };

  const handleSellLegacyInvestment = async (investmentId: string) => {
    Alert.alert(
      'Sell Investment',
      'Realise gains (or losses) from this investment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sell',
          style: 'destructive',
          onPress: async () => {
            const result = InvestmentService.sellInvestment(player, investmentId);
            if (result.success) {
              const newGameState = { ...gameState, player: result.newPlayer };
              await GameService.saveGameState(newGameState);
              setGameState(newGameState);
              Alert.alert('Sold!', result.message);
            } else {
              Alert.alert('Sale Failed', result.message);
            }
          }
        }
      ]
    );
  };

  const renderPortfolioTab = () => (
    <ScrollView style={styles.tabContent}>
      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Portfolio Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Portfolio Assets:</Text>
          <Text style={[styles.summaryValue, styles.positive]}>
            ${portfolio.totalAssetValue.toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Legacy Investments:</Text>
          <Text style={[styles.summaryValue, legacyInvestmentValue >= 0 ? styles.positive : styles.negative]}>
            ${legacyInvestmentValue.toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Asset Base:</Text>
          <Text style={[styles.summaryValue, styles.positive]}>
            ${combinedAssetValue.toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Liabilities:</Text>
          <Text style={[styles.summaryValue, styles.negative]}>
            ${portfolio.totalLiabilityValue.toLocaleString()}
          </Text>
        </View>
        <View style={[styles.summaryRow, styles.summaryDivider]}>
          <Text style={styles.summaryLabelBold}>Net Worth:</Text>
          <Text style={[styles.summaryValueBold, combinedNetWorth >= 0 ? styles.positive : styles.negative]}>
            ${combinedNetWorth.toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Monthly Income:</Text>
          <Text style={[styles.summaryValue, styles.positive]}>
            ${portfolio.monthlyIncome.toFixed(2)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Monthly Expenses:</Text>
          <Text style={[styles.summaryValue, styles.negative]}>
            ${portfolio.monthlyExpenses.toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Legacy P&amp;L:</Text>
          <Text style={[styles.summaryValue, legacyGain >= 0 ? styles.positive : styles.negative]}>
            ${legacyGain.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Assets */}
      <Text style={styles.sectionTitle}>My Assets ({portfolio.assets.length})</Text>
      {portfolio.assets.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>📊</Text>
          <Text style={styles.emptyText}>No assets yet</Text>
          <Text style={styles.emptySubtext}>Start investing to build wealth!</Text>
        </View>
      ) : (
        portfolio.assets.map((asset) => {
          const marketInfo = ASSET_MARKET_DATA.find(a => a.id === asset.marketId)
            || ASSET_MARKET_DATA.find(a => a.name === asset.name)
            || ASSET_MARKET_DATA.find(a => a.type === asset.type);
          const purchaseTotal = asset.purchasePrice * asset.quantity;
          const gain = asset.currentValue - purchaseTotal;
          return (
            <View key={asset.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemEmoji}>{marketInfo?.emoji || '📈'}</Text>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{asset.name}</Text>
                  <Text style={styles.itemType}>
                    {(marketInfo?.symbol || asset.type.toUpperCase())} • {asset.quantity} units
                  </Text>
                </View>
              </View>
              <View style={styles.itemStats}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Purchase Price:</Text>
                  <Text style={styles.statValue}>${asset.purchasePrice.toLocaleString()}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Current Value:</Text>
                  <Text style={[styles.statValue, asset.currentValue >= purchaseTotal ? styles.positive : styles.negative]}>
                    ${asset.currentValue.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Gain/Loss:</Text>
                  <Text style={[styles.statValue, gain >= 0 ? styles.positive : styles.negative]}>
                    ${gain.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Annual Return:</Text>
                  <Text style={styles.statValue}>{asset.annualReturn}%</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.sellButton}
                onPress={() => handleSellAsset(asset.id)}
              >
                <Text style={styles.sellButtonText}>Sell</Text>
              </TouchableOpacity>
            </View>
          );
        })
      )}

      {/* Legacy Investments */}
      <Text style={styles.sectionTitle}>Legacy Investments ({legacyInvestments.length})</Text>
      {legacyInvestments.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>📈</Text>
          <Text style={styles.emptyText}>No legacy investments</Text>
          <Text style={styles.emptySubtext}>Use the Invest tab to start building positions.</Text>
        </View>
      ) : (
        legacyInvestments.map((investment) => {
          const performance = InvestmentService.getInvestmentPerformance(investment);
          return (
            <View key={investment.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemEmoji}>
                  {investment.type === 'crypto' ? '🪙' : investment.type === 'bond' ? '📜' : investment.type === 'property' ? '🏠' : investment.type === 'business' ? '🏢' : '📈'}
                </Text>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{investment.name}</Text>
                  <Text style={styles.itemType}>{investment.type.toUpperCase()} • {investment.riskLevel.toUpperCase()} RISK</Text>
                </View>
              </View>
              <View style={styles.itemStats}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Initial Amount:</Text>
                  <Text style={styles.statValue}>${investment.initialInvestment.toLocaleString()}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Current Value:</Text>
                  <Text style={[styles.statValue, performance.status === 'loss' ? styles.negative : styles.positive]}>
                    ${investment.currentValue.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Gain/Loss:</Text>
                  <Text style={[styles.statValue, performance.status === 'loss' ? styles.negative : performance.status === 'profit' ? styles.positive : styles.neutral]}>
                    ${performance.gain.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ({performance.gainPercentage.toFixed(1)}%)
                  </Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Years Held:</Text>
                  <Text style={styles.statValue}>{investment.yearsHeld}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Expected Return:</Text>
                  <Text style={styles.statValue}>{investment.expectedReturn}% p.a.</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.sellButton}
                onPress={() => handleSellLegacyInvestment(investment.id)}
              >
                <Text style={styles.sellButtonText}>Sell</Text>
              </TouchableOpacity>
            </View>
          );
        })
      )}

      {/* Liabilities */}
      <Text style={styles.sectionTitle}>My Liabilities ({portfolio.liabilities.length})</Text>
      {portfolio.liabilities.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>💳</Text>
          <Text style={styles.emptyText}>No liabilities</Text>
          <Text style={styles.emptySubtext}>You're debt-free!</Text>
        </View>
      ) : (
        portfolio.liabilities.map((liability) => (
          <View key={liability.id} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemEmoji}>{LIABILITY_MARKET_DATA.find(l => l.type === liability.type)?.emoji || '🏠'}</Text>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{liability.name}</Text>
                <Text style={styles.itemType}>{liability.type.toUpperCase()}</Text>
              </View>
            </View>
            <View style={styles.itemStats}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Purchase Price:</Text>
                <Text style={styles.statValue}>${liability.purchasePrice.toLocaleString()}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Current Value:</Text>
                <Text style={styles.statValue}>${liability.currentValue.toLocaleString()}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Loan Remaining:</Text>
                <Text style={[styles.statValue, styles.negative]}>${liability.loanAmount.toLocaleString()}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Monthly Payment:</Text>
                <Text style={styles.statValue}>${liability.monthlyInstallment.toLocaleString()}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Months Remaining:</Text>
                <Text style={styles.statValue}>{liability.remainingMonths}</Text>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );

  const renderAssetsTab = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Available Investments</Text>
      <Text style={styles.sectionSubtitle}>Your wealth: ${(player.stats.wealth || 0).toLocaleString()}</Text>
      
      {availableAssets.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>💰</Text>
          <Text style={styles.emptyText}>No investments available</Text>
          <Text style={styles.emptySubtext}>Build more wealth to unlock investments!</Text>
        </View>
      ) : (
        availableAssets.map((asset) => (
          <TouchableOpacity
            key={asset.id}
            style={styles.marketCard}
            onPress={() => {
              setSelectedAsset(asset);
              setSelectedLiability(null);
              setShowBuyModal(true);
            }}
          >
            <View style={styles.marketHeader}>
              <Text style={styles.marketEmoji}>{asset.emoji}</Text>
              <View style={styles.marketInfo}>
                <Text style={styles.marketName}>{asset.name}</Text>
                <Text style={styles.marketSymbol}>{asset.symbol} • {asset.type.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={styles.marketDescription}>{asset.description}</Text>
            <View style={styles.marketStats}>
              <View style={styles.marketStatItem}>
                <Text style={styles.marketStatLabel}>Price</Text>
                <Text style={styles.marketStatValue}>${asset.currentPrice.toLocaleString()}</Text>
              </View>
              <View style={styles.marketStatItem}>
                <Text style={styles.marketStatLabel}>Return</Text>
                <Text style={[styles.marketStatValue, styles.positive]}>{asset.annualReturn}%</Text>
              </View>
              <View style={styles.marketStatItem}>
                <Text style={styles.marketStatLabel}>Risk</Text>
                <Text style={[
                  styles.marketStatValue,
                  asset.riskLevel === 'low' ? styles.positive :
                  asset.riskLevel === 'medium' ? styles.neutral :
                  styles.negative
                ]}>
                  {asset.riskLevel.toUpperCase()}
                </Text>
              </View>
              <View style={styles.marketStatItem}>
                <Text style={styles.marketStatLabel}>Min</Text>
                <Text style={styles.marketStatValue}>${asset.minInvestment.toLocaleString()}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );

  const renderStoreTab = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Store - Property & Cars</Text>
      <Text style={styles.sectionSubtitle}>Your wealth: ${(player.stats.wealth || 0).toLocaleString()}</Text>
      <Text style={styles.warningText}>⚠️ These items require monthly installments!</Text>
      
      {availableLiabilities.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>🏪</Text>
          <Text style={styles.emptyText}>No items available</Text>
          <Text style={styles.emptySubtext}>Build more wealth to unlock purchases!</Text>
        </View>
      ) : (
        availableLiabilities.map((liability) => (
          <TouchableOpacity
            key={liability.id}
            style={styles.marketCard}
            onPress={() => {
              setSelectedLiability(liability);
              setSelectedAsset(null);
              setShowBuyModal(true);
            }}
          >
            <View style={styles.marketHeader}>
              <Text style={styles.marketEmoji}>{liability.emoji}</Text>
              <View style={styles.marketInfo}>
                <Text style={styles.marketName}>{liability.name}</Text>
                <Text style={styles.marketSymbol}>{liability.type.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={styles.marketDescription}>{liability.description}</Text>
            <View style={styles.marketStats}>
              <View style={styles.marketStatItem}>
                <Text style={styles.marketStatLabel}>Price</Text>
                <Text style={styles.marketStatValue}>${liability.price.toLocaleString()}</Text>
              </View>
              <View style={styles.marketStatItem}>
                <Text style={styles.marketStatLabel}>Down Payment</Text>
                <Text style={styles.marketStatValue}>{liability.downPayment}%</Text>
              </View>
              <View style={styles.marketStatItem}>
                <Text style={styles.marketStatLabel}>Monthly</Text>
                <Text style={[styles.marketStatValue, styles.negative]}>${liability.monthlyInstallment.toLocaleString()}</Text>
              </View>
              <View style={styles.marketStatItem}>
                <Text style={styles.marketStatLabel}>Interest</Text>
                <Text style={styles.marketStatValue}>{liability.interestRate}%</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Investment Portfolio</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'portfolio' && styles.tabActive]}
          onPress={() => setActiveTab('portfolio')}
        >
          <Text style={[styles.tabText, activeTab === 'portfolio' && styles.tabTextActive]}>
            Portfolio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'assets' && styles.tabActive]}
          onPress={() => setActiveTab('assets')}
        >
          <Text style={[styles.tabText, activeTab === 'assets' && styles.tabTextActive]}>
            Invest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'store' && styles.tabActive]}
          onPress={() => setActiveTab('store')}
        >
          <Text style={[styles.tabText, activeTab === 'store' && styles.tabTextActive]}>
            Store
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'portfolio' && renderPortfolioTab()}
      {activeTab === 'assets' && renderAssetsTab()}
      {activeTab === 'store' && renderStoreTab()}

      {/* Buy Modal */}
      <Modal
        visible={showBuyModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowBuyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedAsset ? (
              <>
                <Text style={styles.modalTitle}>Buy {selectedAsset.name}</Text>
                <Text style={styles.modalEmoji}>{selectedAsset.emoji}</Text>
                <Text style={styles.modalDescription}>{selectedAsset.description}</Text>
                
                <View style={styles.modalStats}>
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>Price per unit:</Text>
                    <Text style={styles.modalStatValue}>${selectedAsset.currentPrice.toLocaleString()}</Text>
                  </View>
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>Annual return:</Text>
                    <Text style={[styles.modalStatValue, styles.positive]}>{selectedAsset.annualReturn}%</Text>
                  </View>
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>Minimum investment:</Text>
                    <Text style={styles.modalStatValue}>${selectedAsset.minInvestment.toLocaleString()}</Text>
                  </View>
                </View>

                <Text style={styles.inputLabel}>Quantity:</Text>
                <TextInput
                  style={styles.input}
                  value={buyQuantity}
                  onChangeText={setBuyQuantity}
                  keyboardType="numeric"
                  returnKeyType="done"
                  blurOnSubmit={true}
                  onSubmitEditing={() => handleBuyAsset()}
                  placeholder="Enter quantity"
                />
                <Text style={styles.totalCost}>
                  Total: ${(parseFloat(buyQuantity || '0') * selectedAsset.currentPrice).toLocaleString()}
                </Text>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalButtonCancel]}
                    onPress={() => setShowBuyModal(false)}
                  >
                    <Text style={styles.modalButtonTextCancel}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalButtonConfirm]}
                    onPress={handleBuyAsset}
                  >
                    <Text style={styles.modalButtonTextConfirm}>Buy</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : selectedLiability ? (
              <>
                <Text style={styles.modalTitle}>Buy {selectedLiability.name}</Text>
                <Text style={styles.modalEmoji}>{selectedLiability.emoji}</Text>
                <Text style={styles.modalDescription}>{selectedLiability.description}</Text>
                
                <View style={styles.modalStats}>
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>Price:</Text>
                    <Text style={styles.modalStatValue}>${selectedLiability.price.toLocaleString()}</Text>
                  </View>
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>Down payment ({selectedLiability.downPayment}%):</Text>
                    <Text style={[styles.modalStatValue, styles.negative]}>
                      ${((selectedLiability.price * selectedLiability.downPayment) / 100).toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>Monthly installment:</Text>
                    <Text style={[styles.modalStatValue, styles.negative]}>
                      ${selectedLiability.monthlyInstallment.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>Loan tenure:</Text>
                    <Text style={styles.modalStatValue}>{selectedLiability.loanTenure} months</Text>
                  </View>
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>Interest rate:</Text>
                    <Text style={styles.modalStatValue}>{selectedLiability.interestRate}%</Text>
                  </View>
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalButtonCancel]}
                    onPress={() => setShowBuyModal(false)}
                  >
                    <Text style={styles.modalButtonTextCancel}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalButtonConfirm]}
                    onPress={handleBuyLiability}
                  >
                    <Text style={styles.modalButtonTextConfirm}>Buy</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
  },
  headerRight: {
    width: 50,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#4A90E2',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#718096',
  },
  tabTextActive: {
    color: '#4A90E2',
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryDivider: {
    borderTopWidth: 2,
    borderTopColor: '#E2E8F0',
    marginTop: 8,
    paddingTop: 16,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#718096',
  },
  summaryLabelBold: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A202C',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  summaryValueBold: {
    fontSize: 18,
    fontWeight: '700',
  },
  positive: {
    color: '#48BB78',
  },
  negative: {
    color: '#F56565',
  },
  neutral: {
    color: '#ED8936',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 16,
  },
  warningText: {
    fontSize: 14,
    color: '#ED8936',
    marginBottom: 16,
    fontWeight: '600',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#718096',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 2,
  },
  itemType: {
    fontSize: 12,
    color: '#718096',
  },
  itemStats: {
    marginTop: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#718096',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A202C',
  },
  sellButton: {
    marginTop: 12,
    backgroundColor: '#F56565',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  sellButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  marketCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  marketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  marketEmoji: {
    fontSize: 40,
    marginRight: 12,
  },
  marketInfo: {
    flex: 1,
  },
  marketName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 2,
  },
  marketSymbol: {
    fontSize: 12,
    color: '#718096',
  },
  marketDescription: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 12,
    lineHeight: 20,
  },
  marketStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marketStatItem: {
    alignItems: 'center',
  },
  marketStatLabel: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 4,
  },
  marketStatValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A202C',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalEmoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  modalStats: {
    marginBottom: 16,
  },
  modalStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  modalStatLabel: {
    fontSize: 14,
    color: '#718096',
  },
  modalStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A202C',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  totalCost: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A90E2',
    textAlign: 'right',
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#E2E8F0',
  },
  modalButtonConfirm: {
    backgroundColor: '#4A90E2',
  },
  modalButtonTextCancel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A5568',
  },
  modalButtonTextConfirm: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default InvestmentPortfolio;
