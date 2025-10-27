import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { 
  Gender, SkinTone, HairStyle, HairColor, ClothingStyle, ClothingColor, 
  Accessory, AvatarCustomization, generateAvatarEmoji 
} from '../types/avatar';

type NavProp = StackNavigationProp<RootStackParamList, 'AvatarBuilder'>;

interface Props {
  navigation: NavProp;
  onComplete: (customization: AvatarCustomization) => void;
}

const AvatarBuilder: React.FC<Props> = ({ navigation, onComplete }) => {
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [skinTone, setSkinTone] = useState<SkinTone>(SkinTone.MEDIUM);
  const [hairStyle, setHairStyle] = useState<HairStyle>(HairStyle.SHORT);
  const [hairColor, setHairColor] = useState<HairColor>(HairColor.BLACK);
  const [clothingStyle, setClothingStyle] = useState<ClothingStyle>(ClothingStyle.CASUAL);
  const [clothingColor, setClothingColor] = useState<ClothingColor>(ClothingColor.BLUE);
  const [accessories, setAccessories] = useState<Accessory[]>([Accessory.NONE]);

  const customization: AvatarCustomization = {
    gender,
    skinTone,
    hairStyle,
    hairColor,
    clothingStyle,
    clothingColor,
    accessories,
    emoji: generateAvatarEmoji({ gender, skinTone, hairStyle, hairColor, clothingStyle, clothingColor, accessories })
  };

  const toggleAccessory = (accessory: Accessory) => {
    if (accessory === Accessory.NONE) {
      setAccessories([Accessory.NONE]);
      return;
    }
    
    const filtered = accessories.filter(a => a !== Accessory.NONE);
    if (filtered.includes(accessory)) {
      const newAccessories = filtered.filter(a => a !== accessory);
      setAccessories(newAccessories.length === 0 ? [Accessory.NONE] : newAccessories);
    } else {
      setAccessories([...filtered, accessory]);
    }
  };

  const getSkinToneColor = (tone: SkinTone): string => {
    const colors: Record<SkinTone, string> = {
      [SkinTone.VERY_LIGHT]: '#FFE4C4',
      [SkinTone.LIGHT]: '#F5D7B1',
      [SkinTone.MEDIUM]: '#D4A574',
      [SkinTone.TAN]: '#B08968',
      [SkinTone.DARK]: '#8B6F47'
    };
    return colors[tone];
  };

  const getHairColorValue = (color: HairColor): string => {
    const colors: Record<HairColor, string> = {
      [HairColor.BLACK]: '#000000',
      [HairColor.BROWN]: '#8B4513',
      [HairColor.BLONDE]: '#FFD700',
      [HairColor.RED]: '#DC143C',
      [HairColor.GRAY]: '#808080',
      [HairColor.WHITE]: '#FFFFFF',
      [HairColor.BLUE]: '#4169E1',
      [HairColor.PURPLE]: '#9370DB'
    };
    return colors[color];
  };

  const getClothingColorValue = (color: ClothingColor): string => {
    const colors: Record<ClothingColor, string> = {
      [ClothingColor.RED]: '#FF6B6B',
      [ClothingColor.BLUE]: '#4ECDC4',
      [ClothingColor.GREEN]: '#95E1D3',
      [ClothingColor.YELLOW]: '#FFE66D',
      [ClothingColor.PURPLE]: '#A8E6CF',
      [ClothingColor.ORANGE]: '#FFB347',
      [ClothingColor.PINK]: '#FFB6C1',
      [ClothingColor.BLACK]: '#2C3E50',
      [ClothingColor.WHITE]: '#ECF0F1',
      [ClothingColor.GRAY]: '#95A5A6'
    };
    return colors[color];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>✨ Customize Your Avatar</Text>
        <Text style={styles.subtitle}>Create your unique character</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Avatar Preview */}
        <View style={styles.previewContainer}>
          <View style={styles.previewCard}>
            <Text style={styles.previewAvatar}>{customization.emoji}</Text>
            <View style={styles.previewDetails}>
              <Text style={styles.previewText}>Gender: {gender}</Text>
              <Text style={styles.previewText}>Skin: {skinTone.replace('_', ' ')}</Text>
              <Text style={styles.previewText}>Hair: {hairStyle} / {hairColor}</Text>
              <Text style={styles.previewText}>Outfit: {clothingStyle} / {clothingColor}</Text>
            </View>
          </View>
        </View>

        {/* Gender Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gender</Text>
          <View style={styles.optionRow}>
            <TouchableOpacity
              style={[styles.optionButton, gender === Gender.MALE && styles.optionButtonActive]}
              onPress={() => setGender(Gender.MALE)}
            >
              <Text style={styles.optionEmoji}>👦</Text>
              <Text style={[styles.optionText, gender === Gender.MALE && styles.optionTextActive]}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, gender === Gender.FEMALE && styles.optionButtonActive]}
              onPress={() => setGender(Gender.FEMALE)}
            >
              <Text style={styles.optionEmoji}>👧</Text>
              <Text style={[styles.optionText, gender === Gender.FEMALE && styles.optionTextActive]}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Skin Tone Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skin Tone</Text>
          <View style={styles.colorRow}>
            {Object.values(SkinTone).map((tone) => (
              <TouchableOpacity
                key={tone}
                style={[
                  styles.colorButton,
                  { backgroundColor: getSkinToneColor(tone) },
                  skinTone === tone && styles.colorButtonActive
                ]}
                onPress={() => setSkinTone(tone)}
              />
            ))}
          </View>
        </View>

        {/* Hair Style Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hair Style</Text>
          <View style={styles.optionGrid}>
            {Object.values(HairStyle).map((style) => (
              <TouchableOpacity
                key={style}
                style={[styles.gridButton, hairStyle === style && styles.gridButtonActive]}
                onPress={() => setHairStyle(style)}
              >
                <Text style={[styles.gridText, hairStyle === style && styles.gridTextActive]}>
                  {style.replace('_', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Hair Color Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hair Color</Text>
          <View style={styles.colorRow}>
            {Object.values(HairColor).map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: getHairColorValue(color) },
                  hairColor === color && styles.colorButtonActive,
                  color === HairColor.WHITE && { borderWidth: 1, borderColor: '#ccc' }
                ]}
                onPress={() => setHairColor(color)}
              />
            ))}
          </View>
        </View>

        {/* Clothing Style Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clothing Style</Text>
          <View style={styles.optionGrid}>
            {Object.values(ClothingStyle).map((style) => (
              <TouchableOpacity
                key={style}
                style={[styles.gridButton, clothingStyle === style && styles.gridButtonActive]}
                onPress={() => setClothingStyle(style)}
              >
                <Text style={[styles.gridText, clothingStyle === style && styles.gridTextActive]}>
                  {style}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Clothing Color Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clothing Color</Text>
          <View style={styles.colorRow}>
            {Object.values(ClothingColor).map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: getClothingColorValue(color) },
                  clothingColor === color && styles.colorButtonActive,
                  color === ClothingColor.WHITE && { borderWidth: 1, borderColor: '#ccc' }
                ]}
                onPress={() => setClothingColor(color)}
              />
            ))}
          </View>
        </View>

        {/* Accessories Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessories (Optional)</Text>
          <View style={styles.optionGrid}>
            {Object.values(Accessory).map((accessory) => (
              <TouchableOpacity
                key={accessory}
                style={[
                  styles.gridButton,
                  accessories.includes(accessory) && styles.gridButtonActive
                ]}
                onPress={() => toggleAccessory(accessory)}
              >
                <Text style={[
                  styles.gridText,
                  accessories.includes(accessory) && styles.gridTextActive
                ]}>
                  {accessory === Accessory.NONE ? 'None' : accessory}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => onComplete(customization)}
        >
          <Text style={styles.continueButtonText}>Continue →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center'
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40
  },
  previewContainer: {
    marginBottom: 24
  },
  previewCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  previewAvatar: {
    fontSize: 80,
    marginBottom: 16
  },
  previewDetails: {
    alignItems: 'center'
  },
  previewText: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 4,
    textTransform: 'capitalize'
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12
  },
  optionRow: {
    flexDirection: 'row',
    gap: 12
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0'
  },
  optionButtonActive: {
    borderColor: '#4A90E2',
    backgroundColor: '#E3F2FD'
  },
  optionEmoji: {
    fontSize: 32,
    marginBottom: 8
  },
  optionText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '600'
  },
  optionTextActive: {
    color: '#4A90E2'
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: 'transparent'
  },
  colorButtonActive: {
    borderColor: '#4A90E2',
    transform: [{ scale: 1.1 }]
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  gridButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    minWidth: '30%'
  },
  gridButtonActive: {
    borderColor: '#4A90E2',
    backgroundColor: '#E3F2FD'
  },
  gridText: {
    fontSize: 13,
    color: '#7F8C8D',
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  gridTextActive: {
    color: '#4A90E2'
  },
  continueButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 18,
    marginTop: 20,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  }
});

export default AvatarBuilder;

