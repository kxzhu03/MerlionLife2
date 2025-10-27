# Vibrant UI Design Guide
## Making MerlionLife2 Look Like a Professional Game

This guide provides specific design patterns, color schemes, and components to make your app look vibrant, modern, and game-like.

---

## Color Palette

### Primary Colors
```typescript
export const COLORS = {
  // Brand Colors
  primary: '#4A90E2',      // Bright Blue
  secondary: '#7B68EE',    // Medium Slate Blue
  accent: '#FF6B9D',       // Pink
  
  // Life Stage Colors (Vibrant)
  primarySchool: '#FF6B6B',      // Coral Red
  secondarySchool: '#4ECDC4',    // Turquoise
  postSecondary: '#45B7D1',      // Sky Blue
  nationalService: '#96CEB4',    // Sage Green
  university: '#FFEAA7',         // Pastel Yellow
  earlyCareer: '#DFE6E9',        // Light Gray Blue
  midCareer: '#74B9FF',          // Cornflower Blue
  lateCareer: '#A29BFE',         // Periwinkle
  retirement: '#FD79A8',         // Pink
  
  // Stat Colors (Bright & Distinct)
  wealth: '#27AE60',       // Emerald Green
  happiness: '#F39C12',    // Orange
  health: '#E74C3C',       // Alizarin Red
  social: '#9B59B6',       // Amethyst Purple
  academic: '#3498DB',     // Dodger Blue
  stress: '#E67E22',       // Carrot Orange
  reputation: '#1ABC9C',   // Turquoise
  leadership: '#E84393',   // Pink
  
  // UI Colors
  background: '#F5F7FA',   // Light Gray
  cardBg: '#FFFFFF',       // White
  textPrimary: '#2C3E50',  // Dark Blue Gray
  textSecondary: '#7F8C8D', // Gray
  border: '#E0E0E0',       // Light Gray
  
  // Feedback Colors
  success: '#4CAF50',      // Green
  warning: '#FF9800',      // Orange
  danger: '#F44336',       // Red
  info: '#00BCD4',         // Cyan
  
  // Gradients
  gradients: {
    primary: ['#667eea', '#764ba2'],
    success: ['#56ab2f', '#a8e063'],
    sunset: ['#ff6b6b', '#feca57'],
    ocean: ['#4facfe', '#00f2fe'],
    purple: ['#a8c0ff', '#3f2b96'],
    fire: ['#f83600', '#f9d423']
  }
};
```

---

## Typography

### Font System
```typescript
export const TYPOGRAPHY = {
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.3
  },
  h3: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary
  },
  
  // Body Text
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.textPrimary,
    lineHeight: 24
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textSecondary,
    lineHeight: 20
  },
  
  // Special
  caption: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  button: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1
  }
};
```

---

## Component Library

### 1. Gradient Card
```typescript
import { LinearGradient } from 'expo-linear-gradient';

const GradientCard: React.FC<{
  colors: string[];
  children: React.ReactNode;
}> = ({ colors, children }) => (
  <LinearGradient
    colors={colors}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.gradientCard}
  >
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradientCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10
  }
});
```

### 2. Animated Stat Bar
```typescript
import { Animated } from 'react-native';

const AnimatedStatBar: React.FC<{
  label: string;
  value: number;
  maxValue: number;
  color: string;
  icon: string;
}> = ({ label, value, maxValue, color, icon }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.spring(animatedWidth, {
      toValue: (value / maxValue) * 100,
      friction: 8,
      tension: 40,
      useNativeDriver: false
    }).start();
  }, [value]);
  
  return (
    <View style={styles.statContainer}>
      <View style={styles.statHeader}>
        <Text style={styles.statIcon}>{icon}</Text>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}/{maxValue}</Text>
      </View>
      <View style={styles.statBarBg}>
        <Animated.View
          style={[
            styles.statBarFill,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
              }),
              backgroundColor: color
            }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statContainer: {
    marginBottom: 16
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  statIcon: {
    fontSize: 20,
    marginRight: 8
  },
  statLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary
  },
  statBarBg: {
    height: 12,
    backgroundColor: '#ECF0F1',
    borderRadius: 6,
    overflow: 'hidden'
  },
  statBarFill: {
    height: '100%',
    borderRadius: 6
  }
});
```

