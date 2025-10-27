// MerlionLife2 Vibrant Color System

export const Colors = {
  // Primary Brand Colors
  primary: {
    main: '#4A90E2',
    light: '#7BB3F0',
    dark: '#2E6DB5',
    gradient: ['#4A90E2', '#357ABD']
  },
  
  // Life Stage Colors
  lifeStages: {
    primary: {
      main: '#FF6B6B',
      light: '#FF8E8E',
      dark: '#E85555',
      gradient: ['#FF6B6B', '#FF8E8E']
    },
    secondary: {
      main: '#4ECDC4',
      light: '#7FE0D9',
      dark: '#3AAFA7',
      gradient: ['#4ECDC4', '#7FE0D9']
    },
    postSecondary: {
      main: '#FFE66D',
      light: '#FFED8F',
      dark: '#F5D84A',
      gradient: ['#FFE66D', '#FFED8F']
    },
    ns: {
      main: '#95E1D3',
      light: '#B8EDE5',
      dark: '#6FD4C1',
      gradient: ['#95E1D3', '#B8EDE5']
    },
    university: {
      main: '#A8E6CF',
      light: '#C4F0DD',
      dark: '#8AD9B7',
      gradient: ['#A8E6CF', '#C4F0DD']
    },
    career: {
      main: '#FFD93D',
      light: '#FFE56D',
      dark: '#F5C91D',
      gradient: ['#FFD93D', '#FFE56D']
    },
    retirement: {
      main: '#C7CEEA',
      light: '#DDE1F3',
      dark: '#A8B0D9',
      gradient: ['#C7CEEA', '#DDE1F3']
    }
  },
  
  // Semantic Colors
  success: {
    main: '#27AE60',
    light: '#52C883',
    dark: '#1E8449',
    bg: '#E8F5E9'
  },
  warning: {
    main: '#F39C12',
    light: '#F5B041',
    dark: '#D68910',
    bg: '#FFF3E0'
  },
  error: {
    main: '#E74C3C',
    light: '#EC7063',
    dark: '#C0392B',
    bg: '#FFEBEE'
  },
  info: {
    main: '#3498DB',
    light: '#5DADE2',
    dark: '#2874A6',
    bg: '#E3F2FD'
  },
  
  // Stat Colors
  stats: {
    happiness: '#FFD93D',
    health: '#4ECDC4',
    academic: '#4A90E2',
    social: '#FF6B6B',
    wealth: '#27AE60',
    stress: '#E74C3C',
    reputation: '#9C27B0',
    leadership: '#FF9800'
  },
  
  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    gray50: '#FAFAFA',
    gray100: '#F5F7FA',
    gray200: '#ECF0F1',
    gray300: '#D5DBDB',
    gray400: '#BDC3C7',
    gray500: '#95A5A6',
    gray600: '#7F8C8D',
    gray700: '#5D6D7E',
    gray800: '#34495E',
    gray900: '#2C3E50',
    black: '#1A1A1A'
  },
  
  // Background Colors
  background: {
    primary: '#F5F7FA',
    secondary: '#FFFFFF',
    card: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.5)'
  },
  
  // Text Colors
  text: {
    primary: '#2C3E50',
    secondary: '#5D6D7E',
    tertiary: '#7F8C8D',
    disabled: '#BDC3C7',
    inverse: '#FFFFFF'
  },
  
  // Achievement Colors
  achievements: {
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32',
    platinum: '#E5E4E2'
  },
  
  // Relationship Colors
  relationships: {
    family: '#FF6B6B',
    friend: '#4ECDC4',
    bestFriend: '#FFE66D',
    rival: '#E74C3C',
    mentor: '#9C27B0',
    crush: '#FF69B4',
    partner: '#FF1493'
  },
  
  // SES Colors
  ses: {
    lower: '#E67E22',
    middle: '#3498DB',
    upper: '#9C27B0'
  },
  
  // Stream Colors
  streams: {
    ip: '#9C27B0',
    express: '#2196F3',
    normalAcademic: '#4CAF50',
    normalTechnical: '#FF9800'
  }
};

export const Gradients = {
  primary: ['#4A90E2', '#357ABD'],
  success: ['#27AE60', '#1E8449'],
  warning: ['#F39C12', '#D68910'],
  error: ['#E74C3C', '#C0392B'],
  info: ['#3498DB', '#2874A6'],
  
  // Life Stage Gradients
  primarySchool: ['#FF6B6B', '#FF8E8E'],
  secondarySchool: ['#4ECDC4', '#7FE0D9'],
  postSecondary: ['#FFE66D', '#FFED8F'],
  ns: ['#95E1D3', '#B8EDE5'],
  university: ['#A8E6CF', '#C4F0DD'],
  career: ['#FFD93D', '#FFE56D'],
  retirement: ['#C7CEEA', '#DDE1F3'],
  
  // Special Gradients
  achievement: ['#FFD700', '#FFA500'],
  premium: ['#9C27B0', '#7B1FA2'],
  vibrant: ['#FF6B6B', '#4ECDC4', '#FFE66D']
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5
  },
  button: {
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  }
};

export const BorderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 20,
  round: 999
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32
};

export const Typography = {
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
    xxxl: 34
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75
  }
};

