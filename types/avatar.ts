// Avatar customization types

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum SkinTone {
  VERY_LIGHT = 'very_light',
  LIGHT = 'light',
  MEDIUM = 'medium',
  TAN = 'tan',
  DARK = 'dark'
}

export enum HairStyle {
  SHORT = 'short',
  MEDIUM = 'medium',
  LONG = 'long',
  CURLY = 'curly',
  SPIKY = 'spiky',
  BALD = 'bald',
  PONYTAIL = 'ponytail',
  BRAIDS = 'braids'
}

export enum HairColor {
  BLACK = 'black',
  BROWN = 'brown',
  BLONDE = 'blonde',
  RED = 'red',
  GRAY = 'gray',
  WHITE = 'white',
  BLUE = 'blue',
  PURPLE = 'purple'
}

export enum ClothingStyle {
  CASUAL = 'casual',
  FORMAL = 'formal',
  SPORTY = 'sporty',
  TRENDY = 'trendy',
  TRADITIONAL = 'traditional'
}

export enum ClothingColor {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  PURPLE = 'purple',
  ORANGE = 'orange',
  PINK = 'pink',
  BLACK = 'black',
  WHITE = 'white',
  GRAY = 'gray'
}

export enum Accessory {
  NONE = 'none',
  GLASSES = 'glasses',
  SUNGLASSES = 'sunglasses',
  HAT = 'hat',
  CAP = 'cap',
  HEADBAND = 'headband',
  EARRINGS = 'earrings',
  NECKLACE = 'necklace',
  WATCH = 'watch'
}

export interface AvatarCustomization {
  gender: Gender;
  skinTone: SkinTone;
  hairStyle: HairStyle;
  hairColor: HairColor;
  clothingStyle: ClothingStyle;
  clothingColor: ClothingColor;
  accessories: Accessory[];
  emoji?: string; // Fallback emoji representation
}

export interface AvatarPreset {
  id: string;
  name: string;
  customization: AvatarCustomization;
  thumbnail: string;
}

// Helper to generate emoji-based avatar representation
export function generateAvatarEmoji(customization: AvatarCustomization): string {
  const skinToneMap: Record<SkinTone, string> = {
    [SkinTone.VERY_LIGHT]: '🏻',
    [SkinTone.LIGHT]: '🏼',
    [SkinTone.MEDIUM]: '🏽',
    [SkinTone.TAN]: '🏾',
    [SkinTone.DARK]: '🏿'
  };

  const baseEmoji = customization.gender === Gender.MALE ? '👦' : '👧';
  const skinModifier = skinToneMap[customization.skinTone];
  
  return baseEmoji + skinModifier;
}

// Helper to generate avatar display string
export function getAvatarDisplayString(customization: AvatarCustomization): string {
  if (customization.emoji) return customization.emoji;
  return generateAvatarEmoji(customization);
}

