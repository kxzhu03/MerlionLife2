import { Player, GameState } from './index';
import { ChoiceEvent } from './choiceEvents';

export type RootStackParamList = {
  Welcome: undefined;
  CharacterCreation: undefined;
  AvatarBuilder: undefined;
  Game: { gameState: GameState };
  YearlyPlanning: { gameState: GameState };
  PSLEAssessment: { gameState: GameState };
  Profile: { gameState: GameState };
  SecondarySchool: { gameState: GameState };
  SecondaryYearPlanning: { gameState: GameState };
  OLevelExam: { gameState: GameState };
  PostSecondarySelection: { gameState: GameState };
  CareerLife: { gameState: GameState };
  LifeSummary: { gameState: GameState };
  InvestmentPortfolio: { gameState: GameState };
  ChoiceEvent: { 
    gameState: GameState; 
    event: ChoiceEvent; 
    returnScreen: keyof RootStackParamList;
  };
};

