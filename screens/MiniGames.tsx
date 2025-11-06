import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { GameState, Player } from '../types';
import { GameService } from '../services/GameService';

type NavProp = StackNavigationProp<RootStackParamList, 'Game'>;
type RouteProps = RouteProp<RootStackParamList, 'Game'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

// PSLE Quiz Questions
const PSLE_QUESTIONS = [
  {
    id: 1,
    question: 'What is 15 × 12?',
    options: ['180', '160', '200', '150'],
    correct: 0,
    subject: 'Mathematics'
  },
  {
    id: 2,
    question: 'Which country is the largest by area?',
    options: ['China', 'Russia', 'Canada', 'United States'],
    correct: 1,
    subject: 'Social Studies'
  },
  {
    id: 3,
    question: 'What is the chemical symbol for Gold?',
    options: ['Go', 'Au', 'Gd', 'Gl'],
    correct: 1,
    subject: 'Science'
  },
  {
    id: 4,
    question: 'In which year did Singapore gain independence?',
    options: ['1959', '1963', '1965', '1971'],
    correct: 2,
    subject: 'History'
  },
  {
    id: 5,
    question: 'What is the square root of 144?',
    options: ['10', '11', '12', '13'],
    correct: 2,
    subject: 'Mathematics'
  },
  {
    id: 6,
    question: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Mercury', 'Mars', 'Earth'],
    correct: 1,
    subject: 'Science'
  },
  {
    id: 7,
    question: 'What is the capital of France?',
    options: ['Lyon', 'Marseille', 'Paris', 'Nice'],
    correct: 2,
    subject: 'Geography'
  },
  {
    id: 8,
    question: 'How many sides does a hexagon have?',
    options: ['5', '6', '7', '8'],
    correct: 1,
    subject: 'Mathematics'
  },
  {
    id: 9,
    question: 'What is the main gas in Earth\'s atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
    correct: 1,
    subject: 'Science'
  },
  {
    id: 10,
    question: 'In what year did World War II end?',
    options: ['1943', '1944', '1945', '1946'],
    correct: 2,
    subject: 'History'
  }
];

// NS Training Mini-Game
const NS_TRAINING_TASKS = [
  {
    id: 1,
    task: 'Complete 5km run in under 30 minutes',
    difficulty: 'Medium',
    reward: 10,
    skillGain: 'Endurance'
  },
  {
    id: 2,
    task: 'Master rifle assembly and disassembly',
    difficulty: 'Hard',
    reward: 15,
    skillGain: 'Technical Skills'
  },
  {
    id: 3,
    task: 'Lead a squad through a tactical exercise',
    difficulty: 'Hard',
    reward: 20,
    skillGain: 'Leadership'
  },
  {
    id: 4,
    task: 'Pass the obstacle course',
    difficulty: 'Medium',
    reward: 12,
    skillGain: 'Agility'
  },
  {
    id: 5,
    task: 'Achieve marksman qualification',
    difficulty: 'Hard',
    reward: 18,
    skillGain: 'Precision'
  }
];

// Interview Questions
const INTERVIEW_QUESTIONS = [
  {
    id: 1,
    question: 'Tell me about your strengths.',
    goodAnswers: ['Leadership', 'Problem-solving', 'Teamwork', 'Communication'],
    badAnswers: ['I\'m perfect', 'I don\'t know', 'I\'m lazy'],
    impact: 'First Impression'
  },
  {
    id: 2,
    question: 'Why do you want to work for our company?',
    goodAnswers: ['Mission', 'Values', 'Growth', 'Innovation'],
    badAnswers: ['Just for money', 'I need a job', 'I don\'t know'],
    impact: 'Interest Level'
  },
  {
    id: 3,
    question: 'How do you handle stress?',
    goodAnswers: ['Exercise', 'Planning', 'Meditation', 'Support system'],
    badAnswers: ['I don\'t', 'Ignore it', 'Complain'],
    impact: 'Maturity'
  },
  {
    id: 4,
    question: 'Describe a challenge you overcame.',
    goodAnswers: ['Specific example', 'Solution-focused', 'Learning outcome', 'Teamwork'],
    badAnswers: ['I haven\'t faced challenges', 'Blame others', 'Vague story'],
    impact: 'Problem-solving'
  },
  {
    id: 5,
    question: 'What are your salary expectations?',
    goodAnswers: ['Market research', 'Realistic', 'Flexible', 'Based on value'],
    badAnswers: ['Unrealistic', 'Too low', 'Demanding'],
    impact: 'Professionalism'
  }
];

