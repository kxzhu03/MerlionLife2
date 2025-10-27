import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState, Player } from '../types';
import { SecondaryStream } from '../types/lifestages';
import PlayerCard from '../components/PlayerCard';
import { GameService } from '../services/GameService';

type NavProp = StackNavigationProp<RootStackParamList, 'SecondarySchool'>;
type RouteProps = RouteProp<RootStackParamList, 'SecondarySchool'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

const SecondarySchool: React.FC<Props> = ({ navigation, route }) => {
  const [gameState, setGameState] = useState<GameState>(route.params.gameState);
  const { player } = gameState;
  
  const stream = player.secondarySchoolData?.stream || player.psleStream as any as SecondaryStream;
  const secondaryYear = player.lifeStageProgress?.stageYear || 1;

  const getStreamInfo = () => {
    switch (stream) {
      case SecondaryStream.INTEGRATED_PROGRAMME:
        return {
          name: 'Integrated Programme (IP)',
          description: 'Direct pathway to JC without O-Levels',
          years: 6,
          color: '#9C27B0'
        };
      case SecondaryStream.EXPRESS:
        return {
          name: 'Express Stream',
          description: 'O-Level examination in Sec 4',
          years: 4,
          color: '#2196F3'
        };
      case SecondaryStream.NORMAL_ACADEMIC:
        return {
          name: 'Normal (Academic)',
          description: 'N-Level in Sec 4, O-Level in Sec 5',
          years: 5,
          color: '#4CAF50'
        };
      case SecondaryStream.NORMAL_TECHNICAL:
        return {
          name: 'Normal (Technical)',
          description: 'N-Level in Sec 4, ITE pathway',
          years: 4,
          color: '#FF9800'
        };
      default:
        return {
          name: 'Secondary School',
          description: '',
          years: 4,
          color: '#607D8B'
        };
    }
  };

  const streamInfo = getStreamInfo();

  const planYear = () => {
    navigation.navigate('SecondaryYearPlanning', { gameState });
  };

  const goToProfile = () => {
    navigation.navigate('Profile', { gameState });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <View style={styles.headerInfo}>
            <Text style={styles.header}>🎓 Secondary School</Text>
            <Text style={styles.subheader}>Year {secondaryYear} • {streamInfo.name}</Text>
          </View>
          <TouchableOpacity onPress={goToProfile} style={styles.profileBtn}>
            <Text style={styles.profileBtnText}>📋</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.streamCard, { borderLeftColor: streamInfo.color }]}>
          <Text style={styles.streamName}>{streamInfo.name}</Text>
          <Text style={styles.streamDesc}>{streamInfo.description}</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(secondaryYear / streamInfo.years) * 100}%`, backgroundColor: streamInfo.color }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>Year {secondaryYear} of {streamInfo.years}</Text>
        </View>

        <PlayerCard player={player} />

        {/* Subject Information */}
        {player.secondarySchoolData?.subjects && player.secondarySchoolData.subjects.length > 0 && (
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>📚 Your Subjects</Text>
            <View style={styles.subjectList}>
              {player.secondarySchoolData.subjects.map((subject, index) => (
                <View key={index} style={styles.subjectPill}>
                  <Text style={styles.subjectText}>{subject}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* CCA Information */}
        {player.secondarySchoolData?.coCurricular && player.secondarySchoolData.coCurricular.length > 0 && (
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>🎯 Co-Curricular Activities</Text>
            <View style={styles.subjectList}>
              {player.secondarySchoolData.coCurricular.map((cca, index) => (
                <View key={index} style={styles.ccaPill}>
                  <Text style={styles.ccaText}>{cca}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Leadership Roles */}
        {player.secondarySchoolData?.leadership && player.secondarySchoolData.leadership.length > 0 && (
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>👑 Leadership Positions</Text>
            {player.secondarySchoolData.leadership.map((role, index) => (
              <Text key={index} style={styles.leadershipText}>• {role}</Text>
            ))}
          </View>
        )}

        {/* Tips Card */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Secondary School Tips</Text>
          <Text style={styles.tipsText}>
            • Balance academics with CCA and social life{'\n'}
            • Build strong relationships with peers and teachers{'\n'}
            • Consider taking on leadership roles{'\n'}
            • Explore part-time work opportunities{'\n'}
            • Prepare for major examinations (O-Level/N-Level)
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={planYear}>
          <Text style={styles.primaryButtonText}>Plan This Year</Text>
        </TouchableOpacity>
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
    paddingTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 40
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16
  },
  headerInfo: {
    flex: 1
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4
  },
  subheader: {
    fontSize: 14,
    color: '#7F8C8D'
  },
  profileBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  profileBtnText: {
    fontSize: 20
  },
  streamCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  streamName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4
  },
  streamDesc: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 12
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ECF0F1',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6
  },
  progressFill: {
    height: '100%',
    borderRadius: 4
  },
  progressText: {
    fontSize: 12,
    color: '#95A5A6',
    textAlign: 'right'
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12
  },
  subjectList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  subjectPill: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  subjectText: {
    fontSize: 13,
    color: '#1976D2',
    fontWeight: '600'
  },
  ccaPill: {
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  ccaText: {
    fontSize: 13,
    color: '#7B1FA2',
    fontWeight: '600'
  },
  leadershipText: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 6,
    lineHeight: 20
  },
  tipsCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800'
  },
  tipsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8
  },
  tipsText: {
    fontSize: 13,
    color: '#5D6D7E',
    lineHeight: 20
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  }
});

export default SecondarySchool;

