import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Dimensions,
  Modal,
  TextInput
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState, Player } from '../types';
import { InvestmentService, Investment } from '../services/InvestmentService';
import { GameService } from '../services/GameService';
import { Colors, BorderRadius, Spacing, Typography } from '../theme/colors';

type NavProp = StackNavigationProp<RootStackParamList, 'InvestmentPortfolio'>;
type RouteProps = RouteProp<RootStackParamList, 'InvestmentPortfolio'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

interface InvestmentMarketData {
  id: string;
  name: string;
  symbol: string;
  type: 'stock' | 'crypto' | 'bond';
  currentPrice: number;
  previousPrice: number;
  riskLevel: 'low' | 'medium' | 'high';
  volatility: number;
  description: string;
  minInvestment: number;
  expectedReturn: number;
}

const MARKET_DATA: InvestmentMarketData[] = [
  // Singapore Blue Chip Stocks
  {
    id: 'dbs',
    name: 'DBS Bank',
    symbol: 'DBS',
    type: 'stock',
    currentPrice: 35.50,
    previousPrice: 35.20,
    riskLevel: 'low',
    volatility: 0.02,
    description: 'Singapore\'s largest bank. Stable dividend yields.',
    minInvestment: 1000,
    expectedReturn: 5
  },
  {
    id: 'ocbc',
    name: 'OCBC Bank',
    symbol: 'OCBC',
    type: 'stock',
    currentPrice: 12.80,
    previousPrice: 12.65,
    riskLevel: 'low',
    volatility: 0.015,
    description: 'Established bank with strong fundamentals.',
    minInvestment: 1000,
    expectedReturn: 4.5
  },
  {
    id: 'uob',
    name: 'UOB Bank',
    symbol: 'UOB',
    type: 'stock',
    currentPrice: 28.90,
    previousPrice: 28.50,
    riskLevel: 'low',
    volatility: 0.018,
    description: 'Major regional bank with growth potential.',
    minInvestment: 1000,
    expectedReturn: 5.5
  },
  {
    id: 'singtel',
    name: 'Singtel',
    symbol: 'ST',
    type: 'stock',
    currentPrice: 3.45,
    previousPrice: 3.50,
    riskLevel: 'low',
    volatility: 0.02,
    description: 'Singapore\'s largest telecom provider.',
    minInvestment: 1000,
    expectedReturn: 4
  },

  // Growth Stocks
  {
    id: 'sea',
    name: 'Sea Limited',
    symbol: 'SE',
    type: 'stock',
    currentPrice: 85.20,
    previousPrice: 82.10,
    riskLevel: 'high',
    volatility: 0.08,
    description: 'E-commerce and fintech giant. High growth potential.',
    minInvestment: 5000,
    expectedReturn: 15
  },
  {
    id: 'grab',
    name: 'Grab Holdings',
    symbol: 'GRAB',
    type: 'stock',
    currentPrice: 4.50,
    previousPrice: 4.35,
    riskLevel: 'high',
    volatility: 0.1,
    description: 'Ride-hailing and delivery platform. Volatile but growing.',
    minInvestment: 5000,
    expectedReturn: 20
  },

  // Cryptocurrencies
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    type: 'crypto',
    currentPrice: 45000,
    previousPrice: 43000,
    riskLevel: 'high',
    volatility: 0.15,
    description: 'The original cryptocurrency. Highly volatile.',
    minInvestment: 10000,
    expectedReturn: 25
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    type: 'crypto',
    currentPrice: 2500,
    previousPrice: 2400,
    riskLevel: 'high',
    volatility: 0.18,
    description: 'Smart contract platform. High volatility.',
    minInvestment: 5000,
    expectedReturn: 30
  },

  // Bonds
  {
    id: 'sgb',
    name: 'Singapore Government Bonds',
    symbol: 'SGB',
    type: 'bond',
    currentPrice: 100,
    previousPrice: 100,
    riskLevel: 'low',
    volatility: 0.005,
    description: 'Safe investment with guaranteed returns.',
    minInvestment: 5000,
    expectedReturn: 2.5
  },
  {
    id: 'corporate_bond',
    name: 'Corporate Bonds',
    symbol: 'CORP',
    type: 'bond',
    currentPrice: 98.50,
    previousPrice: 99.00,
    riskLevel: 'medium',
    volatility: 0.03,
    description: 'Higher yield than government bonds.',
    minInvestment: 5000,
    expectedReturn: 5
  }
];