### 3. Floating Action Button
```typescript
const FloatingActionButton: React.FC<{
  icon: string;
  onPress: () => void;
  color?: string;
}> = ({ icon, onPress, color = COLORS.primary }) => {
  const scale = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };
  
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: color }]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>{icon}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12
  },
  fabIcon: {
    fontSize: 28
  }
});
```

### 4. Achievement Toast
```typescript
const AchievementToast: React.FC<{
  achievement: Achievement;
  visible: boolean;
  onDismiss: () => void;
}> = ({ achievement, visible, onDismiss }) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  
  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          useNativeDriver: true
        }),
        Animated.delay(3000),
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(() => onDismiss());
    }
  }, [visible]);
  
  if (!visible) return null;
  
  return (
    <Animated.View
      style={[
        styles.toast,
        { transform: [{ translateY }] }
      ]}
    >
      <LinearGradient
        colors={['#FFD700', '#FFA500']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.toastGradient}
      >
        <Text style={styles.toastIcon}>🏆</Text>
        <View style={styles.toastContent}>
          <Text style={styles.toastTitle}>Achievement Unlocked!</Text>
          <Text style={styles.toastText}>{achievement.name}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 1000
  },
  toastGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  toastIcon: {
    fontSize: 32,
    marginRight: 12
  },
  toastContent: {
    flex: 1
  },
  toastTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2
  },
  toastText: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9
  }
});
```

### 5. Life Stage Header
```typescript
const LifeStageHeader: React.FC<{
  stage: LifeStage;
  year: number;
  age: number;
}> = ({ stage, year, age }) => {
  const getStageInfo = () => {
    switch (stage) {
      case LifeStage.PRIMARY_SCHOOL:
        return { name: 'Primary School', icon: '🎒', color: COLORS.primarySchool };
      case LifeStage.SECONDARY_SCHOOL:
        return { name: 'Secondary School', icon: '🎓', color: COLORS.secondarySchool };
      case LifeStage.UNIVERSITY:
        return { name: 'University', icon: '🎓', color: COLORS.university };
      case LifeStage.EARLY_CAREER:
        return { name: 'Career', icon: '💼', color: COLORS.earlyCareer };
      case LifeStage.RETIREMENT:
        return { name: 'Retirement', icon: '🌴', color: COLORS.retirement };
      default:
        return { name: 'Life', icon: '🌟', color: COLORS.primary };
    }
  };
  
  const info = getStageInfo();
  
  return (
    <LinearGradient
      colors={[info.color, `${info.color}CC`]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <Text style={styles.headerIcon}>{info.icon}</Text>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>{info.name}</Text>
        <Text style={styles.headerSubtitle}>Year {year} • Age {age}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6
  },
  headerIcon: {
    fontSize: 40,
    marginRight: 16
  },
  headerContent: {
    flex: 1
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9
  }
});
```

### 6. Event Card
```typescript
const EventCard: React.FC<{
  event: RandomEventData;
  onAcknowledge: () => void;
}> = ({ event, onAcknowledge }) => {
  const scale = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true
    }).start();
  }, []);
  
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <View style={styles.eventCard}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventIcon}>📰</Text>
          <Text style={styles.eventTitle}>{event.name}</Text>
        </View>
        
        <Text style={styles.eventDescription}>{event.description}</Text>
        
        {/* Stat Changes */}
        <View style={styles.statChanges}>
          {Object.entries(event.statChanges).map(([stat, change]) => (
            <View key={stat} style={styles.statChange}>
              <Text style={[
                styles.statChangeText,
                { color: change > 0 ? COLORS.success : COLORS.danger }
              ]}>
                {change > 0 ? '+' : ''}{change} {stat}
              </Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity
          style={styles.acknowledgeButton}
          onPress={onAcknowledge}
        >
          <Text style={styles.acknowledgeButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  eventIcon: {
    fontSize: 32,
    marginRight: 12
  },
  eventTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary
  },
  eventDescription: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 20
  },
  statChanges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20
  },
  statChange: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  statChangeText: {
    fontSize: 13,
    fontWeight: '600'
  },
  acknowledgeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center'
  },
  acknowledgeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  }
});
```

