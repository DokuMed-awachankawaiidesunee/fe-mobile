import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {
  Figtree_300Light,
  Figtree_400Regular,
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
  Figtree_800ExtraBold,
  Figtree_900Black,
} from '@expo-google-fonts/figtree';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Appearance } from 'react-native';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { CustomThemeProvider } from '../hooks/useTheme';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  const [loaded] = useFonts({
    Figtree_300Light,
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
    Figtree_800ExtraBold,
    Figtree_900Black,
  });

  // Force light mode
  useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <AuthProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="landing" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="verification" options={{ headerShown: false }} />
            <Stack.Screen name="password" options={{ headerShown: false }} />
            <Stack.Screen name="data-general" options={{ headerShown: false }} />
            <Stack.Screen name="data-resident" options={{ headerShown: false }} />
            <Stack.Screen name="data-personal" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="dark" />
        </ThemeProvider>
      </AuthProvider>
    </CustomThemeProvider>
  );
}