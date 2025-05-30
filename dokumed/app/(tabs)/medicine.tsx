import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { X } from 'lucide-react-native';
import { router } from 'expo-router';

interface Medicine {
  id: string;
  name: string;
  description: string;
  dosage: string;
  manufacturer: string;
  price: {
    highest: string;
    regular: string;
  };
  details: string;
  alternatives: Alternative[];
  activeIngredient: string;
  warnings: string;
  sideEffects: string;
}

interface Alternative {
  id: string;
  name: string;
  price: string;
  icon: string;
}

export default function MedicineScreen() {
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  const dummyMedicine: Medicine = {
    id: '1',
    name: 'ABACAVIR SULFATE',
    description: 'Abacavir Sulfate 300 mg Tablet Salut Selaput',
    dosage: '300 mg',
    manufacturer: 'Salut Selaput',
    price: {
      highest: 'Rp.15.000',
      regular: 'Rp.13.000',
    },
    details: 'Abacavir secara kompetitif menghambat reverse transcriptase retrovirus, mengganggu DNA polimerase yang bergantung pada RNA virus HIV yang mengakibatkan penghambatan replikasi virus.',
    alternatives: [
      {
        id: '1',
        name: 'Lamivudine',
        price: 'Rp.12.500',
        icon: 'graph',
      },
      {
        id: '2',
        name: 'Lamivudine',
        price: 'Rp.11.800',
        icon: 'graph',
      },
    ],
    activeIngredient: 'Abacavir',
    warnings: 'Pasien dengan faktor risiko penyakit hati (misalnya obesitas) dan mereka yang memiliki faktor risiko penyakit jantung koroner (misalnya hipertensi, DM, merokok). Gangguan ginjal atau hati ringan. Kehamilan.',
    sideEffects: 'Demam, ruam, batuk, sesak, lesu, malaise, sakit kepala, mialgia, gangguan GI, terutama mual, muntah, diare dan sakit perut; pankreatitis dan peningkatan nilai enzim hati, osteonekrosis.',
  };

  const searchMedicine = () => {
    if (searchText.trim() !== '') {
      setSelectedMedicine(dummyMedicine);
      setShowDetailModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setTimeout(() => {
      setSelectedMedicine(null);
    }, 300);
  };

  const handleBackToHome = () => {
    router.back();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.b1,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: theme.fontSizes.sh2,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.text,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing.b1,
      padding: theme.spacing.b3,
    },
    content: {
      flex: 1,
      padding: theme.spacing.b1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing.b1,
    },
    logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
    },
    welcomeText: {
      fontSize: theme.fontSizes.sh1,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.b1,
    },
    searchContainer: {
      width: '100%',
      marginTop: theme.spacing.b1,
    },
    searchInput: {
      backgroundColor: theme.colors.surface,
      borderRadius: 100,
      padding: theme.spacing.b1,
      fontSize: theme.fontSizes.b1,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.b1,
    },
    searchButton: {
      backgroundColor: theme.colors.purple,
      borderRadius: 100,
      padding: theme.spacing.b1,
      alignItems: 'center',
      marginTop: theme.spacing.b1,
    },
    searchButtonText: {
      color: theme.colors.white,
      fontSize: theme.fontSizes.b1,
      fontFamily: theme.fontFamily.semibold,
    },
    // Modal styles
    modalContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.b1,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    modalTitle: {
      fontSize: theme.fontSizes.sh2,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.text,
    },
    modalCloseButton: {
      position: 'absolute',
      right: theme.spacing.b1,
      padding: theme.spacing.b3,
    },
    medicineContainer: {
      padding: theme.spacing.b1,
    },
    medicineHeader: {
      flexDirection: 'row',
      marginBottom: theme.spacing.b1,
    },
    medicineIconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.colors.light_purple,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.b1,
    },
    medicineIcon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    medicineTitleContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    medicineName: {
      fontSize: theme.fontSizes.sh2,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.text,
      marginBottom: 4,
    },
    medicineDescription: {
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.text,
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: theme.spacing.b1,
    },
    priceBox: {
      flex: 1,
      padding: theme.spacing.b1,
      borderRadius: 12,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    highestPriceBox: {
      backgroundColor: theme.colors.light_rose,
    },
    regularPriceBox: {
      backgroundColor: theme.colors.light_green,
    },
    priceAmount: {
      fontSize: theme.fontSizes.sh2,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.text,
      marginBottom: 4,
    },
    priceLabel: {
      fontSize: theme.fontSizes.b3,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.text,
    },
    sectionContainer: {
      marginVertical: theme.spacing.b1,
    },
    sectionTitle: {
      fontSize: theme.fontSizes.sh3,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.b3,
    },
    sectionContent: {
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.text,
      lineHeight: 22,
    },
    alternativesContainer: {
      marginVertical: theme.spacing.b1,
    },
    alternativesRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    alternativeCard: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '48%',
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: theme.spacing.b3,
      marginRight: '2%',
      marginBottom: theme.spacing.b3,
    },
    alternativeIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.light_purple,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.b3,
    },
    alternativeInfo: {
      flex: 1,
    },
    alternativeName: {
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.text,
      marginBottom: 2,
    },
    alternativePrice: {
      fontSize: theme.fontSizes.b3,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.text,
    },
  });

  const renderWelcomeScreen = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DokuPharm</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleBackToHome}>
          <X size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/doku-pharm.png')} 
            style={styles.logo}
          />
        </View>
        
        <Text style={styles.welcomeText}>
          Selamat datang di DokuPham! Silakan masukkan obat Anda
        </Text>
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Masukkan Obat Anda"
            value={searchText}
            onChangeText={setSearchText}
          />
          
          <TouchableOpacity style={styles.searchButton} onPress={searchMedicine}>
            <Text style={styles.searchButtonText}>Cari Alternatif Obat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderMedicineDetail = () => (
    <Modal
      visible={showDetailModal}
      animationType="slide"
      onRequestClose={handleCloseModal}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>DokuPharm</Text>
          <TouchableOpacity style={styles.modalCloseButton} onPress={handleCloseModal}>
            <X size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.medicineContainer}>
          {selectedMedicine && (
            <>
              <View style={styles.medicineHeader}>
                <View style={styles.medicineIconContainer}>
                  <Image 
                    source={require('@/assets/images/doku-pharm.png')} 
                    style={styles.medicineIcon}
                  />
                </View>
                <View style={styles.medicineTitleContainer}>
                  <Text style={styles.medicineName}>{selectedMedicine.name}</Text>
                  <Text style={styles.medicineDescription}>{selectedMedicine.description}</Text>
                </View>
              </View>
              
              <View style={styles.priceContainer}>
                <View style={[styles.priceBox, styles.highestPriceBox]}>
                  <Text style={styles.priceAmount}>{selectedMedicine.price.highest}</Text>
                  <Text style={styles.priceLabel}>Eceran Tertinggi</Text>
                </View>
                <View style={[styles.priceBox, styles.regularPriceBox]}>
                  <Text style={styles.priceAmount}>{selectedMedicine.price.regular}</Text>
                  <Text style={styles.priceLabel}>Harga Tetap</Text>
                </View>
              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionContent}>{selectedMedicine.details}</Text>
              </View>
              
              <View style={styles.alternativesContainer}>
                <Text style={styles.sectionTitle}>Rekomendasi Alternatif</Text>
                <View style={styles.alternativesRow}>
                  {selectedMedicine.alternatives.map((alt) => (
                    <View key={alt.id} style={styles.alternativeCard}>
                      <View style={styles.alternativeIconContainer}>
                        <Image 
                          source={require('@/assets/images/graph-icon.png')} 
                          style={{ width: 20, height: 20 }}
                        />
                      </View>
                      <View style={styles.alternativeInfo}>
                        <Text style={styles.alternativeName}>{alt.name}</Text>
                        <Text style={styles.alternativePrice}>{alt.price}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Bahan Aktif</Text>
                <Text style={styles.sectionContent}>{selectedMedicine.activeIngredient}</Text>
              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Peringatan</Text>
                <Text style={styles.sectionContent}>{selectedMedicine.warnings}</Text>
              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Efek Samping</Text>
                <Text style={styles.sectionContent}>{selectedMedicine.sideEffects}</Text>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <>
      {renderWelcomeScreen()}
      {renderMedicineDetail()}
    </>
  );
}