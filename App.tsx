import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import { RootStackParamList } from './types/navigation';

// Placeholder screens; will implement next
import CharacterCreation from './screens/CharacterCreation';
import GameScreen from './screens/GameScreen';
import YearlyPlanning from './screens/YearlyPlanning';
import SkillsScreen from './screens/SkillsScreen';
import PSLEAssessment from './screens/PSLEAssessment';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="CharacterCreation" component={CharacterCreation} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="YearlyPlanning" component={YearlyPlanning} />
        <Stack.Screen name="PSLEAssessment" component={PSLEAssessment} />
        <Stack.Screen name="Skills" component={SkillsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


