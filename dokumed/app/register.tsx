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
  Platform
} from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

export default function Register() {
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Fungsi untuk memulai proses registrasi
  const handleStartRegistration = () => {
    if (phoneNumber.trim() === '') {
      // Tampilkan pesan error jika nomor telepon kosong
      alert('Silakan masukkan nomor telepon Anda');
      return;
    }
    
    // Navigasi ke halaman verifikasi OTP
    router.push('/verification');
  };

  const handleLoginRedirect = () => {
    // Navigasi ke halaman login
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
            
            <TouchableOpacity style={styles.googleButton}>
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
            />
            
            <TouchableOpacity 
              style={styles.registerButton} 
              onPress={handleStartRegistration}
            >
              <Text style={styles.registerButtonText}>Daftar</Text>
            </TouchableOpacity>
            
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Sudah memiliki akun?</Text>
              <TouchableOpacity onPress={handleLoginRedirect}>
                <Text style={styles.loginLink}>Masuk Sekarang</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}