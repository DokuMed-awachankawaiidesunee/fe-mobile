import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Alert 
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import type { SFSymbols6_0 } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const { theme } = useTheme();

  const profileData = {
    name: 'Awa awa',
    avatar: require('@/assets/images/doku-pfp.png'),
    domisili: 'Bandung, Indonesia',
    jenisKelamin: 'Perempuan',
    tanggalLahir: '29/02/2005',
    beratBadan: '50 kilogram',
    tinggiBadan: '160 centimeter',
    golonganDarah: 'AB',
    riwayatPenyakit: '-'
  };

  const handleLogout = async () => {
    Alert.alert(
      "Konfirmasi Logout",
      "Apakah Anda yakin ingin keluar dari akun?",
      [
        {
          text: "Batal",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userToken');
              
              router.replace('/landing');
            } catch (error) {
              console.error("Error during logout:", error);
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      padding: theme.spacing.sh3,
    },
    avatarContainer: {
      marginVertical: theme.spacing.b1,
      alignItems: 'center',
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: theme.spacing.b1,
      backgroundColor: theme.colors.neutral_200, 
    },
    name: {
      fontSize: theme.fontSizes.b1,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.b1,
    },
    editButton: {
      backgroundColor: theme.colors.purple, 
      paddingHorizontal: theme.spacing.b1,
      paddingVertical: theme.spacing.b3,
      borderRadius: 50,
    },
    editButtonText: {
      color: theme.colors.white,
      fontFamily: theme.fontFamily.medium,
      fontSize: theme.fontSizes.b2,
    },
    infoContainer: {
      width: '100%',
      marginBottom: theme.spacing.b1,
    },
    infoSection: {
      marginBottom: theme.spacing.b1,
      marginHorizontal: 20,
    },
    infoLabel: {
      fontSize: theme.fontSizes.sh3,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.b3,
    },
    infoValue: {
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.text,
    },
    logoutButton: {
      backgroundColor: theme.colors.light_purple, 
      paddingHorizontal: theme.spacing.b1,
      paddingVertical: theme.spacing.b3,
      borderRadius: 50,
      marginTop: theme.spacing.b1,
      width: '100%',
      alignItems: 'center',
    },
    logoutButtonText: {
      color: theme.colors.purple, 
      fontFamily: theme.fontFamily.medium,
      fontSize: theme.fontSizes.b2,
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <Image 
              source={profileData.avatar} 
              style={styles.avatar} 
              resizeMode="cover"
            />
            <Text style={styles.name}>{profileData.name}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profil</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Domisili</Text>
              <Text style={styles.infoValue}>{profileData.domisili}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Jenis Kelamin</Text>
              <Text style={styles.infoValue}>{profileData.jenisKelamin}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Tanggal Lahir</Text>
              <Text style={styles.infoValue}>{profileData.tanggalLahir}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Berat Badan</Text>
              <Text style={styles.infoValue}>{profileData.beratBadan}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Tinggi Badan</Text>
              <Text style={styles.infoValue}>{profileData.tinggiBadan}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Golongan Darah</Text>
              <Text style={styles.infoValue}>{profileData.golonganDarah}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Riwayat Penyakit</Text>
              <Text style={styles.infoValue}>{profileData.riwayatPenyakit}</Text>
            </View>
            
            {/* Tombol Logout */}
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}