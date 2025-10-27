import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Colors, Shadows, BorderRadius, Spacing, Typography } from '../theme/colors';

// Gradient Card Component
interface GradientCardProps {
  children: React.ReactNode;
  colors?: string[];
  style?: ViewStyle;
}

export const GradientCard: React.FC<GradientCardProps> = ({ children, colors = Colors.primary.gradient, style }) => {
  return (
    <View style={[styles.gradientCard, style]}>
      {children}
    </View>
  );
};

// Stat Bar Component with Animation
interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  showValue?: boolean;
}

export const StatBar: React.FC<StatBarProps> = ({ 
  label, 
  value, 
  maxValue = 100, 
  color = Colors.primary.main,
  showValue = true 
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  return (
    <View style={styles.statBarContainer}>
      <View style={styles.statBarHeader}>
        <Text style={styles.statBarLabel}>{label}</Text>
        {showValue && <Text style={styles.statBarValue}>{value}/{maxValue}</Text>}
      </View>
      <View style={styles.statBarTrack}>
        <View 
          style={[
            styles.statBarFill, 
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
    </View>
  );
};

// Pill Badge Component
interface PillBadgeProps {
  text: string;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const PillBadge: React.FC<PillBadgeProps> = ({ 
  text, 
  color = Colors.primary.main,
  backgroundColor = Colors.primary.light + '30',
  style 
}) => {
  return (
    <View style={[styles.pillBadge, { backgroundColor }, style]}>
      <Text style={[styles.pillBadgeText, { color }]}>{text}</Text>
    </View>
  );
};

// Icon Button Component
interface IconButtonProps {
  icon: string;
  onPress: () => void;
  size?: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  onPress, 
  size = 40,
  color = Colors.text.inverse,
  backgroundColor = Colors.primary.main,
  style 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.iconButton, 
        { width: size, height: size, backgroundColor },
        style
      ]}
      onPress={onPress}
    >
      <Text style={[styles.iconButtonText, { color, fontSize: size * 0.5 }]}>{icon}</Text>
    </TouchableOpacity>
  );
};

// Info Card Component
interface InfoCardProps {
  title: string;
  description?: string;
  icon?: string;
  color?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const InfoCard: React.FC<InfoCardProps> = ({ 
  title, 
  description, 
  icon, 
  color = Colors.info.main,
  children,
  style 
}) => {
  return (
    <View style={[styles.infoCard, { borderLeftColor: color }, style]}>
      {icon && <Text style={styles.infoCardIcon}>{icon}</Text>}
      <Text style={styles.infoCardTitle}>{title}</Text>
      {description && <Text style={styles.infoCardDescription}>{description}</Text>}
      {children}
    </View>
  );
};

// Primary Button Component
interface PrimaryButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  text, 
  onPress, 
  disabled = false,
  color = Colors.primary.main,
  style,
  textStyle
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.primaryButton, 
        { backgroundColor: disabled ? Colors.neutral.gray400 : color },
        disabled && styles.primaryButtonDisabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.primaryButtonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

// Secondary Button Component
interface SecondaryButtonProps {
  text: string;
  onPress: () => void;
  color?: string;
  style?: ViewStyle;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({ 
  text, 
  onPress, 
  color = Colors.primary.main,
  style 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.secondaryButton, { borderColor: color }, style]}
      onPress={onPress}
    >
      <Text style={[styles.secondaryButtonText, { color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

// Achievement Toast Component
interface AchievementToastProps {
  achievement: string;
  visible: boolean;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, visible }) => {
  if (!visible) return null;
  
  return (
    <View style={styles.achievementToast}>
      <Text style={styles.achievementToastIcon}>🏆</Text>
      <View style={styles.achievementToastContent}>
        <Text style={styles.achievementToastTitle}>Achievement Unlocked!</Text>
        <Text style={styles.achievementToastText}>{achievement}</Text>
      </View>
    </View>
  );
};

// Stat Change Indicator
interface StatChangeProps {
  value: number;
  showPlus?: boolean;
}

export const StatChange: React.FC<StatChangeProps> = ({ value, showPlus = true }) => {
  const isPositive = value > 0;
  const color = isPositive ? Colors.success.main : Colors.error.main;
  const prefix = isPositive && showPlus ? '+' : '';
  
  return (
    <Text style={[styles.statChange, { color }]}>
      {prefix}{value}
    </Text>
  );
};

// Progress Indicator
interface ProgressIndicatorProps {
  current: number;
  total: number;
  color?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  current, 
  total, 
  color = Colors.primary.main 
}) => {
  const percentage = (current / total) * 100;
  
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.progressText}>{current}/{total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientCard: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    ...Shadows.medium
  },
  
  statBarContainer: {
    marginBottom: Spacing.md
  },
  statBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs
  },
  statBarLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary
  },
  statBarValue: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.secondary
  },
  statBarTrack: {
    height: 8,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: BorderRadius.small,
    overflow: 'hidden'
  },
  statBarFill: {
    height: '100%',
    borderRadius: BorderRadius.small
  },
  
  pillBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.round
  },
  pillBadgeText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold
  },
  
  iconButton: {
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.small
  },
  iconButtonText: {
    fontWeight: Typography.fontWeight.bold
  },
  
  infoCard: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    ...Shadows.small
  },
  infoCardIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm
  },
  infoCardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs
  },
  infoCardDescription: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: Typography.fontSize.md * Typography.lineHeight.normal
  },
  
  primaryButton: {
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    ...Shadows.button
  },
  primaryButtonDisabled: {
    opacity: 0.6,
    shadowOpacity: 0
  },
  primaryButtonText: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center'
  },
  
  secondaryButton: {
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 2,
    backgroundColor: 'transparent'
  },
  secondaryButtonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    textAlign: 'center'
  },
  
  achievementToast: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: Colors.achievements.gold,
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.large,
    zIndex: 1000
  },
  achievementToastIcon: {
    fontSize: 32,
    marginRight: Spacing.md
  },
  achievementToastContent: {
    flex: 1
  },
  achievementToastTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: 2
  },
  achievementToastText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary
  },
  
  statChange: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold
  },
  
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: BorderRadius.small,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: BorderRadius.small
  },
  progressText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.secondary,
    minWidth: 50,
    textAlign: 'right'
  }
});

