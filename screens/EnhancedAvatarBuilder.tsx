import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  FlatList
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { Colors, BorderRadius, Spacing, Typography } from '../theme/colors';

type NavProp = StackNavigationProp<RootStackParamList, 'AvatarBuilder'>;
type RouteProps = RouteProp<RootStackParamList, 'AvatarBuilder'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

// Local loose type to decouple from strict enum-based AvatarCustomization
type LooseAvatarCustomization = {
  gender: string;
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  clothingStyle: string;
  clothingColor: string;
  accessories: string;
};

const AVATAR_OPTIONS = {
  gender: [
    { id: 'male', label: 'Male', emoji: '👨' },
    { id: 'female', label: 'Female', emoji: '👩' }
  ],
  skinTone: [
    { id: 'light', label: 'Light', color: '#FDBCB4' },
    { id: 'medium_light', label: 'Medium Light', color: '#F4A460' },
    { id: 'medium', label: 'Medium', color: '#D2691E' },
    { id: 'medium_dark', label: 'Medium Dark', color: '#8B4513' },
    { id: 'dark', label: 'Dark', color: '#3E2723' }
  ],
  hairStyle: [
    { id: 'short', label: 'Short', emoji: '💇' },
    { id: 'medium', label: 'Medium', emoji: '💁' },
    { id: 'long', label: 'Long', emoji: '💆' },
    { id: 'curly', label: 'Curly', emoji: '🧑‍🦱' },
    { id: 'spiky', label: 'Spiky', emoji: '🧔' },
    { id: 'bald', label: 'Bald', emoji: '🧑‍🦲' },
    { id: 'ponytail', label: 'Ponytail', emoji: '👩‍🦰' },
    { id: 'braids', label: 'Braids', emoji: '👩‍🦱' }
  ],
  hairColor: [
    { id: 'black', label: 'Black', color: '#1A1A1A' },
    { id: 'brown', label: 'Brown', color: '#8B4513' },
    { id: 'blonde', label: 'Blonde', color: '#FFD700' },
    { id: 'red', label: 'Red', color: '#DC143C' },
    { id: 'purple', label: 'Purple', color: '#9370DB' },
    { id: 'blue', label: 'Blue', color: '#4169E1' },
    { id: 'green', label: 'Green', color: '#228B22' },
    { id: 'pink', label: 'Pink', color: '#FF69B4' }
  ],
  clothingStyle: [
    { id: 'casual', label: 'Casual', emoji: '👕' },
    { id: 'formal', label: 'Formal', emoji: '🎩' },
    { id: 'sporty', label: 'Sporty', emoji: '⚽' },
    { id: 'trendy', label: 'Trendy', emoji: '👗' },
    { id: 'traditional', label: 'Traditional', emoji: '👘' }
  ],
  clothingColor: [
    { id: 'black', label: 'Black', color: '#000000' },
    { id: 'white', label: 'White', color: '#FFFFFF' },
    { id: 'red', label: 'Red', color: '#FF0000' },
    { id: 'blue', label: 'Blue', color: '#0000FF' },
    { id: 'green', label: 'Green', color: '#00AA00' },
    { id: 'yellow', label: 'Yellow', color: '#FFFF00' },
    { id: 'purple', label: 'Purple', color: '#800080' },
    { id: 'orange', label: 'Orange', color: '#FFA500' },
    { id: 'pink', label: 'Pink', color: '#FFC0CB' },
    { id: 'gray', label: 'Gray', color: '#808080' }
  ],
  accessories: [
    { id: 'none', label: 'None', emoji: '✨' },
    { id: 'glasses', label: 'Glasses', emoji: '👓' },
    { id: 'sunglasses', label: 'Sunglasses', emoji: '😎' },
    { id: 'hat', label: 'Hat', emoji: '🎩' },
    { id: 'cap', label: 'Cap', emoji: '🧢' },
    { id: 'headband', label: 'Headband', emoji: '🎀' },
    { id: 'earrings', label: 'Earrings', emoji: '💎' },
    { id: 'necklace', label: 'Necklace', emoji: '📿' },
    { id: 'watch', label: 'Watch', emoji: '⌚' }
  ]
};