export const PSLEQuizScreen: React.FC<Props> = ({ navigation, route }) => {
  const [gameState, setGameState] = useState<GameState>(route.params.gameState);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    
    if (index === PSLE_QUESTIONS[currentQuestion].correct) {
      setScore(score + 10);
      Alert.alert('Correct!', 'Great job! 🎉');
    } else {
      Alert.alert('Incorrect', `The correct answer is: ${PSLE_QUESTIONS[currentQuestion].options[PSLE_QUESTIONS[currentQuestion].correct]}`);
    }
    
    setTimeout(() => {
      if (currentQuestion < PSLE_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  const finishQuiz = async () => {
    const scorePercentage = (score / (PSLE_QUESTIONS.length * 10)) * 100;
    const updatedPlayer = { ...gameState.player };
    updatedPlayer.stats.academicSkill = Math.min(100, updatedPlayer.stats.academicSkill + (scorePercentage / 10));
    
    const newGameState = { ...gameState, player: updatedPlayer };
    await GameService.saveGameState(newGameState);
    
    Alert.alert(
      'Quiz Complete!',
      `Your Score: ${score}/${PSLE_QUESTIONS.length * 10}\nPercentage: ${scorePercentage.toFixed(1)}%`,
      [
        {
          text: 'Continue',
          onPress: () => {
            setGameState(newGameState);
            navigation.goBack();
          }
        }
      ]
    );
  };

  if (quizComplete) {
    return (
      <View style={styles.container}>
        <View style={styles.completeCard}>
          <Text style={styles.completeEmoji}>🎓</Text>
          <Text style={styles.completeTitle}>Quiz Complete!</Text>
          <Text style={styles.completeScore}>
            {score}/{PSLE_QUESTIONS.length * 10}
          </Text>
          <Text style={styles.completePercentage}>
            {((score / (PSLE_QUESTIONS.length * 10)) * 100).toFixed(1)}%
          </Text>
          <TouchableOpacity style={styles.finishButton} onPress={finishQuiz}>
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const question = PSLE_QUESTIONS[currentQuestion];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>PSLE Practice Quiz</Text>
          <Text style={styles.progress}>
            Question {currentQuestion + 1}/{PSLE_QUESTIONS.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestion + 1) / PSLE_QUESTIONS.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.subject}>{question.subject}</Text>
          <Text style={styles.question}>{question.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === index && styles.optionButtonSelected
              ]}
              onPress={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.scoreDisplay}>
          <Text style={styles.scoreLabel}>Current Score:</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  content: {
    padding: 16,
    paddingTop: 40
  },
  header: {
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8
  },
  progress: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ECF0F1',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2'
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  subject: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase'
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    lineHeight: 26
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#ECF0F1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  optionButtonSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#E3F2FD'
  },
  optionText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500'
  },
  scoreDisplay: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  scoreLabel: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600'
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#27AE60'
  },
  completeCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  completeEmoji: {
    fontSize: 64,
    marginBottom: 16
  },
  completeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16
  },
  completeScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 8
  },
  completePercentage: {
    fontSize: 24,
    color: '#7F8C8D',
    marginBottom: 32
  },
  finishButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  }
});

export default PSLEQuizScreen;

