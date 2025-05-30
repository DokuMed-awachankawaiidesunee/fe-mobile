import { moderateScale } from 'react-native-size-matters';

export const FontFamily = {
  bold: 'Figtree_700Bold',
  semibold: 'Figtree_600SemiBold',
  medium: 'Figtree_500Medium',
  regular: 'Figtree_400Regular',
  light: 'Figtree_300Light',
  black: 'Figtree_900Black',
};

const colors = {
  'dark-blue': '#02273A',
  'purple': '#59539D',
  'light-purple': '#DEBEEF',
  'light-rose': '#FBDFD3',
  'light-green': '#C6DED0',
  'cream': '#FDFAF1',
  'neutral-200': '#F1F1F1',
  'neutral-300': '#F5F5F5',
  'neutral-500': '#D9D9D9',
  'neutral-800': '#8F8F8F',
};

const lightColors = {
  primary: colors['purple'],
  secondary: colors['light-purple'],
  background: colors['cream'],
  surface: colors['neutral-300'],
  card: colors['neutral-200'],
  text: colors['dark-blue'],
  textSecondary: colors['neutral-800'],
  border: colors['neutral-500'],
  notification: colors['light-rose'],
  success: colors['light-green'],
  warning: colors['light-purple'],
  error: colors['light-rose'],
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

export type Theme = typeof lightTheme;

export default lightTheme;