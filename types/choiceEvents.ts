import { PlayerStats } from './index';

export interface ChoiceOption {
  id: string;
  text: string;
  emoji: string;
  statChanges: Partial<PlayerStats>;
  description: string;
}

export interface ChoiceEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;
  options: ChoiceOption[];
  minAge?: number;
  maxAge?: number;
  category: 'ridiculous' | 'difficult' | 'funny' | 'dramatic';
}
