import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import { RootStackParamList } from './types/navigation';

// Character Creation
import CharacterCreation from './screens/CharacterCreation';
import AvatarBuilder from './screens/AvatarBuilder';

// Primary School
import GameScreen from './screens/GameScreen';
import YearlyPlanning from './screens/YearlyPlanning';
import PSLEAssessment from './screens/PSLEAssessment';

// Secondary School
import SecondarySchool from './screens/SecondarySchool';
import SecondaryYearPlanning from './screens/SecondaryYearPlanning';
import OLevelExam from './screens/OLevelExam';

// Post-Secondary & Career
import PostSecondarySelection from './screens/PostSecondarySelection';
import CareerLife from './screens/CareerLife';

// Profile & Summary
import ProfileScreen from './screens/ProfileScreen';
import LifeSummary from './screens/LifeSummary';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
        {/* Welcome & Character Creation */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="CharacterCreation" component={CharacterCreation} />
        <Stack.Screen name="AvatarBuilder" component={AvatarBuilder} />
        
        {/* Primary School */}
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="YearlyPlanning" component={YearlyPlanning} />
        <Stack.Screen name="PSLEAssessment" component={PSLEAssessment} />
        
        {/* Secondary School */}
        <Stack.Screen name="SecondarySchool" component={SecondarySchool} />
        <Stack.Screen name="SecondaryYearPlanning" component={SecondaryYearPlanning} />
        <Stack.Screen name="OLevelExam" component={OLevelExam} />
        
        {/* Post-Secondary & Career */}
        <Stack.Screen name="PostSecondarySelection" component={PostSecondarySelection} />
        <Stack.Screen name="CareerLife" component={CareerLife} />
        
        {/* Profile & Summary */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="LifeSummary" component={LifeSummary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

