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
  'white': '#FFFFFF',
};

const lightColors = {
  primary: colors['purple'],
  secondary: colors['light-purple'],
  background: colors['white'],
  surface: colors['neutral-300'],
  card: colors['neutral-200'],
  text: colors['dark-blue'],
  textSecondary: colors['neutral-800'],
  border: colors['neutral-500'],
  notification: colors['light-rose'],
  success: colors['light-green'],
  warning: colors['light-purple'],
  error: colors['light-rose'],
  purple: colors['purple'],
  dark_blue: colors['dark-blue'],
  light_purple: colors['light-purple'],
  light_rose: colors['light-rose'],
  light_green: colors['light-green'],
  cream: colors['cream'],
  neutral_200: colors['neutral-200'],
  neutral_300: colors['neutral-300'],
  neutral_500: colors['neutral-500'],
  neutral_800: colors['neutral-800'],
  black: '#000000',
  white: '#FFFFFF'
};

export const lightTheme = {
  dark: false,
  colors: lightColors,
  fontSizes: {
    h1: moderateScale(32),
    sh1: moderateScale(24),
    sh2: moderateScale(20),
    sh3: moderateScale(18),
    b1: moderateScale(18),
    b2: moderateScale(16),
    b3: moderateScale(14),
  },
  spacing: {
    none: 0,
    h1: moderateScale(32),
    sh1: moderateScale(24),
    sh2: moderateScale(20),
    sh3: moderateScale(14),
    b1: moderateScale(14),
    b2: moderateScale(10),
    b3: moderateScale(8),
  },
  fontFamily: FontFamily,
};

export type Theme = typeof lightTheme;

export default lightTheme;