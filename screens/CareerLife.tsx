import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState } from '../types';
import { CareerPath, HousingType, RelationshipStatus } from '../types/lifestages';
import { LifeStagesService } from '../services/LifeStagesService';
import { GameService } from '../services/GameService';

type NavProp = StackNavigationProp<RootStackParamList, 'CareerLife'>;
type RouteProps = RouteProp<RootStackParamList, 'CareerLife'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

const CareerLife: React.FC<Props> = ({ navigation, route }) => {
  const [gameState, setGameState] = useState<GameState>(route.params.gameState);
  const { player } = gameState;
  
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const hasCareer = !!player.careerData;
  const hasHousing = player.housingData && player.housingData.currentHousing !== HousingType.NONE;
  const isMarried = player.familyData?.relationshipStatus === RelationshipStatus.MARRIED;
  const age = player.age;
  const cpfTotal = player.cpfData?.totalCPF || 0;

  const startCareer = async (career: CareerPath) => {
    const updatedPlayer = LifeStagesService.initializeCareer(player, career);
    const newGameState = { ...gameState, player: updatedPlayer };
    await GameService.saveGameState(newGameState);
    setGameState(newGameState);
    Alert.alert('Career Started!', `You're now working as a ${career.replace(/_/g, ' ')}!`);
  };

  const workYear = async () => {
    if (!hasCareer) {
      Alert.alert('No Career', 'Please start a career first');
      return;
    }

    let updatedPlayer = { ...player };
    
    // Work for a year
    const performance = 70 + Math.random() * 20; // 70-90
    const salaryIncrease = LifeStagesService.calculateSalaryIncrease(updatedPlayer, performance);
    
    updatedPlayer.careerData = {
      ...updatedPlayer.careerData!,
      monthlySalary: updatedPlayer.careerData!.monthlySalary + salaryIncrease,
      yearsExperience: updatedPlayer.careerData!.yearsExperience + 1
    };

    // Accumulate CPF
    updatedPlayer = LifeStagesService.accumulateCPF(updatedPlayer, 12);

    // Age up
    updatedPlayer.age += 1;

    // Update stats
    updatedPlayer.stats = {
      ...updatedPlayer.stats,
      wealth: (updatedPlayer.stats.wealth || 0) + (updatedPlayer.careerData!.monthlySalary * 12 * 0.3), // Save 30%
      stress: Math.min(100, (updatedPlayer.stats.stress || 50) + 5),
      happiness: Math.max(0, (updatedPlayer.stats.happiness || 50) - 2)
    };

    const newGameState = { ...gameState, player: updatedPlayer };
    await GameService.saveGameState(newGameState);
    setGameState(newGameState);
    
    Alert.alert(
      'Year Complete!',
      `You worked hard this year!\n\nSalary: $${updatedPlayer.careerData!.monthlySalary}/month\nCPF: $${Math.round(updatedPlayer.cpfData!.totalCPF)}\nWealth: $${Math.round(updatedPlayer.stats.wealth || 0)}`
    );
  };

  const applyBTO = async () => {
    const result = LifeStagesService.applyBTO(player);
    
    if (result.success) {
      Alert.alert(
        'BTO Success!',
        `Congratulations! You've successfully balloted for a ${result.housingType}!\n\nWait time: ${Math.round(result.waitTime / 12)} years`,
        [
          {
            text: 'OK',
            onPress: async () => {
              const updatedPlayer = LifeStagesService.purchaseHousing(player, result.housingType);
              const newGameState = { ...gameState, player: updatedPlayer };
              await GameService.saveGameState(newGameState);
              setGameState(newGameState);
            }
          }
        ]
      );
    } else {
      Alert.alert('BTO Failed', 'Unfortunately, you weren\'t successful in this BTO ballot. Try again next year!');
    }
  };

  const getMarried = async () => {
    const updatedPlayer = LifeStagesService.initializeMarriage(player, 'Your Partner');
    const newGameState = { ...gameState, player: updatedPlayer };
    await GameService.saveGameState(newGameState);
    setGameState(newGameState);
    Alert.alert('Congratulations!', 'You got married! 💍');
  };

  const haveChild = async () => {
    const updatedPlayer = LifeStagesService.haveChild(player);
    const newGameState = { ...gameState, player: updatedPlayer };
    await GameService.saveGameState(newGameState);
    setGameState(newGameState);
    Alert.alert('New Baby!', 'Congratulations on your new child! 👶');
  };

  const retire = async () => {
    const updatedPlayer = LifeStagesService.initializeRetirement(player);
    const payout = LifeStagesService.calculateCPFPayout(player.cpfData!);
    
    const newGameState = { ...gameState, player: updatedPlayer };
    await GameService.saveGameState(newGameState);
    
    navigation.navigate('LifeSummary', { gameState: newGameState });
  };

  const careerOptions: CareerPath[] = [
    CareerPath.SOFTWARE_ENGINEER,
    CareerPath.TEACHER,
    CareerPath.ACCOUNTANT,
    CareerPath.SALES,
    CareerPath.MANAGER,
    CareerPath.HEALTHCARE
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>💼 Adult Life</Text>
        <Text style={styles.subheader}>Age {age}</Text>

        {/* Player Status */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Your Status</Text>
          {hasCareer && (
            <>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Career:</Text>
                <Text style={styles.statusValue}>
                  {player.careerData!.currentJob.replace(/_/g, ' ')}
                </Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Salary:</Text>
                <Text style={styles.statusValue}>${player.careerData!.monthlySalary}/month</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Experience:</Text>
                <Text style={styles.statusValue}>{player.careerData!.yearsExperience} years</Text>
              </View>
            </>
          )}
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>CPF:</Text>
            <Text style={styles.statusValue}>${Math.round(cpfTotal)}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Wealth:</Text>
            <Text style={styles.statusValue}>${Math.round(player.stats.wealth || 0)}</Text>
          </View>
          {hasHousing && (
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Housing:</Text>
              <Text style={styles.statusValue}>
                {player.housingData!.currentHousing.replace(/_/g, ' ')}
              </Text>
            </View>
          )}
          {isMarried && (
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Family:</Text>
              <Text style={styles.statusValue}>
                Married {player.familyData!.children > 0 && `• ${player.familyData!.children} children`}
              </Text>
            </View>
          )}
        </View>

        {/* Career Selection */}
        {!hasCareer && (
          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>🎯 Choose Your Career</Text>
            <View style={styles.careerGrid}>
              {careerOptions.map((career, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.careerButton}
                  onPress={() => startCareer(career)}
                >
                  <Text style={styles.careerButtonText}>
                    {career.replace(/_/g, ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Actions */}
        {hasCareer && (
          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>📅 Life Actions</Text>
            
            <TouchableOpacity style={styles.actionButton} onPress={workYear}>
              <Text style={styles.actionButtonText}>⏭️ Work for a Year</Text>
            </TouchableOpacity>

            {!isMarried && age >= 25 && (
              <TouchableOpacity style={styles.actionButton} onPress={getMarried}>
                <Text style={styles.actionButtonText}>💍 Get Married</Text>
              </TouchableOpacity>
            )}

            {isMarried && !hasHousing && cpfTotal > 20000 && (
              <TouchableOpacity style={styles.actionButton} onPress={applyBTO}>
                <Text style={styles.actionButtonText}>🏠 Apply for BTO</Text>
              </TouchableOpacity>
            )}

            {isMarried && player.familyData!.children < 3 && (
              <TouchableOpacity style={styles.actionButton} onPress={haveChild}>
                <Text style={styles.actionButtonText}>👶 Have a Child</Text>
              </TouchableOpacity>
            )}

            {age >= 62 && (
              <TouchableOpacity style={[styles.actionButton, styles.retireButton]} onPress={retire}>
                <Text style={styles.actionButtonText}>🌅 Retire</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* CPF Breakdown */}
        {player.cpfData && player.cpfData.totalCPF > 0 && (
          <View style={styles.cpfCard}>
            <Text style={styles.cpfTitle}>💰 CPF Accounts</Text>
            <View style={styles.cpfRow}>
              <Text style={styles.cpfLabel}>Ordinary:</Text>
              <Text style={styles.cpfValue}>${Math.round(player.cpfData.ordinaryAccount)}</Text>
            </View>
            <View style={styles.cpfRow}>
              <Text style={styles.cpfLabel}>Special:</Text>
              <Text style={styles.cpfValue}>${Math.round(player.cpfData.specialAccount)}</Text>
            </View>
            <View style={styles.cpfRow}>
              <Text style={styles.cpfLabel}>Medisave:</Text>
              <Text style={styles.cpfValue}>${Math.round(player.cpfData.medisaveAccount)}</Text>
            </View>
            <View style={[styles.cpfRow, styles.cpfTotal]}>
              <Text style={styles.cpfTotalLabel}>Total:</Text>
              <Text style={styles.cpfTotalValue}>${Math.round(player.cpfData.totalCPF)}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    padding: 16,
    paddingTop: 40,
    paddingBottom: 40
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4
  },
  subheader: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 20
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  statusLabel: {
    fontSize: 14,
    color: '#5D6D7E'
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    textTransform: 'capitalize'
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12
  },
  careerGrid: {
    gap: 8
  },
  careerButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  careerButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 10
  },
  retireButton: {
    backgroundColor: '#9C27B0'
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  cpfCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50'
  },
  cpfTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12
  },
  cpfRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  cpfLabel: {
    fontSize: 14,
    color: '#5D6D7E'
  },
  cpfValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50'
  },
  cpfTotal: {
    borderTopWidth: 2,
    borderTopColor: '#C8E6C9',
    marginTop: 6,
    paddingTop: 8
  },
  cpfTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C3E50'
  },
  cpfTotalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#27AE60'
  }
});

export default CareerLife;

