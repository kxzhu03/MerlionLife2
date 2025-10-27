import { Player, GameState } from './index';

export type RootStackParamList = {
  Welcome: undefined;
  CharacterCreation: undefined;
  AvatarBuilder: undefined;
  Game: { gameState: GameState };
  YearlyPlanning: { gameState: GameState };
  PSLEAssessment: { gameState: GameState };
  Profile: { gameState: GameState };
};
