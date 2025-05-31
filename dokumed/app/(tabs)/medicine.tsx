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
  FlatList,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { X, ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';

interface Medicine {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  price: { highest: string; regular: string; };
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
  medicineKey: string; 
}

const paracetamolMersiFarma: Medicine = {
  id: '1', 
  name: 'Paracetamol 120 mg/5 mL Sirup (MERSIFARMA TIRMAKU MERCUSANA)', 
  description: 'Meringankan rasa sakit kepala, sakit gigi, dan menurunkan demam', 
  manufacturer: 'MERSIFARMA TIRMAKU MERCUSANA',
  price: { highest: 'Rp9.625', regular: 'Rp8.000' }, 
  details: 'Analgesik-Antipiretik. Sebagai Analgesik, bekerja dengan meningkatkan ambang rangsang rasa sakit.',
  alternatives: [
    { id: '99', name: 'Novapharin', price: 'Rp5.000', icon: 'graph', medicineKey: '2' },
    { id: '98', name: 'Afi Farma', price: 'Rp7.000', icon: 'graph', medicineKey: '3' },
    { id: '97', name: 'Lucas Djaja', price: 'Rp7.500', icon: 'graph', medicineKey: '4' },
  ],
  activeIngredient: 'Paracetamol', 
  warnings: 'Hati - hati penggunaan obat ini pada penderita penyakit ginjal dan hati. Bila setelah 2 hari demam tidak menurun atau setelah 5 hari nyeri tidak menghilang, segera hubungi Unit Pelayanan Kesehatan. Penggunaan obat ini pada penderita yang mengkonsumsi alkohol, dapat meningkatkan resiko kerusakan fungsi hati', 
  sideEffects: 'Penggunaan jangka lama dan dosis besar dapat menyebakan kerusakan hati dan reaksi hipersensitivitas.',
};

const paracetamolNovapharin: Medicine = {
  ...paracetamolMersiFarma,
  id: '2',
  name: 'Paracetamol 120 mg/5 mL Sirup (NOVAPHARIN)',
  price: { highest: 'Rp6.400', regular: 'Rp5.000' },
};

const paracetamolAfi: Medicine = {
  ...paracetamolMersiFarma,
  id: '3',
  name: 'Paracetamol 120 mg/5 mL Sirup (AFI FARMA, STRAWBERRY))',
  price: { highest: 'Rp8.400', regular: 'Rp7.000' },
};

const paracetamolLucas: Medicine = {
  ...paracetamolMersiFarma,
  id: '4',
  name: 'Paracetamol 120 mg/5 mL Sirup (LUCAS DJAJA)',
  price: { highest: 'Rp8.950', regular: 'Rp7.500' },
};

const allMedicinesDatabase: { [key: string]: Medicine } = {
  [paracetamolMersiFarma.id]: paracetamolMersiFarma,
  [paracetamolNovapharin.id]: paracetamolNovapharin,
  [paracetamolAfi.id]: paracetamolAfi,
  [paracetamolLucas.id]: paracetamolLucas,
};

export default function MedicineScreen() {
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState('');
  
  const [currentAppView, setCurrentAppView] = useState<'welcome' | 'medicineDetail' | 'allAlternativesList'>('welcome');
  const [mainMedicineData, setMainMedicineData] = useState<Medicine | null>(null);
  
  const [alternativeForSheet, setAlternativeForSheet] = useState<Medicine | null>(null);
  const [showAlternativeSheetModal, setShowAlternativeSheetModal] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    pageHeader: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingHorizontal: theme.spacing.b1, 
      paddingVertical: theme.spacing.b2, 
      borderBottomWidth: 1, 
      borderBottomColor: theme.colors.border, 
      position: 'relative', 
      height: 60
    }, 
    pageHeaderTitle: { 
      fontSize: theme.fontSizes.sh2, 
      fontFamily: theme.fontFamily.semibold, 
      color: theme.colors.text, 
      flexShrink: 1, 
      paddingHorizontal: 40
    },
    headerButtonLeft: { 
      position: 'absolute', 
      left: theme.spacing.b1, 
      top: 0, 
      bottom: 0, 
      justifyContent: 'center',
       padding: theme.spacing.b3, 
       zIndex: 1 
    },
    headerButtonRight: { 
      position: 'absolute', 
      right: theme.spacing.b1, 
      top: 0, 
      bottom: 0, 
      justifyContent: 'center',
      padding: theme.spacing.b3, 
      zIndex: 1 
    },
    welcomeContent: { 
      flex: 1, 
      padding: theme.spacing.b1, 
      alignItems: 'center', 
      justifyContent: 'center' 
    },
    logoContainer: { 
      alignItems: 'center', 
      marginBottom: theme.spacing.b1 
    },
    logo: { 
      width: 150, 
      height: 150,
      resizeMode: 'contain' 
    },
    welcomeText: { 
      fontSize: theme.fontSizes.sh1, 
      fontFamily: theme.fontFamily.bold, 
      color: theme.colors.text, 
      textAlign: 'center', 
      marginBottom: theme.spacing.b1, 
      paddingHorizontal: theme.spacing.b1
    },
    searchContainer: { 
      width: '100%', 
      paddingHorizontal: theme.spacing.b1,
      marginTop: theme.spacing.b1 
    },
    searchInput: { 
      backgroundColor: theme.colors.surface, 
      borderRadius: 100, 
      paddingVertical: theme.spacing.b2,
      paddingHorizontal: theme.spacing.b1, 
      fontSize: theme.fontSizes.b1, 
      fontFamily: theme.fontFamily.regular, 
      color: theme.colors.text, 
      textAlign: 'center', 
      marginBottom: theme.spacing.b1, 
      borderWidth: 1,
      borderColor: theme.colors.border
    },
    searchButton: { 
      backgroundColor: theme.colors.purple, 
      borderRadius: 100, 
      paddingVertical: theme.spacing.b2,
      alignItems: 'center', 
      marginTop: theme.spacing.b1 
    },
    searchButtonText: { 
      color: theme.colors.white, 
      fontSize: theme.fontSizes.b1, 
      fontFamily: theme.fontFamily.semibold 
    },
    medicineDetailScrollView: { 
      flex: 1,
      backgroundColor: theme.colors.background, 
    },
    medicineDetailContentContainer: {
      paddingHorizontal: theme.spacing.b1, 
      paddingTop: theme.spacing.b1, 
      paddingBottom: theme.spacing.b1 
    },
    medicineHeader: { 
      flexDirection: 'row', 
      marginBottom: theme.spacing.b2, 
      alignItems: 'center', 
      marginTop: theme.spacing.b1 
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
    alternativeMedicineTitleContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingRight: theme.spacing.b1,
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
    alternativesSectionHeader: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: theme.spacing.b3, 
      marginTop: theme.spacing.b2 
    },
    lihatSemuaText: { 
      fontSize: theme.fontSizes.b2, 
      fontFamily: theme.fontFamily.semibold, 
      color: theme.colors.purple 
    },
    horizontalAlternativeCard: { 
      flexDirection: 'row',
      alignItems: 'center',
      width: '30%',
      backgroundColor: theme.colors.neutral_200,
      borderRadius: 12,
      padding: theme.spacing.b1,
      marginRight: '2%',
      marginBottom: theme.spacing.b3,
    },
    alternativeIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: theme.colors.light_purple,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.b3,
    },
    alternativeIcon: {
      width: 210, 
      height: 20, 
      resizeMode: 'contain' 
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
    flatListContainer: { 
      marginVertical: theme.spacing.b2 
    },
    modalSafeArea: { 
      flex: 1, 
      backgroundColor: theme.colors.background 
    },
    modalHeader: {
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingHorizontal: theme.spacing.b1, 
      paddingVertical: theme.spacing.b2, 
      borderBottomWidth: 1, 
      borderBottomColor: theme.colors.border, 
      position: 'relative', 
      height: 60 
    },
    modalHeaderTitle: { 
      fontSize: theme.fontSizes.sh2, 
      fontFamily: theme.fontFamily.semibold, 
      color: theme.colors.text, 
      flexShrink: 1, 
      paddingHorizontal: 40 
    },
    modalCloseButton: { 
      position: 'absolute', 
      right: theme.spacing.b1, 
      top: 0, bottom: 0, 
      justifyContent: 'center', 
      padding: theme.spacing.b3 
    },
    allAlterativesListMedicineTitle: {
      flexDirection: 'row', 
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.b1,
      marginBottom: theme.spacing.b2, 
      marginTop: theme.spacing.sh1
    },
    allAlternativesListPageViewContainer: { 
      flex: 1, 
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.b1,
    },
    allAlternativesFlatListContent: { 
      paddingHorizontal: theme.spacing.b3, 
      paddingTop: theme.spacing.b1, 
      paddingBottom: theme.spacing.b1 
    },
    fullWidthAlternativeCard: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      backgroundColor: theme.colors.card, 
      borderRadius: 12, 
      padding: theme.spacing.b3, 
      marginBottom: theme.spacing.b2, 
    },
  });

  const handleSearch = () => {
    const query = searchText.trim().toLowerCase();

    let medicineData: Medicine | null = null;
    if (query.includes('paracetamol')) medicineData = allMedicinesDatabase['1'];

    if (medicineData) { 
      setMainMedicineData(medicineData); 
      setCurrentAppView('medicineDetail'); 
      setSearchText(''); }
  };

  const handleGoToWelcome = () => { 
    setCurrentAppView('welcome'); 
    setMainMedicineData(null); 
  };

  const handleBackToHome = () => {
    router.back();
  };
  
  const handleGoToMedicineDetail = () => { 
    setCurrentAppView('medicineDetail');
  };

  const openAlternativeDetailSheet = (alternative: Alternative) => {
    let detailData = allMedicinesDatabase[alternative.medicineKey];
    
    if (alternative.medicineKey === 'lamivudine_image_target' || alternative.name.toLowerCase().includes('lamivudine')) {
        detailData = allMedicinesDatabase['lamivudine_image_target'];
    } else if (!detailData) {
        console.warn(`Data for ${alternative.name} (key: ${alternative.medicineKey}) not found.`);
        detailData = { 
          id: alternative.id, 
          name: alternative.name.toUpperCase(), 
          description: alternative.price, 
          price: { highest: "N/A", regular: "N/A" }, 
          details: `Details for ${alternative.name}`, 
          activeIngredient: "N/A", 
          warnings: "N/A", 
          sideEffects: "N/A", 
          alternatives: [], 
          manufacturer: "N/A" };
    }
    setAlternativeForSheet(detailData);
    setShowAlternativeSheetModal(true);
  };

  const closeAlternativeDetailSheet = () => { 
    setShowAlternativeSheetModal(false); 
    setAlternativeForSheet(null); 
  };

  const handleShowAllAlternativesList = () => { 
    setCurrentAppView('allAlternativesList'); 
  };

  const renderWelcomeView = () => (
    <>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderTitle}>DokuPharm</Text>
        <TouchableOpacity style={styles.headerButtonLeft} onPress={handleBackToHome}>
          <ChevronLeft size={28} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.welcomeContent}>
          <View style={styles.logoContainer}>
            <Image source={require('@/assets/images/doku-pharm.png')} style={styles.logo} />
          </View>

          <Text style={styles.welcomeText}>Selamat datang di DokuPharm! Silakan masukkan obat Anda</Text>

          <View style={styles.searchContainer}>
            <TextInput 
              style={styles.searchInput} 
              placeholder="Masukan Obat Anda" 
              value={searchText} 
              onChangeText={setSearchText} onSubmitEditing={handleSearch} />

            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Cari Alternatif Obat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );

  const renderMedicineDetailContent = (medicineData: Medicine | null) => {
    if (!medicineData) return null;
    return (
      <ScrollView style={styles.medicineDetailScrollView} contentContainerStyle={styles.medicineDetailContentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.medicineHeader}>
          <View style={styles.medicineIconContainer}>
            <Image source={require('@/assets/images/doku-pharm.png')} style={styles.medicineIcon} />
          </View>

          <View style={styles.medicineTitleContainer}>
            <Text style={styles.medicineName}>{medicineData.name}</Text>
            <Text style={styles.medicineDescription}>{medicineData.description}</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <View style={[styles.priceBox, styles.highestPriceBox]}>
            <Text style={styles.priceAmount}>{medicineData.price.highest}</Text>
            <Text style={styles.priceLabel}>Eceran Tertinggi</Text>
          </View>

          <View style={[styles.priceBox, styles.regularPriceBox]}>
            <Text style={styles.priceAmount}>{medicineData.price.regular}</Text>
            <Text style={styles.priceLabel}>Harga Tetap</Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionContent}>{medicineData.details}</Text>
        </View>

        {currentAppView === 'medicineDetail' && medicineData.id !== paracetamolNovapharin.id && medicineData.id !== paracetamolLucas.id&& medicineData.id !== paracetamolAfi.id  && medicineData.alternatives && medicineData.alternatives.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.alternativesSectionHeader}>
              <Text style={styles.sectionTitle}>Rekomendasi Alternatif</Text>

              <TouchableOpacity onPress={handleShowAllAlternativesList}>
                <Text style={styles.lihatSemuaText}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.flatListContainer}>
              <FlatList horizontal data={medicineData.alternatives}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.horizontalAlternativeCard} onPress={() => openAlternativeDetailSheet(item)}>
                    <View style={styles.alternativeIconContainer}>
                      <Image source={require('@/assets/images/graph-icon.png')} style={styles.alternativeIcon} />
                    </View>

                    <View style={styles.alternativeInfo}>
                      <Text style={styles.alternativeName} numberOfLines={1}>{item.name}</Text>
                      <Text style={styles.alternativePrice}>{item.price}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id} showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: theme.spacing.b2 }} />} contentContainerStyle={{ paddingRight: theme.spacing.b1 }} />
            </View>
          </View>
        )}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bahan Aktif</Text>
          <Text style={styles.sectionContent}>{medicineData.activeIngredient}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Peringatan</Text>
          <Text style={styles.sectionContent}>{medicineData.warnings}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Efek Samping</Text>
          <Text style={styles.sectionContent}>{medicineData.sideEffects}</Text>
        </View>
      </ScrollView>
    );
  };

  const renderMedicineDetailPageView = () => ( 
    <>
      <View style={styles.pageHeader}>
        <TouchableOpacity style={styles.headerButtonLeft} onPress={handleGoToWelcome}>
          <ChevronLeft size={28} color={theme.colors.text} />
        </TouchableOpacity>

        <Text style={styles.pageHeaderTitle} numberOfLines={1}>{mainMedicineData?.name || 'Detail Obat'}</Text>
      </View>

      {renderMedicineDetailContent(mainMedicineData)}
    </>
  );

  const renderAllAlternativesListPageView = () => { 
    if (!mainMedicineData || !mainMedicineData.alternatives || mainMedicineData.alternatives.length === 0) {
      return (
        <>
          <View style={styles.pageHeader}>
            <TouchableOpacity style={styles.headerButtonLeft} onPress={handleGoToMedicineDetail}>
              <ChevronLeft size={28} color={theme.colors.text} />
            </TouchableOpacity>

            <Text style={styles.pageHeaderTitle}>DokuPharm</Text>
          </View>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Tidak ada alternatif tersedia.</Text>
          </View>
        </>
      );
    }

    const renderAlternativeItem = ({ item }: { item: Alternative }) => (
      <TouchableOpacity style={styles.fullWidthAlternativeCard} onPress={() => openAlternativeDetailSheet(item)}>
        <View style={styles.alternativeIconContainer}>
          <Image source={require('@/assets/images/graph-icon.png')} style={styles.alternativeIcon} />
        </View>

        <View style={styles.alternativeInfo}>
          <Text style={styles.alternativeName}>{item.name}</Text>
          <Text style={styles.alternativePrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <>
        <View style={styles.pageHeader}>
            <TouchableOpacity style={styles.headerButtonLeft} onPress={handleGoToMedicineDetail}>
              <ChevronLeft size={28} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={styles.pageHeaderTitle}>DokuPharm</Text>
        </View>

        <View style={styles.allAlterativesListMedicineTitle}>
          <View style={styles.medicineIconContainer}>
            <Image source={require('@/assets/images/doku-pharm.png')} style={styles.medicineIcon} />
          </View>

          <View style={styles.alternativeMedicineTitleContainer}>
            <Text style={styles.medicineName}>{mainMedicineData.name}</Text>
            <Text style={styles.medicineDescription}>{mainMedicineData.description}</Text>
          </View>
        </View>

        <FlatList
            data={mainMedicineData.alternatives}
            renderItem={renderAlternativeItem}
            keyExtractor={(item) => item.id}
            style={styles.allAlternativesListPageViewContainer}
            contentContainerStyle={styles.allAlternativesFlatListContent}
            showsVerticalScrollIndicator={false}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentAppView === 'welcome' && renderWelcomeView()}
      {currentAppView === 'medicineDetail' && renderMedicineDetailPageView()}
      {currentAppView === 'allAlternativesList' && renderAllAlternativesListPageView()}

      {alternativeForSheet && (
        <Modal
          visible={showAlternativeSheetModal}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={closeAlternativeDetailSheet}
          transparent={false}
        >
          <SafeAreaView style={styles.modalSafeArea}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle} numberOfLines={1}>{alternativeForSheet.name}</Text>
              
              <TouchableOpacity style={styles.modalCloseButton} onPress={closeAlternativeDetailSheet}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            {renderMedicineDetailContent(alternativeForSheet)}
          </SafeAreaView>
        </Modal>
      )}
    </SafeAreaView>
  );
}