---

## Screen Layouts

### 1. Dashboard Layout
```
┌─────────────────────────────────┐
│  Life Stage Header (Gradient)   │
├─────────────────────────────────┤
│                                 │
│  Player Card (White Card)       │
│  ┌───────────────────────────┐ │
│  │ Avatar  Name    Age       │ │
│  │ Stats (Animated Bars)     │ │
│  └───────────────────────────┘ │
│                                 │
│  Quick Stats (Grid)             │
│  ┌──────┐ ┌──────┐ ┌──────┐   │
│  │ 💰   │ │ 😊   │ │ ❤️   │   │
│  │$5000 │ │ 75   │ │ 80   │   │
│  └──────┘ └──────┘ └──────┘   │
│                                 │
│  Current Objectives (List)      │
│  ✓ Complete Year 3              │
│  ○ Unlock Achievement           │
│                                 │
│  [Primary Action Button]        │
│                                 │
└─────────────────────────────────┘
```

### 2. Event Screen Layout
```
┌─────────────────────────────────┐
│                                 │
│        Event Icon (Large)       │
│             📰                  │
│                                 │
│        Event Title              │
│      "School Camp!"             │
│                                 │
│   Event Description (Card)      │
│   ┌─────────────────────────┐  │
│   │ You went on a 3-day     │  │
│   │ school camp. It was     │  │
│   │ amazing!                │  │
│   └─────────────────────────┘  │
│                                 │
│   Effects (Chips)               │
│   +8 Happiness  +5 Social       │
│   -2 Health     +3 Friends      │
│                                 │
│   [Continue Button]             │
│                                 │
└─────────────────────────────────┘
```

---

## Animation Patterns

### 1. Screen Transitions
```typescript
// Slide from right
const slideFromRight = {
  cardStyleInterpolator: ({ current, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0]
          })
        }
      ]
    }
  })
};

// Fade in
const fadeIn = {
  cardStyleInterpolator: ({ current }) => ({
    cardStyle: {
      opacity: current.progress
    }
  })
};
```

### 2. Micro-interactions
```typescript
// Button press effect
const ButtonPressEffect: React.FC = ({ children, onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true
    }).start();
  };
  
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={0.9}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};
```

### 3. Loading States
```typescript
const LoadingSpinner: React.FC = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, []);
  
  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  
  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Text style={{ fontSize: 32 }}>⚙️</Text>
    </Animated.View>
  );
};
```

---

## Icon System

### Emoji Icons (Quick & Vibrant)
```typescript
export const ICONS = {
  // Stats
  wealth: '💰',
  happiness: '😊',
  health: '❤️',
  social: '🤝',
  academic: '📚',
  stress: '😰',
  reputation: '⭐',
  leadership: '👑',
  
  // Life Stages
  primarySchool: '🎒',
  secondarySchool: '🎓',
  university: '🎓',
  career: '💼',
  retirement: '🌴',
  
  // Activities
  study: '📖',
  sports: '⚽',
  music: '🎵',
  art: '🎨',
  volunteer: '🤲',
  
  // Events
  party: '🎉',
  award: '🏆',
  travel: '✈️',
  love: '💕',
  family: '👨‍👩‍👧‍👦',
  
  // Actions
  next: '→',
  back: '←',
  profile: '👤',
  settings: '⚙️',
  help: '❓'
};
```

---

## Best Practices

### 1. Consistency
- Use the same color for the same stat across all screens
- Maintain consistent spacing (8px grid)
- Use the same animation duration (300ms for quick, 500ms for smooth)

### 2. Accessibility
- Ensure text contrast ratio > 4.5:1
- Use large touch targets (44x44 minimum)
- Provide haptic feedback for important actions

### 3. Performance
- Use `useNativeDriver: true` for animations
- Memoize components with `React.memo`
- Lazy load heavy components

### 4. Delight
- Add confetti for achievements
- Use spring animations for natural feel
- Include sound effects (optional)
- Celebrate milestones with special animations

---

This design system will make your app look professional, vibrant, and game-like while maintaining excellent usability.

