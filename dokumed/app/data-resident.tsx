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
  Platform
} from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

export default function DataResident() {
  const { theme } = useTheme();
  const [nik, setNik] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  
  const handleNext = () => {
    // Validasi data
    if (!nik || !address || !city || !province) {
      alert('Silakan lengkapi semua data');
      return;
    }
    
    // Simpan data dan navigasi ke halaman berikutnya
    router.push('/data-personal');
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
      borderRadius: 50,
      padding: 15,
      marginBottom: 20,
      fontSize: 16,
      fontFamily: theme.fontFamily.regular,
      marginHorizontal: 20,
    },
    addressInput: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 15,
      marginBottom: 20,
      fontSize: 16,
      fontFamily: theme.fontFamily.regular,
      height: 100,
      textAlignVertical: 'top',
      marginHorizontal: 20,
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
                
                <Text style={styles.progressStep}>2 Data Penduduk</Text>
                
                <View style={styles.progressBar}>
                  <View style={styles.progressBarInactive} />
                  <View style={styles.progressBarActive} />
                  <View style={styles.progressBarInactive} />
                </View>
              </View>

              <View>
                <Text style={styles.inputLabel}>NIK</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan NIK Anda"
                  value={nik}
                  onChangeText={setNik}
                  keyboardType="number-pad"
                  maxLength={16}
                />
                
                <Text style={styles.inputLabel}>Alamat</Text>
                <TextInput
                  style={styles.addressInput}
                  placeholder="Masukkan alamat Anda"
                  value={address}
                  onChangeText={setAddress}
                  multiline={true}
                  numberOfLines={4}
                />
                
                <Text style={styles.inputLabel}>Kota</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan kota Anda"
                  value={city}
                  onChangeText={setCity}
                />
                
                <Text style={styles.inputLabel}>Province</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan nomor telepon"
                  value={province}
                  onChangeText={setProvince}
                />
                
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