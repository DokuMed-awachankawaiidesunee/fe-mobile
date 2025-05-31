import React, { useState, useEffect } from 'react';
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
  Alert,
  ActivityIndicator
} from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';
import otpService from '@/services/otpService';
import authService from '@/services/authService';

export default function Register() {
  const { theme } = useTheme();
  const { setPhone, loginWithGoogle, setRegisterFlow } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  
  // Set auth flow ke register saat komponen dipasang
  useEffect(() => {
    setRegisterFlow();
  }, []);
  
  // Fungsi untuk memulai proses registrasi
  const handleStartRegistration = async () => {
    if (phoneNumber.trim() === '') {
      Alert.alert('Error', 'Silakan masukkan nomor telepon Anda');
      return;
    }
    
    try {
      setIsChecking(true);
      
      // Periksa apakah nomor telepon sudah terdaftar
      const isRegistered = await authService.checkPhoneExists(phoneNumber);
      
      if (isRegistered) {
        Alert.alert(
          'Nomor sudah terdaftar',
          'Nomor telepon ini sudah terdaftar. Silakan login.',
          [
            { text: 'Batal', style: 'cancel' },
            { 
              text: 'Login Sekarang', 
              onPress: () => router.push('/login')
            }
          ]
        );
        setIsChecking(false);
        return;
      }
      
      setIsChecking(false);
      setIsLoading(true);
      
      // Store phone in context
      setPhone(phoneNumber);
      
      // Send OTP
      const response = await otpService.sendOtp(phoneNumber);
      
      if (response.success) {
        // Navigate to verification page
        router.push('/verification');
      } else {
        Alert.alert('Error', response.message || 'Gagal mengirim kode OTP');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Terjadi kesalahan';
      Alert.alert('Error', errorMsg);
    } finally {
      setIsLoading(false);
      setIsChecking(false);
    }
  };

  const handleGoogleRegistration = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
      // After successful Google login, navigate to data-general
      // Navigation is handled in the auth context based on authFlow
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Gagal login dengan Google';
      Alert.alert('Error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login');
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
      justifyContent: 'center',
      padding: theme.spacing.sh3,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    logo: {
      width: 250,
      height: 100,
      marginBottom: 8,
    },
    appName: {
      fontSize: 28,
      fontFamily: theme.fontFamily.bold,
      color: '#000',
    },
    welcomeText: {
      fontSize: 28,
      fontFamily: theme.fontFamily.bold,
      textAlign: 'center',
      marginBottom: 40,
      color: '#000',
    },
    highlightText: {
      color: theme.colors.purple,
    },
    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 50,
      padding: 15,
      marginBottom: 20,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      marginHorizontal: 25,
    },
    googleIcon: {
      width: 24,
      height: 24,
      marginRight: 12,
    },
    googleButtonText: {
      color: '#757575',
      fontSize: 16,
      fontFamily: theme.fontFamily.medium,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: '#E0E0E0',
    },
    dividerText: {
      color: '#757575',
      paddingHorizontal: 15,
      fontFamily: theme.fontFamily.regular,
    },
    phoneInput: {
      backgroundColor: '#fff',
      borderRadius: 50,
      padding: 15,
      fontSize: 16,
      fontFamily: theme.fontFamily.regular,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      marginHorizontal: 25,
    },
    registerButton: {
      backgroundColor: theme.colors.purple,
      borderRadius: 50,
      padding: 15,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20,
      marginHorizontal: 25,
    },
    registerButtonText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: theme.fontFamily.semibold,
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginText: {
      color: '#757575',
      fontFamily: theme.fontFamily.regular,
    },
    loginLink: {
      color: theme.colors.purple,
      fontFamily: theme.fontFamily.semibold,
      marginLeft: 5,
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255,255,255,0.7)',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
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
          {isChecking && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={theme.colors.purple} />
              <Text style={{ marginTop: 10, fontFamily: theme.fontFamily.medium }}>
                Memeriksa nomor telepon...
              </Text>
            </View>
          )}
          
          <SafeAreaView style={styles.content}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('@/assets/images/app-logo-2.png')} 
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.welcomeText}>
              Senang berkenalan{'\n'}dengan Anda di <Text style={styles.highlightText}>DokuMed</Text>!
            </Text>
            
            <TouchableOpacity 
              style={styles.googleButton}
              onPress={handleGoogleRegistration}
              disabled={isLoading || isChecking}
            >
              <Image 
                source={require('@/assets/images/google-icon.png')} 
                style={styles.googleIcon}
                resizeMode="contain"
              />
              <Text style={styles.googleButtonText}>Daftar dengan akun Google</Text>
            </TouchableOpacity>
            
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>atau</Text>
              <View style={styles.divider} />
            </View>
            
            <TextInput
              style={styles.phoneInput}
              placeholder="Nomor Telepon"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              editable={!isLoading && !isChecking}
            />
            
            <TouchableOpacity 
              style={styles.registerButton} 
              onPress={handleStartRegistration}
              disabled={isLoading || isChecking}
            >
              <Text style={styles.registerButtonText}>
                {isLoading ? 'Memproses...' : 'Daftar'}
              </Text>
            </TouchableOpacity>
            
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Sudah memiliki akun?</Text>
              <TouchableOpacity onPress={handleLoginRedirect} disabled={isLoading || isChecking}>
                <Text style={styles.loginLink}>Masuk Sekarang</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}