const InvestmentPortfolio: React.FC<Props> = ({ navigation, route }) => {
  const [gameState, setGameState] = useState<GameState>(route.params.gameState);
  const { player } = gameState;
  const [marketData, setMarketData] = useState<InvestmentMarketData[]>(MARKET_DATA);
  const [selectedInvestment, setSelectedInvestment] = useState<InvestmentMarketData | null>(null);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyAmount, setBuyAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'market' | 'portfolio' | 'insurance'>('market');

  // Simulate market fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prevData =>
        prevData.map(investment => {
          const volatility = investment.volatility;
          const randomChange = (Math.random() - 0.5) * 2 * volatility;
          const newPrice = investment.currentPrice * (1 + randomChange);

          return {
            ...investment,
            previousPrice: investment.currentPrice,
            currentPrice: Math.max(0, newPrice)
          };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getPriceChange = (investment: InvestmentMarketData) => {
    const change = investment.currentPrice - investment.previousPrice;
    const changePercent = (change / investment.previousPrice) * 100;
    return { change, changePercent };
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return Colors.success.main;
    if (change < 0) return Colors.error.main;
    return Colors.neutral.gray500;
  };

  const handleBuyInvestment = async () => {
    if (!selectedInvestment || !buyAmount) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }

    const amount = parseFloat(buyAmount);
    const totalCost = amount * selectedInvestment.currentPrice;

    if (totalCost > (player.stats.wealth || 0)) {
      Alert.alert('Insufficient Funds', `You need $${totalCost.toFixed(2)} but only have $${(player.stats.wealth || 0).toFixed(2)}`);
      return;
    }

    if (amount < 1) {
      Alert.alert('Invalid Amount', 'Please enter a valid quantity');
      return;
    }

    const newInvestment: Investment = {
      id: `${selectedInvestment.id}_${Date.now()}`,
      name: selectedInvestment.name,
      type: selectedInvestment.type,
      initialInvestment: totalCost,
      currentValue: totalCost,
      yearsHeld: 0,
      riskLevel: selectedInvestment.riskLevel,
      expectedReturn: selectedInvestment.expectedReturn,
      description: selectedInvestment.description
    };

    const updatedPlayer = { ...player };
    updatedPlayer.stats.wealth = (updatedPlayer.stats.wealth || 0) - totalCost;

    if (!updatedPlayer.investments) {
      updatedPlayer.investments = [];
    }
    updatedPlayer.investments.push(newInvestment);

    const newGameState = { ...gameState, player: updatedPlayer };
    await GameService.saveGameState(newGameState);
    setGameState(newGameState);

    Alert.alert(
      'Purchase Successful',
      `Bought ${amount} units of ${selectedInvestment.name} for $${totalCost.toFixed(2)}`
    );

    setBuyAmount('');
    setShowBuyModal(false);
    setSelectedInvestment(null);
  };

  const handleSellInvestment = async (investment: Investment) => {
    const { success, newPlayer, proceeds, message } = InvestmentService.sellInvestment(gameState.player, investment.id);

    if (success) {
      const newGameState = { ...gameState, player: newPlayer };
      await GameService.saveGameState(newGameState);
      setGameState(newGameState);
      Alert.alert('Sale Successful', message);
    } else {
      Alert.alert('Error', message);
    }
  };

  const getPortfolioValue = () => {
    if (!player.investments) return 0;
    return player.investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  };

  const getTotalGainLoss = () => {
    if (!player.investments) return 0;
    return player.investments.reduce((sum, inv) => sum + (inv.currentValue - inv.initialInvestment), 0);
  };

  const renderMarketTab = () => (
    <FlatList
      data={marketData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        const { change, changePercent } = getPriceChange(item);
        const canAfford = (player.stats.wealth || 0) >= item.minInvestment;

        return (
          <TouchableOpacity
            style={[styles.marketCard, !canAfford && styles.marketCardDisabled]}
            onPress={() => {
              if (canAfford) {
                setSelectedInvestment(item);
                setShowBuyModal(true);
              } else {
                Alert.alert('Insufficient Funds', `Minimum investment: $${item.minInvestment}`);
              }
            }}
            disabled={!canAfford}
          >
            <View style={styles.marketCardHeader}>
              <View>
                <Text style={styles.investmentName}>{item.name}</Text>
                <Text style={styles.investmentSymbol}>{item.symbol}</Text>
              </View>
              <View style={styles.riskBadge}>
                <Text style={[styles.riskBadgeText, { color: item.riskLevel === 'low' ? Colors.success.main : item.riskLevel === 'medium' ? Colors.warning.main : Colors.error.main }]}>
                  {item.riskLevel.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.marketCardContent}>
              <View style={styles.priceSection}>
                <Text style={styles.price}>${item.currentPrice.toFixed(2)}</Text>
                <View style={[styles.changeIndicator, { backgroundColor: getPriceChangeColor(change) }]}>
                  <Text style={styles.changeText}>
                    {change > 0 ? '+' : ''}{changePercent.toFixed(2)}%
                  </Text>
                </View>
              </View>

              <Text style={styles.description}>{item.description}</Text>

              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Expected Return</Text>
                  <Text style={styles.statValue}>{item.expectedReturn}%</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Min Investment</Text>
                  <Text style={styles.statValue}>${item.minInvestment}</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Type</Text>
                  <Text style={styles.statValue}>{item.type}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      scrollEnabled={false}
    />
  );

  const renderPortfolioTab = () => (
    <View>
      {player.investments && player.investments.length > 0 ? (
        <>
          <View style={styles.portfolioSummary}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Portfolio Value</Text>
              <Text style={styles.summaryValue}>${getPortfolioValue().toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryCard, { backgroundColor: getTotalGainLoss() >= 0 ? Colors.success.bg : Colors.error.bg }]}>
              <Text style={styles.summaryLabel}>Total Gain/Loss</Text>
              <Text style={[styles.summaryValue, { color: getTotalGainLoss() >= 0 ? Colors.success.main : Colors.error.main }]}>
                {getTotalGainLoss() >= 0 ? '+' : ''}${getTotalGainLoss().toFixed(2)}
              </Text>
            </View>
          </View>

          <FlatList
            data={player.investments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const gainLoss = item.currentValue - item.initialInvestment;
              const gainLossPercent = (gainLoss / item.initialInvestment) * 100;

              return (
                <View style={styles.investmentCard}>
                  <View style={styles.investmentHeader}>
                    <View>
                      <Text style={styles.investmentName}>{item.name}</Text>
                      <Text style={styles.investmentMeta}>{item.type} • {item.yearsHeld} years</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.sellButton}
                      onPress={() => handleSellInvestment(item)}
                    >
                      <Text style={styles.sellButtonText}>Sell</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.investmentDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Initial</Text>
                      <Text style={styles.detailValue}>${item.initialInvestment.toFixed(2)}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Current Value</Text>
                      <Text style={styles.detailValue}>${item.currentValue.toFixed(2)}</Text>
                    </View>
                    <View style={[styles.detailRow, { borderTopWidth: 1, borderTopColor: Colors.neutral.gray200, paddingTop: Spacing.sm, marginTop: Spacing.sm }]}>
                      <Text style={styles.detailLabel}>Gain/Loss</Text>
                      <Text style={[styles.detailValue, { color: gainLoss >= 0 ? Colors.success.main : Colors.error.main }]}>
                        {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
            scrollEnabled={false}
          />
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateEmoji}>📈</Text>
          <Text style={styles.emptyStateTitle}>No Investments Yet</Text>
          <Text style={styles.emptyStateText}>Start investing in the Market tab to build your portfolio</Text>
        </View>
      )}
    </View>
  );

  const renderInsuranceTab = () => (
    <View>
      <View style={styles.insuranceInfo}>
        <Text style={styles.insuranceTitle}>Insurance Plans</Text>
        <Text style={styles.insuranceSubtitle}>Protect your wealth and health</Text>
      </View>

      <View style={styles.insuranceCard}>
        <View style={styles.insuranceHeader}>
          <Text style={styles.insurancePlanName}>Health Insurance</Text>
          <Text style={styles.insurancePlanPrice}>$50/month</Text>
        </View>
        <Text style={styles.insuranceDescription}>
          Covers medical expenses up to $100,000 annually. 80% reimbursement rate.
        </Text>
        <TouchableOpacity style={styles.insuranceButton}>
          <Text style={styles.insuranceButtonText}>Purchase</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.insuranceCard}>
        <View style={styles.insuranceHeader}>
          <Text style={styles.insurancePlanName}>Life Insurance</Text>
          <Text style={styles.insurancePlanPrice}>$30/month</Text>
        </View>
        <Text style={styles.insuranceDescription}>
          $500,000 coverage for your family. Protects your loved ones.
        </Text>
        <TouchableOpacity style={styles.insuranceButton}>
          <Text style={styles.insuranceButtonText}>Purchase</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.insuranceCard}>
        <View style={styles.insuranceHeader}>
          <Text style={styles.insurancePlanName}>Property Insurance</Text>
          <Text style={styles.insurancePlanPrice}>$40/month</Text>
        </View>
        <Text style={styles.insuranceDescription}>
          Covers your HDB/property against damage and theft.
        </Text>
        <TouchableOpacity style={styles.insuranceButton}>
          <Text style={styles.insuranceButtonText}>Purchase</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.insuranceCard}>
        <View style={styles.insuranceHeader}>
          <Text style={styles.insurancePlanName}>Car Insurance</Text>
          <Text style={styles.insurancePlanPrice}>$60/month</Text>
        </View>
        <Text style={styles.insuranceDescription}>
          Comprehensive coverage for your vehicle. Third-party and own damage.
        </Text>
        <TouchableOpacity style={styles.insuranceButton}>
          <Text style={styles.insuranceButtonText}>Purchase</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💰 Investment Portfolio</Text>
        <Text style={styles.headerSubtitle}>Available: ${(player.stats.wealth || 0).toFixed(2)}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'market' && styles.tabActive]}
          onPress={() => setActiveTab('market')}
        >
          <Text style={[styles.tabText, activeTab === 'market' && styles.tabTextActive]}>Market</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'portfolio' && styles.tabActive]}
          onPress={() => setActiveTab('portfolio')}
        >
          <Text style={[styles.tabText, activeTab === 'portfolio' && styles.tabTextActive]}>
            Portfolio {player.investments && player.investments.length > 0 ? `(${player.investments.length})` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'insurance' && styles.tabActive]}
          onPress={() => setActiveTab('insurance')}
        >
          <Text style={[styles.tabText, activeTab === 'insurance' && styles.tabTextActive]}>Insurance</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {activeTab === 'market' && renderMarketTab()}
        {activeTab === 'portfolio' && renderPortfolioTab()}
        {activeTab === 'insurance' && renderInsuranceTab()}
      </ScrollView>

      {/* Buy Modal */}
      <Modal visible={showBuyModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Buy {selectedInvestment?.name}</Text>
              <TouchableOpacity onPress={() => setShowBuyModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.modalInfo}>
                <Text style={styles.modalLabel}>Current Price</Text>
                <Text style={styles.modalPrice}>${selectedInvestment?.currentPrice.toFixed(2)}</Text>
              </View>

              <TextInput
                style={styles.quantityInput}
                placeholder="Enter quantity"
                keyboardType="decimal-pad"
                value={buyAmount}
                onChangeText={setBuyAmount}
              />

              <View style={styles.totalCost}>
                <Text style={styles.totalCostLabel}>Total Cost</Text>
                <Text style={styles.totalCostValue}>
                  ${(parseFloat(buyAmount || '0') * (selectedInvestment?.currentPrice || 0)).toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity style={styles.buyButton} onPress={handleBuyInvestment}>
                <Text style={styles.buyButtonText}>Confirm Purchase</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowBuyModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent'
  },
  tabActive: {
    borderBottomColor: Colors.primary.main
  },
  tabText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.secondary
  },
  tabTextActive: {
    color: Colors.primary.main
  },
  content: {
    flex: 1
  },
  contentContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl
  },
  marketCard: {
    backgroundColor: '#fff',
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  marketCardDisabled: {
    opacity: 0.5
  },
  marketCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md
  },
  investmentName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary
  },
  investmentSymbol: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs
  },
  riskBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.background.primary
  },
  riskBadgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold
  },
  marketCardContent: {
    gap: Spacing.md
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary
  },
  changeIndicator: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium
  },
  changeText: {
    color: '#fff',
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.sm
  },
  description: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    lineHeight: 18
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm
  },
  stat: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.small
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginBottom: 2
  },
  statValue: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary
  },
  portfolioSummary: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.lg
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200
  },
  summaryLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs
  },
  summaryValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary
  },
  investmentCard: {
    backgroundColor: '#fff',
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md
  },
  investmentMeta: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs
  },
  sellButton: {
    backgroundColor: Colors.error.main,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium
  },
  sellButtonText: {
    color: '#fff',
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.sm
  },
  investmentDetails: {
    gap: Spacing.sm
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary
  },
  detailValue: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xl * 2
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: Spacing.lg
  },
  emptyStateTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm
  },
  emptyStateText: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center'
  },
  insuranceInfo: {
    marginBottom: Spacing.lg
  },
  insuranceTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs
  },
  insuranceSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary
  },
  insuranceCard: {
    backgroundColor: '#fff',
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200
  },
  insuranceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md
  },
  insurancePlanName: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary
  },
  insurancePlanPrice: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.success.main
  },
  insuranceDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.md,
    lineHeight: 18
  },
  insuranceButton: {
    backgroundColor: Colors.primary.main,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
    alignItems: 'center'
  },
  insuranceButtonText: {
    color: '#fff',
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.md
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: BorderRadius.large,
    borderTopRightRadius: BorderRadius.large,
    paddingBottom: 40
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200
  },
  modalTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary
  },
  modalClose: {
    fontSize: Typography.fontSize.xl,
    color: Colors.text.secondary
  },
  modalBody: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: Spacing.lg
  },
  modalInfo: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium
  },
  modalLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs
  },
  modalPrice: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    borderRadius: BorderRadius.medium,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary
  },
  totalCost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.medium
  },
  totalCostLabel: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary
  },
  totalCostValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary
  },
  buyButton: {
    backgroundColor: Colors.success.main,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.medium,
    alignItems: 'center'
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.md
  },
  cancelButton: {
    backgroundColor: Colors.neutral.gray200,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.medium,
    alignItems: 'center'
  },
  cancelButtonText: {
    color: Colors.text.primary,
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.md
  }
});

export default InvestmentPortfolio;

