import { Player, GameState } from './index';

export type RootStackParamList = {
  Welcome: undefined;
  CharacterCreation: undefined;
  Game: { gameState: GameState };
  YearlyPlanning: { gameState: GameState };
  PSLEAssessment: { gameState: GameState };
  Skills: { gameState: GameState };
};
