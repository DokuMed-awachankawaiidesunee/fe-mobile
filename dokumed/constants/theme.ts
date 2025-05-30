// theme.ts
import { moderateScale } from 'react-native-size-matters';

export const FontFamily = {
  bold: 'Figtree_700Bold',
  semibold: 'Figtree_600SemiBold',
  medium: 'Figtree_500Medium',
  regular: 'Figtree_400Regular',
  light: 'Figtree_300Light',
  black: 'Figtree_900Black',
};

const lightColors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  surface: '#F2F2F7',
  card: '#FFFFFF',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
  notification: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
};

export const darkColors = {
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  background: '#000000',
  surface: '#1C1C1E',
  card: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  border: '#38383A',
  notification: '#FF453A',
  success: '#30D158',
  warning: '#FF9F0A',
  error: '#FF453A',
};

export const lightTheme = {
  dark: false,
  colors: lightColors,
  fontSizes: {
    xxl: moderateScale(32),
    xl: moderateScale(28),
    lg: moderateScale(24),
    md: moderateScale(20),
    body: moderateScale(17),
    sm: moderateScale(14),
    xs: moderateScale(12),
    xxs: moderateScale(10),
    xxxs: moderateScale(8),
  },
  spacing: {
    none: 0,
    xxs: moderateScale(4),
    xs: moderateScale(8),
    md: moderateScale(12),
    lg: moderateScale(16),
    xl: moderateScale(20),
    xxl: moderateScale(24),
    xxxl: moderateScale(28),
  },
  fontFamily: FontFamily,
};

export const darkTheme = {
  dark: true,
  colors: darkColors,
  fontSizes: lightTheme.fontSizes,
  spacing: lightTheme.spacing,
  fontFamily: FontFamily,
};

export type Theme = typeof lightTheme;

export default lightTheme;