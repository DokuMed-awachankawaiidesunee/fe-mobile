import React, { useState, useRef, useEffect } from 'react';
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
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Alert
} from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';

export default function Verification() {
  const { theme } = useTheme();
  const { phone, verifyOtp, authFlow } = useAuth();
  // 6 digit OTP
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  
  // Definisikan tipe yang benar untuk inputRefs, sekarang 6 digit
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null, null, null]);
  
  // Timer untuk memfokuskan input pertama saat halaman dimuat
  useEffect(() => {
    setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 100);
  }, []);

  // Fungsi untuk menangani perubahan input OTP
  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // File: app/verification.tsx (lanjutan)

    // Auto-focus ke input berikutnya jika ada nilai
    if (value !== '' && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Fungsi untuk menangani backspace dan pindah ke input sebelumnya
  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      // Pastikan inputRefs.current[index-1] tidak null sebelum memanggil focus()
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Fungsi untuk verifikasi OTP
  const handleVerifyOtp = async () => {
    // Cek apakah semua digit OTP sudah diisi
    if (!otp.every(digit => digit !== '')) {
      Alert.alert('Error', 'Silakan masukkan kode verifikasi lengkap');
      return;
    }
    
    try {
      setIsLoading(true);
      const otpCode = otp.join('');
      const isVerified = await verifyOtp(otpCode);
      
      if (isVerified) {
        // Navigate based on current auth flow (login or register)
        if (authFlow === 'register') {
          // Registration flow - go to data-general
          router.push('/data-general');
        } else {
          // Login flow - go to password
          router.push({
            pathname: '/password'
          } as any);
        }
      } else {
        Alert.alert('Error', 'Kode verifikasi tidak valid');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Verifikasi gagal';
      Alert.alert('Error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Format phone number for display
  const formatPhoneDisplay = (phone: string) => {
    if (!phone) return '';
    
    // Keep first 2 digits and last 2 digits visible, mask the rest
    if (phone.length <= 4) return phone;
    
    const firstPart = phone.substring(0, 2);
    const lastPart = phone.substring(phone.length - 2);
    const maskedPart = '*'.repeat(phone.length - 4);
    
    return `${firstPart}${maskedPart}${lastPart}`;
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
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 40,
      marginHorizontal: 25,
    },
    otpInput: {
      width: 50, // Lebih kecil untuk menampung 6 digit
      height: 50, // Lebih kecil untuk menampung 6 digit
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 12,
      textAlign: 'center',
      fontSize: 20, // Sedikit lebih kecil
      fontFamily: theme.fontFamily.bold,
      backgroundColor: '#fff',
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
    resendContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    resendText: {
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
                Sebelum lanjut, Silakan{'\n'}Masukkan Kode Verifikasi 6 Digit
              </Text>
              <Text style={styles.subtitle}>
                yang Kami Kirim ke <Text style={styles.phoneNumber}>{formatPhoneDisplay(phone)}</Text>
              </Text>
            </View>

            <View style={styles.otpContainer}>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref) => { inputRefs.current[index] = ref; }}
                  style={styles.otpInput}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={otp[index]}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  editable={!isLoading}
                />
              ))}
            </View>

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleVerifyOtp}
              disabled={isLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? 'Memproses...' : 'Kirim'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendContainer}>
              <Text style={styles.resendText}>Kirim ulang kode</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}