const EnhancedAvatarBuilder: React.FC<Props> = ({ navigation }) => {
  const [customization, setCustomization] = useState<LooseAvatarCustomization>({
    gender: 'male',
    skinTone: 'medium',
    hairStyle: 'short',
    hairColor: 'black',
    clothingStyle: 'casual',
    clothingColor: 'blue',
    accessories: 'none'
  });

  const [activeCategory, setActiveCategory] = useState<keyof typeof AVATAR_OPTIONS>('gender');

  const updateCustomization = (category: keyof LooseAvatarCustomization, value: string) => {
    setCustomization({
      ...customization,
      [category]: value
    });
  };

  const getAvatarPreview = () => {
    const genderEmoji = AVATAR_OPTIONS.gender.find(g => g.id === customization.gender)?.emoji || '👨';
    const hairEmoji = AVATAR_OPTIONS.hairStyle.find(h => h.id === customization.hairStyle)?.emoji || '💇';
  const clothingEmoji = AVATAR_OPTIONS.clothingStyle.find(c => c.id === customization.clothingStyle)?.emoji || '👕';
    const accessoryEmoji = AVATAR_OPTIONS.accessories.find(a => a.id === customization.accessories)?.emoji || '✨';

    return `${genderEmoji}${hairEmoji}${clothingEmoji}${accessoryEmoji}`;
  };

  const getSkinToneColor = () => {
    return AVATAR_OPTIONS.skinTone.find(s => s.id === customization.skinTone)?.color || '#FDBCB4';
  };

  const getHairColor = () => {
    return AVATAR_OPTIONS.hairColor.find(h => h.id === customization.hairColor)?.color || '#1A1A1A';
  };

  const getClothingColor = () => {
    return AVATAR_OPTIONS.clothingColor.find(c => c.id === customization.clothingColor)?.color || '#0000FF';
  };

  const handleContinue = () => {
    navigation.navigate('CharacterCreation');
  };

  const renderCategoryOptions = () => {
    const options = AVATAR_OPTIONS[activeCategory];

    if (activeCategory === 'skinTone') {
      return (
        <View style={styles.colorGrid}>
          {options.map((option: any) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.colorOption,
                { backgroundColor: option.color },
                customization.skinTone === option.id && styles.colorOptionSelected
              ]}
              onPress={() => updateCustomization('skinTone', option.id)}
            >
              {customization.skinTone === option.id && (
                <Text style={styles.checkmark}>✓</Text>
              )}
              <Text style={styles.colorLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    if (activeCategory === 'hairColor') {
      return (
        <View style={styles.colorGrid}>
          {options.map((option: any) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.colorOption,
                { backgroundColor: option.color },
                customization.hairColor === option.id && styles.colorOptionSelected
              ]}
              onPress={() => updateCustomization('hairColor', option.id)}
            >
              {customization.hairColor === option.id && (
                <Text style={styles.checkmark}>✓</Text>
              )}
              <Text style={[styles.colorLabel, { color: option.color === '#FFFFFF' ? '#000' : '#fff' }]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    if (activeCategory === 'clothingColor') {
      return (
        <View style={styles.colorGrid}>
          {options.map((option: any) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.colorOption,
                { backgroundColor: option.color },
                customization.clothingColor === option.id && styles.colorOptionSelected
              ]}
              onPress={() => updateCustomization('clothingColor', option.id)}
            >
              {customization.clothingColor === option.id && (
                <Text style={styles.checkmark}>✓</Text>
              )}
              <Text style={[styles.colorLabel, { color: option.color === '#FFFFFF' ? '#000' : '#fff' }]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    // For emoji-based options
    return (
      <View style={styles.emojiGrid}>
        {options.map((option: any) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.emojiOption,
              customization[activeCategory] === option.id && styles.emojiOptionSelected
            ]}
            onPress={() => updateCustomization(activeCategory, option.id)}
          >
            <Text style={styles.emojiText}>{option.emoji}</Text>
            <Text style={styles.optionLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Preview Section */}
      <View style={styles.previewSection}>
        <View style={styles.previewCard}>
          <View style={[styles.avatarPreview, { backgroundColor: getSkinToneColor() }]}>
            <Text style={styles.avatarEmoji}>{getAvatarPreview()}</Text>
            <View style={[styles.hairColorIndicator, { backgroundColor: getHairColor() }]} />
            <View style={[styles.clothingColorIndicator, { backgroundColor: getClothingColor() }]} />
          </View>
          <Text style={styles.previewLabel}>Your Avatar</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Gender</Text>
            <Text style={styles.statValue}>
              {AVATAR_OPTIONS.gender.find(g => g.id === customization.gender)?.label}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Hair</Text>
            <Text style={styles.statValue}>
              {AVATAR_OPTIONS.hairStyle.find(h => h.id === customization.hairStyle)?.label}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Outfit</Text>
            <Text style={styles.statValue}>
              {AVATAR_OPTIONS.clothingStyle.find(c => c.id === customization.clothingStyle)?.label}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Accessory</Text>
            <Text style={styles.statValue}>
              {AVATAR_OPTIONS.accessories.find(a => a.id === customization.accessories)?.label}
            </Text>
          </View>
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        {Object.keys(AVATAR_OPTIONS).map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              activeCategory === category && styles.categoryTabActive
            ]}
            onPress={() => setActiveCategory(category as keyof typeof AVATAR_OPTIONS)}
          >
            <Text style={[
              styles.categoryTabText,
              activeCategory === category && styles.categoryTabTextActive
            ]}>
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Options Scroll */}
      <ScrollView style={styles.optionsScroll} contentContainerStyle={styles.optionsContent}>
        {renderCategoryOptions()}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.randomButton}
          onPress={() => {
            const randomCustomization: LooseAvatarCustomization = {
              gender: AVATAR_OPTIONS.gender[Math.floor(Math.random() * AVATAR_OPTIONS.gender.length)].id as any,
              skinTone: AVATAR_OPTIONS.skinTone[Math.floor(Math.random() * AVATAR_OPTIONS.skinTone.length)].id as any,
              hairStyle: AVATAR_OPTIONS.hairStyle[Math.floor(Math.random() * AVATAR_OPTIONS.hairStyle.length)].id as any,
              hairColor: AVATAR_OPTIONS.hairColor[Math.floor(Math.random() * AVATAR_OPTIONS.hairColor.length)].id as any,
              clothingStyle: AVATAR_OPTIONS.clothingStyle[Math.floor(Math.random() * AVATAR_OPTIONS.clothingStyle.length)].id as any,
              clothingColor: AVATAR_OPTIONS.clothingColor[Math.floor(Math.random() * AVATAR_OPTIONS.clothingColor.length)].id as any,
              accessories: AVATAR_OPTIONS.accessories[Math.floor(Math.random() * AVATAR_OPTIONS.accessories.length)].id as any
            };
            setCustomization(randomCustomization);
          }}
        >
          <Text style={styles.randomButtonText}>🎲 Randomize</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  previewSection: {
    paddingTop: 40,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200
  },
  previewCard: {
    alignItems: 'center',
    marginBottom: Spacing.lg
  },
  avatarPreview: {
    width: 150,
    height: 150,
    borderRadius: BorderRadius.xlarge,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5
  },
  avatarEmoji: {
    fontSize: 60,
    textAlign: 'center'
  },
  hairColorIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff'
  },
  clothingColorIndicator: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff'
  },
  previewLabel: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    justifyContent: 'center'
  },
  statItem: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
    minWidth: 100
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: 2
  },
  statValue: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary
  },
  categoryTabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.md,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    gap: Spacing.xs
  },
  categoryTab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.background.primary
  },
  categoryTabActive: {
    backgroundColor: Colors.primary.main
  },
  categoryTabText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.secondary,
    textTransform: 'capitalize'
  },
  categoryTabTextActive: {
    color: Colors.text.inverse
  },
  optionsScroll: {
    flex: 1
  },
  optionsContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    justifyContent: 'center'
  },
  emojiOption: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.neutral.gray200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  emojiOptionSelected: {
    borderColor: Colors.primary.main,
    backgroundColor: Colors.primary.light + '20'
  },
  emojiText: {
    fontSize: 40,
    marginBottom: Spacing.xs
  },
  optionLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    textAlign: 'center',
    fontWeight: Typography.fontWeight.medium
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    justifyContent: 'center'
  },
  colorOption: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  colorOptionSelected: {
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3
  },
  checkmark: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  colorLabel: {
    position: 'absolute',
    bottom: 4,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200
  },
  randomButton: {
    flex: 1,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center'
  },
  randomButtonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary
  },
  continueButton: {
    flex: 1,
    backgroundColor: Colors.primary.main,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  continueButtonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.inverse
  }
});

export default EnhancedAvatarBuilder;

