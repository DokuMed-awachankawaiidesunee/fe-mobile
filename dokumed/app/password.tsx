import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  ImageBackground,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';

export default function Password() {
  const { theme } = useTheme();
  const { login, phone } = useAuth();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = async () => {
    if (!password || password.trim() === '') {
      Alert.alert('Error', 'Silakan masukkan password Anda');
      return;
    }
    
    try {
      setIsLoading(true);
      await login(phone, password);
      // Navigation is handled in the auth context
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Login gagal';
      Alert.alert('Error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImage: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    content: {
      flex: 1,
      padding: theme.spacing.sh3,
      paddingTop: 100,
    },
    header: {
      marginBottom: 40,
      marginHorizontal: 25,
      marginTop: 50,
    },
    title: {
      fontSize: 24,
      fontFamily: theme.fontFamily.bold,
      color: '#000',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: theme.fontFamily.regular,
      color: '#000',
    },
    phoneNumber: {
      fontFamily: theme.fontFamily.medium,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 50,
      paddingHorizontal: 15,
      marginBottom: 30,
      marginHorizontal: 25,
    },
    passwordInput: {
      flex: 1,
      padding: 15,
      fontSize: 16,
      fontFamily: theme.fontFamily.regular,
    },
    eyeIcon: {
      padding: 10,
    },
    submitButton: {
      backgroundColor: theme.colors.purple,
      borderRadius: 50,
      padding: 15,
      alignItems: 'center',
      marginTop: 20,
      marginHorizontal: 25,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: theme.fontFamily.semibold,
    },
    backButton: {
      position: 'absolute',
      top: 60,
      left: 25,
      zIndex: 10,
    },
    backIcon: {
      width: 18,
      height: 18,
      tintColor: '#000',
    },
    forgotPasswordLink: {
      alignSelf: 'center',
      marginTop: 15,
    },
    forgotPasswordText: {
      color: theme.colors.purple,
      fontFamily: theme.fontFamily.medium,
      fontSize: 14,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Stack.Screen options={{ headerShown: false }} />
        <ImageBackground 
          source={require('@/assets/images/bg-auth.png')} 
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <SafeAreaView style={styles.content}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
                <Image 
                  source={require('@/assets/images/arrow-back.png')} 
                  style={styles.backIcon}
                />
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.title}>
                Masukkan Password Anda
              </Text>
              <Text style={styles.subtitle}>
                untuk Nomor <Text style={styles.phoneNumber}>{phone}</Text>
              </Text>
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowPassword}>
                <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? 'Memproses...' : 'Masuk'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPasswordLink}>
              <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}