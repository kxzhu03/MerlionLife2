import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState } from '../types';
import { LifeStagesService } from '../services/LifeStagesService';

type NavProp = StackNavigationProp<RootStackParamList, 'LifeSummary'>;
type RouteProps = RouteProp<RootStackParamList, 'LifeSummary'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

const LifeSummary: React.FC<Props> = ({ navigation, route }) => {
  const { gameState } = route.params;
  const { player } = gameState;

  const cpfPayout = player.cpfData ? LifeStagesService.calculateCPFPayout(player.cpfData) : 0;
  const totalWealth = (player.stats.wealth || 0) + (player.cpfData?.totalCPF || 0);
  const housingValue = player.housingData?.housingValue || 0;
  const totalNetWorth = totalWealth + housingValue;

  const achievements = player.achievements || [];
  const totalYears = player.lifeStageProgress?.totalYears || 0;

  const getLifeRating = () => {
    let score = 0;
    
    // Wealth
    if (totalNetWorth > 2000000) score += 25;
    else if (totalNetWorth > 1000000) score += 20;
    else if (totalNetWorth > 500000) score += 15;
    else if (totalNetWorth > 200000) score += 10;
    
    // Career
    if (player.careerData) {
      if (player.careerData.monthlySalary > 8000) score += 15;
      else if (player.careerData.monthlySalary > 5000) score += 10;
      else score += 5;
    }
    
    // Family
    if (player.familyData) {
      score += 15;
      score += player.familyData.children * 5;
    }
    
    // Housing
    if (player.housingData) {
      score += 10;
    }
    
    // Achievements
    score += achievements.length * 3;
    
    // Happiness
    if (player.stats.happiness > 70) score += 10;
    else if (player.stats.happiness > 50) score += 5;
    
    if (score >= 80) return { rating: 'Exceptional Life', emoji: '🌟', color: '#FFD700' };
    if (score >= 65) return { rating: 'Great Life', emoji: '😊', color: '#4CAF50' };
    if (score >= 50) return { rating: 'Good Life', emoji: '🙂', color: '#2196F3' };
    if (score >= 35) return { rating: 'Average Life', emoji: '😐', color: '#FF9800' };
    return { rating: 'Challenging Life', emoji: '😔', color: '#E74C3C' };
  };

  const lifeRating = getLifeRating();

  const startNewLife = () => {
    navigation.navigate('Welcome');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.emoji}>🌅</Text>
        <Text style={styles.title}>Life Summary</Text>
        <Text style={styles.subtitle}>{player.name}'s Journey</Text>
      </View>

      <View style={[styles.ratingCard, { borderLeftColor: lifeRating.color }]}>
        <Text style={styles.ratingEmoji}>{lifeRating.emoji}</Text>
        <Text style={[styles.ratingText, { color: lifeRating.color }]}>{lifeRating.rating}</Text>
        <Text style={styles.ratingDesc}>
          You lived {totalYears} years and experienced the full Singapore journey.
        </Text>
      </View>

      {/* Life Milestones */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎯 Life Milestones</Text>
        
        <View style={styles.milestoneRow}>
          <Text style={styles.milestoneLabel}>Education:</Text>
          <Text style={styles.milestoneValue}>
            {player.secondarySchoolData?.stream || 'Primary School'} →{' '}
            {player.postSecondaryData?.path.replace(/_/g, ' ') || 'N/A'} →{' '}
            {player.universityData?.university || 'N/A'}
          </Text>
        </View>

        {player.nsData && (
          <View style={styles.milestoneRow}>
            <Text style={styles.milestoneLabel}>National Service:</Text>
            <Text style={styles.milestoneValue}>
              {player.nsData.rank} • {player.nsData.vocation}
            </Text>
          </View>
        )}

        {player.careerData && (
          <View style={styles.milestoneRow}>
            <Text style={styles.milestoneLabel}>Career:</Text>
            <Text style={styles.milestoneValue}>
              {player.careerData.currentJob.replace(/_/g, ' ')} ({player.careerData.yearsExperience} years)
            </Text>
          </View>
        )}

        {player.familyData && (
          <View style={styles.milestoneRow}>
            <Text style={styles.milestoneLabel}>Family:</Text>
            <Text style={styles.milestoneValue}>
              Married to {player.familyData.partnerName} • {player.familyData.children} children
            </Text>
          </View>
        )}

        {player.housingData && (
          <View style={styles.milestoneRow}>
            <Text style={styles.milestoneLabel}>Housing:</Text>
            <Text style={styles.milestoneValue}>
              {player.housingData.currentHousing.replace(/_/g, ' ')}
            </Text>
          </View>
        )}
      </View>

      {/* Financial Summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💰 Financial Summary</Text>
        
        <View style={styles.financeRow}>
          <Text style={styles.financeLabel}>Cash & Savings:</Text>
          <Text style={styles.financeValue}>${Math.round(player.stats.wealth || 0)}</Text>
        </View>
        
        {player.cpfData && (
          <>
            <View style={styles.financeRow}>
              <Text style={styles.financeLabel}>CPF Total:</Text>
              <Text style={styles.financeValue}>${Math.round(player.cpfData.totalCPF)}</Text>
            </View>
            <View style={styles.financeRow}>
              <Text style={styles.financeLabel}>Monthly CPF Payout:</Text>
              <Text style={styles.financeValue}>${Math.round(cpfPayout)}</Text>
            </View>
          </>
        )}
        
        {player.housingData && (
          <View style={styles.financeRow}>
            <Text style={styles.financeLabel}>Housing Value:</Text>
            <Text style={styles.financeValue}>${housingValue}</Text>
          </View>
        )}
        
        <View style={[styles.financeRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total Net Worth:</Text>
          <Text style={styles.totalValue}>${Math.round(totalNetWorth)}</Text>
        </View>
      </View>

      {/* Achievements */}
      {achievements.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏆 Achievements Unlocked</Text>
          <View style={styles.achievementsList}>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementPill}>
                <Text style={styles.achievementText}>{achievement.replace(/_/g, ' ')}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Final Stats */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Final Stats</Text>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Happiness:</Text>
          <Text style={styles.statValue}>{player.stats.happiness}/100</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Health:</Text>
          <Text style={styles.statValue}>{player.stats.health}/100</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Academic Skill:</Text>
          <Text style={styles.statValue}>{player.stats.academicSkill}/100</Text>
        </View>
        {player.stats.leadership && (
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Leadership:</Text>
            <Text style={styles.statValue}>{player.stats.leadership}/100</Text>
          </View>
        )}
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Social Impact:</Text>
          <Text style={styles.statValue}>{player.stats.socialImpact}/100</Text>
        </View>
      </View>

      <View style={styles.thanksCard}>
        <Text style={styles.thanksText}>
          Thank you for playing MerlionLife2! You've experienced a complete Singapore life journey from primary school to retirement.
        </Text>
      </View>

      <TouchableOpacity style={styles.newGameButton} onPress={startNewLife}>
        <Text style={styles.newGameButtonText}>🔄 Start New Life</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  content: {
    padding: 16,
    paddingTop: 40,
    paddingBottom: 40
  },
  header: {
    alignItems: 'center',
    marginBottom: 24
  },
  emoji: {
    fontSize: 64,
    marginBottom: 8
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D'
  },
  ratingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  ratingEmoji: {
    fontSize: 48,
    marginBottom: 12
  },
  ratingText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8
  },
  ratingDesc: {
    fontSize: 14,
    color: '#5D6D7E',
    textAlign: 'center',
    lineHeight: 20
  },
  card: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12
  },
  milestoneRow: {
    marginBottom: 10
  },
  milestoneLabel: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 2
  },
  milestoneValue: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  financeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  financeLabel: {
    fontSize: 14,
    color: '#5D6D7E'
  },
  financeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27AE60'
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: '#ECF0F1',
    marginTop: 8,
    paddingTop: 12
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50'
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27AE60'
  },
  achievementsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  achievementPill: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  achievementText: {
    fontSize: 13,
    color: '#2C3E50',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  statLabel: {
    fontSize: 14,
    color: '#5D6D7E'
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50'
  },
  thanksCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50'
  },
  thanksText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 22,
    textAlign: 'center'
  },
  newGameButton: {
    backgroundColor: '#9C27B0',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  newGameButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  }
});

export default LifeSummary;

