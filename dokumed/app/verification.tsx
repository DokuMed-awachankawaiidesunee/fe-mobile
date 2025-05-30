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
  TextInputKeyPressEventData
} from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

export default function Verification() {
  const { theme } = useTheme();
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  // Definisikan tipe yang benar untuk inputRefs
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);
  
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
    
    // Auto-focus ke input berikutnya jika ada nilai
    if (value !== '' && index < 3 && inputRefs.current[index + 1]) {
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
  const handleVerifyOtp = () => {
    // Cek apakah semua digit OTP sudah diisi
    if (otp.every(digit => digit !== '')) {
      // Navigasi ke halaman data umum
      router.push('/data-general');
    } else {
      alert('Silakan masukkan kode verifikasi lengkap');
    }
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
      width: 70,
      height: 70,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 12,
      textAlign: 'center',
      fontSize: 24,
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
                Sebelum lanjut, Silakan{'\n'}Masukkan Kode Verifikasi 4 Digit
              </Text>
              <Text style={styles.subtitle}>
                yang Kami Kirim ke <Text style={styles.phoneNumber}>08*******99</Text>
              </Text>
            </View>

            <View style={styles.otpContainer}>
              {[0, 1, 2, 3].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref) => { inputRefs.current[index] = ref; }}
                  style={styles.otpInput}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={otp[index]}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleVerifyOtp}
            >
              <Text style={styles.submitButtonText}>Kirim</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}