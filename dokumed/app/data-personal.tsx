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
  GestureResponderEvent,
  Alert
} from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';

export default function DataPersonal() {
  const { theme } = useTheme();
  const { setRegistrationData, submitRegistrationData } = useAuth();
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async () => {
    // Validasi data
    if (!birthDate || !gender || !bloodType) {
      Alert.alert('Error', 'Silakan lengkapi semua data');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Simpan data ke context
      setRegistrationData({
        birth_date: birthDate,
        gender,
        blood_type: bloodType
      });
      
      // Submit semua data registrasi
      await submitRegistrationData();
      
      // Navigasi ke halaman login (ditangani oleh context)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Gagal menyelesaikan pendaftaran';
      Alert.alert('Error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Definisikan tipe untuk props komponen Dropdown
  interface DropdownProps {
    placeholder: string;
    value: string;
    onPress: (event: GestureResponderEvent) => void;
  }

  // Komponen dropdown dengan tipe yang telah didefinisikan
  const Dropdown: React.FC<DropdownProps> = ({ placeholder, value, onPress }) => (
    <TouchableOpacity 
      style={styles.dropdown}
      onPress={onPress}
    >
      <Text style={value ? styles.dropdownText : styles.dropdownPlaceholder}>
        {value || placeholder}
      </Text>
      <Text style={styles.dropdownIcon}>▼</Text>
    </TouchableOpacity>
  );

  // Simulasi memilih jenis kelamin
  const handleSelectGender = () => {
    // Dalam aplikasi nyata, ini akan menampilkan modal atau picker
    setGender('Perempuan'); // Hard-coded untuk demo
  };

  // Simulasi memilih golongan darah
  const handleSelectBloodType = () => {
    // Dalam aplikasi nyata, ini akan menampilkan modal atau picker
    setBloodType('AB'); // Hard-coded untuk demo
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
    dateInput: {
      backgroundColor: '#fff',
      borderRadius: 50,
      padding: 15,
      marginBottom: 20,
      fontSize: 16,
      fontFamily: theme.fontFamily.regular,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
    },
    dateIcon: {
      color: '#757575',
      marginRight: 10,
      fontSize: 20,
    },
    dateInputText: {
      flex: 1,
      fontSize: 16,
      fontFamily: theme.fontFamily.regular,
      color: '#000',
    },
    dropdown: {
      backgroundColor: '#fff',
      borderRadius: 50,
      padding: 15,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 20,
    },
    dropdownText: {
      fontSize: 16,
      fontFamily: theme.fontFamily.regular,
      color: '#000',
    },
    dropdownPlaceholder: {
      fontSize: 16,
      fontFamily: theme.fontFamily.regular,
      color: '#757575',
    },
    dropdownIcon: {
      color: '#757575',
      fontSize: 16,
    },
    submitButton: {
      backgroundColor: theme.colors.purple,
      borderRadius: 50,
      padding: 15,
      alignItems: 'center',
      marginTop: 20,
      marginHorizontal: 20,
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
                
                <Text style={styles.progressStep}>3 Data diri</Text>
                
                <View style={styles.progressBar}>
                  <View style={styles.progressBarInactive} />
                  <View style={styles.progressBarInactive} />
                  <View style={styles.progressBarActive} />
                </View>
              </View>

              <View>
                <Text style={styles.inputLabel}>
                  Tanggal Lahir <Text style={styles.requiredIndicator}>*</Text>
                </Text>
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={() => {
                    // Dalam aplikasi nyata, akan menampilkan date picker
                    setBirthDate('29/02/2005'); // Hard-coded untuk demo
                  }}
                  disabled={isLoading}
                >
                  <Text style={styles.dateIcon}>📅</Text>
                  <Text style={birthDate ? styles.dateInputText : [styles.dateInputText, { color: '#757575' }]}>
                    {birthDate || 'Masukkan tanggal lahir Anda'}
                  </Text>
                </TouchableOpacity>
                
                <Text style={styles.inputLabel}>
                  Jenis Kelamin <Text style={styles.requiredIndicator}>*</Text>
                </Text>
                <Dropdown 
                  placeholder="Pilih jenis kelamin Anda"
                  value={gender}
                  onPress={handleSelectGender}
                />
                
                <Text style={styles.inputLabel}>
                  Golongan Darah <Text style={styles.requiredIndicator}>*</Text>
                </Text>
                <Dropdown 
                  placeholder="Pilih golongan darah Anda"
                  value={bloodType}
                  onPress={handleSelectBloodType}
                />
                
                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={handleSubmit}
                  disabled={isLoading}
                >
                  <Text style={styles.submitButtonText}>
                    {isLoading ? 'Memproses...' : 'Kirim'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}