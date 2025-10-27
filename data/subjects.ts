import { SecondaryStream } from '../types/lifestages';

export interface Subject {
  id: string;
  name: string;
  category: 'core' | 'elective' | 'science' | 'humanities' | 'language';
  streams: SecondaryStream[];
  difficulty: number; // 1-5
  description: string;
}

export const SECONDARY_SUBJECTS: Subject[] = [
  // Core Subjects (All Streams)
  {
    id: 'english',
    name: 'English Language',
    category: 'core',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.NORMAL_ACADEMIC, SecondaryStream.NORMAL_TECHNICAL, SecondaryStream.INTEGRATED_PROGRAMME],
    difficulty: 3,
    description: 'Essential communication and comprehension skills'
  },
  {
    id: 'mother_tongue',
    name: 'Mother Tongue',
    category: 'core',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.NORMAL_ACADEMIC, SecondaryStream.NORMAL_TECHNICAL, SecondaryStream.INTEGRATED_PROGRAMME],
    difficulty: 3,
    description: 'Chinese, Malay, or Tamil language'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    category: 'core',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.NORMAL_ACADEMIC, SecondaryStream.NORMAL_TECHNICAL, SecondaryStream.INTEGRATED_PROGRAMME],
    difficulty: 4,
    description: 'Algebra, geometry, and problem-solving'
  },
  {
    id: 'additional_mathematics',
    name: 'Additional Mathematics',
    category: 'elective',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.INTEGRATED_PROGRAMME],
    difficulty: 5,
    description: 'Advanced mathematical concepts'
  },

  // Sciences
  {
    id: 'physics',
    name: 'Physics',
    category: 'science',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.INTEGRATED_PROGRAMME],
    difficulty: 4,
    description: 'Study of matter, energy, and forces'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    category: 'science',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.INTEGRATED_PROGRAMME],
    difficulty: 4,
    description: 'Study of substances and their properties'
  },
  {
    id: 'biology',
    name: 'Biology',
    category: 'science',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.INTEGRATED_PROGRAMME],
    difficulty: 4,
    description: 'Study of living organisms'
  },
  {
    id: 'combined_science',
    name: 'Combined Science',
    category: 'science',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.NORMAL_ACADEMIC],
    difficulty: 3,
    description: 'Physics and Chemistry or Biology and Chemistry'
  },
  {
    id: 'science',
    name: 'Science',
    category: 'science',
    streams: [SecondaryStream.NORMAL_TECHNICAL],
    difficulty: 2,
    description: 'General science concepts'
  },

  // Humanities
  {
    id: 'history',
    name: 'History',
    category: 'humanities',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.NORMAL_ACADEMIC, SecondaryStream.INTEGRATED_PROGRAMME],
    difficulty: 3,
    description: 'World and Singapore history'
  },
  {
    id: 'geography',
    name: 'Geography',
    category: 'humanities',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.NORMAL_ACADEMIC, SecondaryStream.INTEGRATED_PROGRAMME],
    difficulty: 3,
    description: 'Physical and human geography'
  },
  {
    id: 'literature',
    name: 'Literature in English',
    category: 'humanities',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.INTEGRATED_PROGRAMME],
    difficulty: 4,
    description: 'Analysis of literary works'
  },
  {
    id: 'social_studies',
    name: 'Social Studies',
    category: 'humanities',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.NORMAL_ACADEMIC],
    difficulty: 2,
    description: 'Citizenship and social issues'
  },

  // Other Electives
  {
    id: 'art',
    name: 'Art',
    category: 'elective',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.NORMAL_ACADEMIC, SecondaryStream.INTEGRATED_PROGRAMME],
    difficulty: 3,
    description: 'Visual arts and creativity'
  },
  {
    id: 'music',
    name: 'Music',
    category: 'elective',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.INTEGRATED_PROGRAMME],
    difficulty: 3,
    description: 'Music theory and performance'
  },
  {
    id: 'design_technology',
    name: 'Design & Technology',
    category: 'elective',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.NORMAL_ACADEMIC, SecondaryStream.NORMAL_TECHNICAL],
    difficulty: 3,
    description: 'Product design and creation'
  },
  {
    id: 'food_nutrition',
    name: 'Food & Nutrition',
    category: 'elective',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.NORMAL_ACADEMIC, SecondaryStream.NORMAL_TECHNICAL],
    difficulty: 2,
    description: 'Cooking and nutritional science'
  },
  {
    id: 'principles_of_accounts',
    name: 'Principles of Accounts',
    category: 'elective',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.NORMAL_ACADEMIC],
    difficulty: 3,
    description: 'Basic accounting principles'
  },
  {
    id: 'computing',
    name: 'Computing',
    category: 'elective',
    streams: [SecondaryStream.EXPRESS, SecondaryStream.INTEGRATED_PROGRAMME],
    difficulty: 4,
    description: 'Programming and computational thinking'
  }
];

export interface SubjectCombination {
  name: string;
  subjects: string[];
  stream: SecondaryStream;
  description: string;
}

export const SUBJECT_COMBINATIONS: SubjectCombination[] = [
  // Express Stream - Pure Sciences
  {
    name: 'Pure Sciences',
    subjects: ['english', 'mother_tongue', 'mathematics', 'additional_mathematics', 'physics', 'chemistry', 'biology', 'social_studies'],
    stream: SecondaryStream.EXPRESS,
    description: 'For students aiming for science-related careers'
  },
  // Express Stream - Combined Science
  {
    name: 'Science (Combined)',
    subjects: ['english', 'mother_tongue', 'mathematics', 'combined_science', 'geography', 'social_studies'],
    stream: SecondaryStream.EXPRESS,
    description: 'Balanced science and humanities combination'
  },
  // Express Stream - Humanities
  {
    name: 'Humanities',
    subjects: ['english', 'mother_tongue', 'mathematics', 'combined_science', 'history', 'geography', 'literature', 'social_studies'],
    stream: SecondaryStream.EXPRESS,
    description: 'For students interested in arts and social sciences'
  },
  // Express Stream - Business
  {
    name: 'Business',
    subjects: ['english', 'mother_tongue', 'mathematics', 'combined_science', 'principles_of_accounts', 'geography', 'social_studies'],
    stream: SecondaryStream.EXPRESS,
    description: 'For students interested in business and commerce'
  },
  // Normal Academic
  {
    name: 'Normal Academic',
    subjects: ['english', 'mother_tongue', 'mathematics', 'combined_science', 'geography', 'social_studies', 'design_technology'],
    stream: SecondaryStream.NORMAL_ACADEMIC,
    description: 'Standard Normal Academic combination'
  },
  // Normal Technical
  {
    name: 'Normal Technical',
    subjects: ['english', 'mother_tongue', 'mathematics', 'science', 'design_technology', 'food_nutrition'],
    stream: SecondaryStream.NORMAL_TECHNICAL,
    description: 'Practical skills-focused combination'
  },
  // IP
  {
    name: 'IP Programme',
    subjects: ['english', 'mother_tongue', 'mathematics', 'physics', 'chemistry', 'biology', 'history', 'geography', 'literature', 'computing'],
    stream: SecondaryStream.INTEGRATED_PROGRAMME,
    description: 'Comprehensive IP curriculum'
  }
];

export function getSubjectsForStream(stream: SecondaryStream): Subject[] {
  return SECONDARY_SUBJECTS.filter(subject => subject.streams.includes(stream));
}

export function getDefaultCombination(stream: SecondaryStream): SubjectCombination | undefined {
  return SUBJECT_COMBINATIONS.find(combo => combo.stream === stream);
}

