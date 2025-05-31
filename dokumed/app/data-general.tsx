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
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';

export default function DataGeneral() {
  const { theme } = useTheme();
  const { setRegistrationData } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleNext = () => {
    // Validasi data
    if (!firstName || !lastName || !email || !phone || !password) {
      Alert.alert('Error', 'Silakan lengkapi semua data');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password dan konfirmasi password tidak cocok');
      return;
    }
    
    // Validasi kekuatan password
    if (password.length < 8) {
      Alert.alert('Error', 'Password harus terdiri dari minimal 8 karakter');
      return;
    }
    
    // Validasi format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Format email tidak valid');
      return;
    }
    
    // Simpan data ke context
    setRegistrationData({
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phone,
      password
    });
    
    // Navigasi ke halaman berikutnya
    router.push('/data-resident');
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
      paddingTop: 80,
    },
    header: {
      marginBottom: 30,
      marginHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontFamily: theme.fontFamily.bold,
      color: '#000',
      marginBottom: 20,
    },
    progressContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    progressStep: {
      color: theme.colors.purple,
      fontSize: 16,
      fontFamily: theme.fontFamily.medium,
      marginRight: 5,
    },
    progressBar: {
      flexDirection: 'row',
      height: 8,
      marginBottom: 40,
    },
    progressBarActive: {
      flex: 1,
      backgroundColor: theme.colors.purple,
      borderRadius: 4,
      marginRight: 5,
    },
    progressBarInactive: {
      flex: 1,
      backgroundColor: '#E0E0E0',
      borderRadius: 4,
      marginRight: 5,
    },
    inputLabel: {
      fontSize: 16,
      fontFamily: theme.fontFamily.medium,
      color: '#000',
      marginBottom: 8,
      marginHorizontal: 20,
    },
    input: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 15,
      marginBottom: 20,
      fontSize: 16,
      fontFamily: theme.fontFamily.regular,
      marginHorizontal: 20,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 20,
      paddingHorizontal: 15,
      marginBottom: 20,
      marginHorizontal: 20,
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
    passwordHint: {
      fontSize: 12,
      fontFamily: theme.fontFamily.regular,
      color: '#757575',
      marginHorizontal: 20,
      marginTop: -15,
      marginBottom: 15,
    },
    nextButton: {
      backgroundColor: theme.colors.purple,
      borderRadius: 50,
      padding: 15,
      alignItems: 'center',
      marginTop: 20,
      marginHorizontal: 20,
    },
    nextButtonText: {
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
    requiredIndicator: {
      color: 'red',
      marginLeft: 4,
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
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Image 
                    source={require('@/assets/images/arrow-back.png')} 
                    style={styles.backIcon}
                />
            </TouchableOpacity>

            <ScrollView 
              style={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.header}>
                <Text style={styles.title}>
                  Yuk, lengkapi dulu{'\n'}data diri Anda!
                </Text>
                
                <Text style={styles.progressStep}>1 Data Umum</Text>
                
                <View style={styles.progressBar}>
                  <View style={styles.progressBarActive} />
                  <View style={styles.progressBarInactive} />
                  <View style={styles.progressBarInactive} />
                </View>
              </View>

              <View>
                <Text style={styles.inputLabel}>
                  Nama Depan <Text style={styles.requiredIndicator}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan nama depan Anda"
                  value={firstName}
                  onChangeText={setFirstName}
                />
                
                <Text style={styles.inputLabel}>
                  Nama Belakang <Text style={styles.requiredIndicator}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan nama belakang Anda"
                  value={lastName}
                  onChangeText={setLastName}
                />
                
                <Text style={styles.inputLabel}>
                  Email <Text style={styles.requiredIndicator}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                
                <Text style={styles.inputLabel}>
                  Nomor Telepon <Text style={styles.requiredIndicator}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan nomor telepon"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
                
                <Text style={styles.inputLabel}>
                  Password <Text style={styles.requiredIndicator}>*</Text>
                </Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Buat password Anda"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowPassword}>
                    <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.passwordHint}>
                  Password minimal 8 karakter
                </Text>
                
                <Text style={styles.inputLabel}>
                  Konfirmasi Password <Text style={styles.requiredIndicator}>*</Text>
                </Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Konfirmasi password Anda"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowConfirmPassword}>
                    <Text>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  style={styles.nextButton}
                  onPress={handleNext}
                >
                  <Text style={styles.nextButtonText}>Lanjut</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}