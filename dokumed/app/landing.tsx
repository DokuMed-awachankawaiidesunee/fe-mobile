import { Stack } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

export default function Landing() {
  const { theme } = useTheme();

  const handleLogin = () => {
    router.replace('/login');  
  };

  const handleRegister = () => {
    router.push('/register');  
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.sh3,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing.sh2,
    },
    logo: {
      width: 120,
      height: 120,
    },
    textContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing.sh1,
    },
    title: {
      textAlign: 'center',
      marginBottom: theme.spacing.b1,
      fontSize: theme.fontSizes.sh1,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.dark_blue,
    },
    subtitle: {
      textAlign: 'center',
      paddingHorizontal: theme.spacing.b1,
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.dark_blue,
    },
    buttonContainer: {
      marginTop: theme.spacing.b1,
    },
    loginButton: {
      backgroundColor: theme.colors.light_purple,
      borderRadius: 10,
      paddingVertical: theme.spacing.b1,
      alignItems: 'center',
      marginBottom: theme.spacing.b1,
    },
    loginButtonText: {
      color: theme.colors.purple,
      fontFamily: theme.fontFamily.semibold,
      fontSize: theme.fontSizes.b2,
    },
    registerButton: {
      backgroundColor: theme.colors.purple,
      borderRadius: 10,
      paddingVertical: theme.spacing.b1,
      alignItems: 'center',
    },
    registerButtonText: {
      color: theme.colors.white,
      fontFamily: theme.fontFamily.semibold,
      fontSize: theme.fontSizes.b2,
    },
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/images/app-logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              DokuMed, sehat kini, sehat nanti!
            </Text>
            <Text style={styles.subtitle}>
              Masuk ke akun Anda untuk menikmati semua fitur DokuMed. Hidup lebih sehat dan teratur!
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>
                Masuk
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.registerButton} 
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>
                Daftar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}