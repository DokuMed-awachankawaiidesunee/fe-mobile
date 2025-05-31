import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ChevronLeft, Search, X, Phone, ChevronDown, ChevronUp, User } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { router } from 'expo-router';

interface Symptom {
  id: string;
  name: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  schedule: {
    day: string;
    hours: string;
  }[];
  isExpanded?: boolean;
}

interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: string;
  image: string;
  phone: string;
  doctors: Doctor[];
}

// Mock data for available symptoms
const availableSymptoms: Symptom[] = [
  { id: '1', name: 'Mual' },
  { id: '2', name: 'Sakit kepala' },
  { id: '3', name: 'Gatal-gatal' },
  { id: '4', name: 'Bersin-bersin' },
  { id: '5', name: 'Pilek' },
  { id: '6', name: 'Sakit tenggorokan' },
  { id: '7', name: 'Batuk-batuk' },
  { id: '8', name: 'Nyeri ulu hati' },
  { id: '9', name: 'Memar' },
  { id: '10', name: 'Pusing' },
  { id: '11', name: 'Demam' },
  { id: '12', name: 'Sesak napas' },
  { id: '13', name: 'Nyeri otot' },
  { id: '14', name: 'Demam tinggi' },
  { id: '15', name: 'Ruam kulit' },
  { id: '16', name: 'Nyeri sendi' },
  { id: '17', name: 'Muntah' },
];

// Mock predicted symptoms based on user input
const predictedSymptoms: Symptom[] = [
  { id: '1', name: 'Mual' },
  { id: '13', name: 'Nyeri otot' },
  { id: '14', name: 'Demam tinggi' },
  { id: '15', name: 'Ruam kulit' },
  { id: '5', name: 'Pilek' },
  { id: '17', name: 'Muntah' },
];

// Mock hospital data
const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Klinik Utama Jasmine MQ Medika',
    address: 'Jl. Dayang Sumbi No.10, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132',
    distance: '2.4 kilometer dari Anda',
    image: '../../assets/images/app-logo.png',
    phone: '+62-22-1234567',
    doctors: [
      {
        id: '1',
        name: 'Dr. Erdianti Silalahi',
        specialty: 'Poli Penyakit Dalam',
        schedule: [
          { day: 'Senin', hours: '09.00-14.00' },
          { day: 'Selasa', hours: '09.00-14.00' },
          { day: 'Rabu', hours: '09.00-14.00' },
        ],
      },
      {
        id: '2',
        name: 'Dr. Wiga Ryan',
        specialty: 'Poli Penyakit Dalam',
        schedule: [
          { day: 'Senin', hours: '09.00-14.00' },
          { day: 'Selasa', hours: '09.00-14.00' },
          { day: 'Rabu', hours: '09.00-14.00' },
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Klinik YRAP Tubagus Ismail',
    address: 'Jl. Tubagus Ismail No.51A, Sekeloa, Kecamatan Coblong, Kota Bandung, Jawa Barat 40134',
    distance: '3.1 kilometer dari Anda',
    image: 'https://via.placeholder.com/120',
    phone: '+62-22-7654321',
    doctors: [
      {
        id: '3',
        name: 'Dr. Ahmad Fauzi',
        specialty: 'Poli Penyakit Dalam',
        schedule: [
          { day: 'Senin', hours: '08.00-15.00' },
          { day: 'Selasa', hours: '08.00-15.00' },
          { day: 'Rabu', hours: '08.00-15.00' },
        ],
      },
    ],
  },
];

// Duration options for symptoms
const durationOptions = [
  'Kurang dari 1 Hari',
  '1 Hari - 1 Minggu',
  '1 Minggu - 1 Bulan',
  '1 Bulan - 1 Tahun',
  'Lebih dari 1 Tahun',
];

// Severity options for symptoms
const severityOptions = [
  'Ringan',
  'Sedang',
  'Parah',
];

export default function CheckScreen() {
  const { theme } = useTheme();
  
  // State for the initial text input
  const [symptomText, setSymptomText] = useState('');
  const [showTextInput, setShowTextInput] = useState(true);
  
  // State for predicted symptoms
  const [showPredictedSymptoms, setShowPredictedSymptoms] = useState(false);
  
  // State for selected symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  
  // State for symptom search
  const [searchText, setSearchText] = useState('');
  const [showSymptomSearch, setShowSymptomSearch] = useState(false);
  
  // State for duration selection
  const [showDurationSelection, setShowDurationSelection] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  
  // State for severity selection
  const [showSeveritySelection, setShowSeveritySelection] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  
  // State for results
  const [showResult, setShowResult] = useState(false);
  
  // State for hospital details
  const [showHospitalDetail, setShowHospitalDetail] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  // Filter symptoms based on search text
  const filteredSymptoms = availableSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchText.toLowerCase()) &&
    !selectedSymptoms.find(selected => selected.id === symptom.id)
  );

  // Add symptom to selected symptoms
  const addSymptom = (symptom: Symptom) => {
    if (!selectedSymptoms.find(s => s.id === symptom.id)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  // Remove symptom from selected symptoms
  const removeSymptom = (symptomId: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptomId));
  };

  // Handle back button from symptom input
  const handleBackFromSymptomInput = () => {
    router.back();
  };

  // Handle "Tanya Doku!" button press
  const handleAskDoku = () => {
    setShowTextInput(false);
    setShowPredictedSymptoms(true);
  };

  // Handle confirm symptoms button press
  const handleConfirmSymptoms = () => {
    setShowPredictedSymptoms(false);
    setShowSymptomSearch(false);
    setShowDurationSelection(true);
  };

  // Handle duration selection
  const handleSelectDuration = (duration: string) => {
    setSelectedDuration(duration);
  };

  const handleConfirmDuration = () => {
    if (selectedDuration) {
      setShowDurationSelection(false);
      setShowSeveritySelection(true);
    }
  };

  // Handle severity selection
  const handleSelectSeverity = (severity: string) => {
    setSelectedSeverity(severity);
  };

  const handleConfirmSeverity = () => {
    if (selectedSeverity) {
      setShowSeveritySelection(false);
      setShowResult(true);
    }
  };

  // Handle back to home
  const handleBackToHome = () => {
    // Reset semua state ke nilai awalnya
    setSymptomText('');
    setShowTextInput(true);
    setShowPredictedSymptoms(false);
    setSelectedSymptoms([]);
    setSearchText('');
    setShowSymptomSearch(false);
    setShowDurationSelection(false);
    setSelectedDuration(null);
    setShowSeveritySelection(false);
    setSelectedSeverity(null);
    setShowResult(false);
    setShowHospitalDetail(false);
    setSelectedHospital(null);
    router.push('/');
  };

  // Handle hospital press
  const handleHospitalPress = (hospital: Hospital) => {
    setSelectedHospital({
      ...hospital,
      doctors: hospital.doctors.map(doctor => ({
        ...doctor,
        isExpanded: doctor.isExpanded || false
      }))
    });
    setShowHospitalDetail(true);
  };

  // Handle close hospital detail
  const handleCloseHospitalDetail = () => {
    setShowHospitalDetail(false);
    setTimeout(() => {
      setSelectedHospital(null);
    }, 300);
  };

  // Handle back from result
  const handleBackFromResult = () => {
    if (showHospitalDetail) {
      setShowHospitalDetail(false);
      setSelectedHospital(null);
    } else {
      setShowResult(false);
      setShowSeveritySelection(true);
    }
  };

  // Handle back from severity selection
  const handleBackFromSeverity = () => {
    setShowSeveritySelection(false);
    setShowDurationSelection(true);
  };

  // Handle back from duration selection
  const handleBackFromDuration = () => {
    setShowDurationSelection(false);
    setShowPredictedSymptoms(true);
    setShowSymptomSearch(true);
  };

  // Toggle doctor expansion
  const toggleDoctorExpansion = (doctorId: string) => {
    if (!selectedHospital) return;
    
    setSelectedHospital(prev => ({
      ...prev!,
      doctors: prev!.doctors.map(doctor =>
        doctor.id === doctorId
          ? { ...doctor, isExpanded: !doctor.isExpanded }
          : doctor
      ),
    }));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.sh2,
      paddingVertical: theme.spacing.b1,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      padding: theme.spacing.b3,
    },
    headerTitle: {
      fontSize: theme.fontSizes.sh2,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.text,
    },
    headerRight: {
      width: 40,
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.sh2,
      paddingVertical: theme.spacing.b1,
    },
    progressBar: {
      flex: 1,
      height: 6,
      backgroundColor: theme.colors.neutral_500,
      borderRadius: 3,
      marginRight: theme.spacing.b1,
    },
    progressFill: {
      width: '30%',
      height: '100%',
      backgroundColor: theme.colors.primary,
      borderRadius: 3,
    },
    progressFill50: {
      width: '50%',
    },
    progressFill70: {
      width: '70%',
    },
    progressFill90: {
      width: '90%',
    },
    exitText: {
      fontSize: theme.fontSizes.b3,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.primary,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing.sh2,
    },
    questionSection: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sh2,
    },
    logo: {
      width: 60,
      height: 60,
      marginRight: theme.spacing.b1,
    },
    questionText: {
      flex: 1,
      fontSize: theme.fontSizes.sh3,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.text,
      lineHeight: 24,
    },
    textInputContainer: {
      marginTop: theme.spacing.b1,
      marginBottom: theme.spacing.sh2,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 12,
      padding: theme.spacing.b1,
      height: 200,
    },
    textInput: {
      flex: 1,
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.text,
      textAlignVertical: 'top',
    },
    symptomsSection: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: theme.fontSizes.sh2,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.b1,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      paddingHorizontal: theme.spacing.b1,
      marginBottom: theme.spacing.sh2,
    },
    searchIcon: {
      marginRight: theme.spacing.b3,
    },
    searchInput: {
      flex: 1,
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.text,
      paddingVertical: theme.spacing.b1,
    },
    selectedSymptomsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: theme.spacing.sh2,
    },
    symptomTag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.light_purple,
      paddingHorizontal: theme.spacing.b1,
      paddingVertical: theme.spacing.b3,
      borderRadius: 20,
      marginRight: theme.spacing.b3,
      marginBottom: theme.spacing.b3,
    },
    symptomTagText: {
      fontSize: theme.fontSizes.b3,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.primary,
      marginRight: theme.spacing.b3,
    },
    symptomsList: {
      marginBottom: theme.spacing.b1,
    },
    symptomItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.b1,
      marginBottom: theme.spacing.b1,
    },
    symptomName: {
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.text,
    },
    addButton: {
      width: 40,
      height: 40,
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      fontSize: theme.fontSizes.sh3,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.white,
    },
    bottomContainer: {
      padding: theme.spacing.sh2,
      backgroundColor: theme.colors.background,
    },
    confirmButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.b1,
      borderRadius: 12,
      alignItems: 'center',
    },
    confirmButtonDisabled: {
      backgroundColor: theme.colors.neutral_500,
    },
    confirmButtonText: {
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.white,
    },
    optionsList: {
      marginTop: theme.spacing.sh2,
    },
    optionButton: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 12,
      padding: theme.spacing.b1,
      marginBottom: theme.spacing.b1,
    },
    selectedOptionButton: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    optionText: {
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.text,
      textAlign: 'center',
    },
    selectedOptionText: {
      color: theme.colors.white,
    },
    recommendationSection: {
      flex: 1,
    },
    poliText: {
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sh2,
    },
    priceCard: {
      backgroundColor: theme.colors.light_purple,
      padding: theme.spacing.sh2,
      borderRadius: 12,
      marginBottom: theme.spacing.sh2,
    },
    bpjsCard: {
      backgroundColor: theme.colors.light_green,
      padding: theme.spacing.sh2,
      borderRadius: 12,
      marginBottom: theme.spacing.sh2,
    },
    priceLabel: {
      fontSize: theme.fontSizes.b3,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.primary,
      marginBottom: theme.spacing.b3,
    },
    bpjsLabel: {
      fontSize: theme.fontSizes.b3,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.green,
      marginBottom: theme.spacing.b3,
    },
    priceRange: {
      fontSize: theme.fontSizes.sh2,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.primary,
    },
    bpjsService: {
      fontSize: theme.fontSizes.sh2,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.green,
    },
    hospitalSectionTitle: {
      fontSize: theme.fontSizes.sh2,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.sh2,
    },
    hospitalCard: {
      flexDirection: 'row',
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      padding: theme.spacing.b1,
      marginBottom: theme.spacing.b1,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    hospitalCardImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: theme.spacing.b1,
    },
    hospitalCardContent: {
      flex: 1,
      justifyContent: 'center',
    },
    hospitalCardName: {
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.text,
      marginBottom: theme.spacing.b3,
    },
    hospitalCardAddress: {
      fontSize: theme.fontSizes.b3,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.sh2,
      paddingVertical: theme.spacing.b1,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    modalHeaderTitle: {
      fontSize: theme.fontSizes.sh2,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.text,
    },
    closeButton: {
      padding: theme.spacing.b3,
    },
    modalContent: {
      flex: 1,
    },
    hospitalImageContainer: {
      position: 'relative',
    },
    hospitalImage: {
      width: '100%',
      height: 200,
    },
    distanceTag: {
      position: 'absolute',
      bottom: theme.spacing.b1,
      right: theme.spacing.b1,
      backgroundColor: theme.colors.light_purple,
      paddingHorizontal: theme.spacing.b1,
      paddingVertical: theme.spacing.b3,
      borderRadius: 20,
    },
    distanceText: {
      fontSize: theme.fontSizes.b3,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.primary,
    },
    hospitalInfo: {
      padding: theme.spacing.sh2,
    },
    hospitalName: {
      fontSize: theme.fontSizes.sh1,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.b3,
    },
    hospitalAddress: {
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.textSecondary,
      lineHeight: 20,
      marginBottom: theme.spacing.sh2,
    },
    contactButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.b1,
      borderRadius: 12,
      marginBottom: theme.spacing.b3,
    },
    contactButtonText: {
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.white,
      marginLeft: theme.spacing.b3,
    },
    doctorsSection: {
      padding: theme.spacing.sh2,
    },
    doctorsTitle: {
      fontSize: theme.fontSizes.sh2,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.b3,
    },
    doctorsSubtitle: {
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sh2,
    },
    doctorCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      marginBottom: theme.spacing.b1,
      overflow: 'hidden',
    },
    doctorHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing.b1,
    },
    doctorInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    doctorIcon: {
      width: 32,
      height: 32,
      backgroundColor: theme.colors.light_purple,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.b1,
    },
    doctorName: {
      fontSize: theme.fontSizes.b2,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.primary,
    },
    scheduleContainer: {
      paddingHorizontal: theme.spacing.b1,
      paddingBottom: theme.spacing.b1,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    scheduleTitle: {
      fontSize: theme.fontSizes.b3,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.text,
      marginBottom: theme.spacing.b3,
      marginTop: theme.spacing.b3,
    },
    scheduleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 2,
    },
    scheduleDay: {
      fontSize: theme.fontSizes.b3,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.text,
    },
    scheduleHours: {
      fontSize: theme.fontSizes.b3,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.text,
    },
    noDataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.sh2,
    },
    noDataText: {
      fontSize: theme.fontSizes.b1,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });

  // Render text input screen
  const renderTextInput = () => (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackFromSymptomInput}
          >
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DokuCek</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.exitText}>Keluar</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.questionSection}>
            <Image 
              source={require('@/assets/images/app-logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.questionText}>
              Apa yang sedang kamu rasakan saat ini?
            </Text>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Ceritakan apa yang kamu rasakan..."
              placeholderTextColor={theme.colors.neutral_800}
              multiline={true}
              value={symptomText}
              onChangeText={setSymptomText}
            />
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.confirmButton,
              symptomText.trim().length === 0 && styles.confirmButtonDisabled
            ]}
            onPress={handleAskDoku}
            disabled={symptomText.trim().length === 0}
          >
            <Text style={styles.confirmButtonText}>Tanya Doku!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );

  // Render predicted symptoms screen
  const renderPredictedSymptoms = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackFromSymptomInput}
        >
          <ChevronLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DokuCek</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.exitText}>Keluar</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.questionSection}>
          <Image 
            source={require('@/assets/images/app-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.questionText}>
            Dari analisis Doku sih, kamu lagi merasakan beberapa hal ini, ya?
          </Text>
        </View>

        <View style={styles.symptomsSection}>
          <Text style={styles.sectionTitle}>Gejala Kamu</Text>
          
          <View style={styles.searchContainer}>
            <Search size={20} color={theme.colors.neutral_800} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pilih gejala kamu"
              placeholderTextColor={theme.colors.neutral_800}
              value={searchText}
              onChangeText={setSearchText}
              onFocus={() => setShowSymptomSearch(true)}
            />
          </View>

          {selectedSymptoms.length > 0 && (
            <View style={styles.selectedSymptomsContainer}>
              {selectedSymptoms.map((symptom) => (
                <TouchableOpacity
                  key={symptom.id}
                  style={styles.symptomTag}
                  onPress={() => removeSymptom(symptom.id)}
                >
                  <Text style={styles.symptomTagText}>{symptom.name}</Text>
                  <X size={16} color={theme.colors.primary} />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {!showSymptomSearch ? (
            <View style={styles.symptomsList}>
              {predictedSymptoms.map((symptom) => (
                <View key={symptom.id} style={styles.symptomItem}>
                  <Text style={styles.symptomName}>{symptom.name}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addSymptom(symptom)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.symptomsList}>
              {filteredSymptoms.map((symptom) => (
                <View key={symptom.id} style={styles.symptomItem}>
                  <Text style={styles.symptomName}>{symptom.name}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addSymptom(symptom)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            selectedSymptoms.length === 0 && styles.confirmButtonDisabled
          ]}
          onPress={handleConfirmSymptoms}
          disabled={selectedSymptoms.length === 0}
        >
          <Text style={styles.confirmButtonText}>Konfirmasi Gejala</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  // Render duration selection screen
  const renderDurationSelection = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackFromDuration}
        >
          <ChevronLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DokuCek</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, styles.progressFill50]} />
        </View>
        <Text style={styles.exitText}>Keluar</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.questionSection}>
          <Image 
            source={require('@/assets/images/app-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.questionText}>
            Doku ingin tahu nih, kamu sudah merasakan hal itu berapa lama?
          </Text>
        </View>

        <View style={styles.symptomsSection}>
          <Text style={styles.sectionTitle}>Gejala Kamu</Text>
          
          <View style={styles.selectedSymptomsContainer}>
            {selectedSymptoms.map((symptom) => (
              <View
                key={symptom.id}
                style={styles.symptomTag}
              >
                <Text style={styles.symptomTagText}>{symptom.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.optionsList}>
            {durationOptions.map((duration, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedDuration === duration && styles.selectedOptionButton
                ]}
                onPress={() => handleSelectDuration(duration)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    selectedDuration === duration && styles.selectedOptionText
                  ]}
                >
                  {duration}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !selectedDuration && styles.confirmButtonDisabled
          ]}
          onPress={handleConfirmDuration}
          disabled={!selectedDuration}
        >
          <Text style={styles.confirmButtonText}>Konfirmasi</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  // Render severity selection screen
  const renderSeveritySelection = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackFromSeverity}
        >
          <ChevronLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DokuCek</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, styles.progressFill70]} />
        </View>
        <Text style={styles.exitText}>Keluar</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.questionSection}>
          <Image 
            source={require('@/assets/images/app-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.questionText}>
            Doku ingin tahu lagi nih, udah seberapa parah gejalanya?
          </Text>
        </View>

        <View style={styles.symptomsSection}>
          <Text style={styles.sectionTitle}>Gejala Kamu</Text>
          
          <View style={styles.selectedSymptomsContainer}>
            {selectedSymptoms.map((symptom) => (
              <View
                key={symptom.id}
                style={styles.symptomTag}
              >
                <Text style={styles.symptomTagText}>{symptom.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.optionsList}>
            {severityOptions.map((severity, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedSeverity === severity && styles.selectedOptionButton
                ]}
                onPress={() => handleSelectSeverity(severity)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    selectedSeverity === severity && styles.selectedOptionText
                  ]}
                >
                  {severity}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !selectedSeverity && styles.confirmButtonDisabled
          ]}
          onPress={handleConfirmSeverity}
          disabled={!selectedSeverity}
        >
          <Text style={styles.confirmButtonText}>Cek Rekomendasi Doku</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  // Render result screen
  const renderResultScreen = () => (
    <Modal visible={showResult} animationType="slide" presentationStyle="fullScreen">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackFromResult}
          >
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DokuCek</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, styles.progressFill90]} />
          </View>
          <Text style={styles.exitText}>Keluar</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.questionSection}>
            <Image 
              source={require('@/assets/images/app-logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.questionText}>
              Berdasarkan gejala yang kamu alami, ini beberapa rekomendasi yang Doku bisa berikan :
            </Text>
          </View>

          <View style={styles.recommendationSection}>
            <Text style={styles.sectionTitle}>Rekomendasi Poli</Text>
            <Text style={styles.poliText}>Poli Penyakit Dalam</Text>
            
            <View style={styles.priceCard}>
              <Text style={styles.priceLabel}>Kisaran Harga</Text>
              <Text style={styles.priceRange}>Rp.100.000 - Rp.150.000</Text>
            </View>

            <View style={styles.bpjsCard}>
              <Text style={styles.bpjsLabel}>Layanan yang Dicover BPJS</Text>
              <Text style={styles.bpjsService}>Dokter, Obat</Text>
            </View>

            <Text style={styles.hospitalSectionTitle}>Rekomendasi Fasilitas Kesehatan</Text>
            
            {mockHospitals.map((hospital) => (
              <TouchableOpacity
                key={hospital.id}
                style={styles.hospitalCard}
                onPress={() => handleHospitalPress(hospital)}
              >
                <Image
                  source={{ uri: hospital.image }}
                  style={styles.hospitalCardImage}
                  resizeMode="cover"
                />
                <View style={styles.hospitalCardContent}>
                  <Text style={styles.hospitalCardName}>{hospital.name}</Text>
                  <Text style={styles.hospitalCardAddress}>{hospital.address}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={handleBackToHome}
          >
            <Text style={styles.confirmButtonText}>Kembali ke Beranda</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Hospital Detail Modal - Rendered inside Result Modal */}
      <Modal 
        visible={showHospitalDetail} 
        animationType="slide" 
        presentationStyle="pageSheet"
        onRequestClose={handleCloseHospitalDetail}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>Detail Rumah Sakit</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseHospitalDetail}
            >
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          {selectedHospital ? (
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <View style={styles.hospitalImageContainer}>
                <Image
                  source={{ uri: selectedHospital.image }}
                  style={styles.hospitalImage}
                  resizeMode="cover"
                />
                <View style={styles.distanceTag}>
                  <Text style={styles.distanceText}>{selectedHospital.distance}</Text>
                </View>
              </View>

              <View style={styles.hospitalInfo}>
                <Text style={styles.hospitalName}>{selectedHospital.name}</Text>
                <Text style={styles.hospitalAddress}>{selectedHospital.address}</Text>
                
                <TouchableOpacity style={styles.contactButton}>
                  <Phone size={20} color="white" />
                  <Text style={styles.contactButtonText}>Hubungi Fasilitas Kesehatan</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.doctorsSection}>
                <Text style={styles.doctorsTitle}>Daftar Dokter</Text>
                <Text style={styles.doctorsSubtitle}>Poli Penyakit Dalam</Text>
                
                {selectedHospital.doctors.map((doctor) => (
                  <View key={doctor.id} style={styles.doctorCard}>
                    <TouchableOpacity
                      style={styles.doctorHeader}
                      onPress={() => toggleDoctorExpansion(doctor.id)}
                    >
                      <View style={styles.doctorInfo}>
                        <View style={styles.doctorIcon}>
                          <User size={20} color={theme.colors.primary} />
                        </View>
                        <Text style={styles.doctorName}>{doctor.name}</Text>
                      </View>
                      {doctor.isExpanded ? (
                        <ChevronUp size={20} color={theme.colors.neutral_800} />
                      ) : (
                        <ChevronDown size={20} color={theme.colors.neutral_800} />
                      )}
                    </TouchableOpacity>
                    
                    {doctor.isExpanded && (
                      <View style={styles.scheduleContainer}>
                        <Text style={styles.scheduleTitle}>Jam Praktek</Text>
                        {doctor.schedule.map((schedule, index) => (
                          <View key={index} style={styles.scheduleRow}>
                            <Text style={styles.scheduleDay}>{schedule.day}</Text>
                            <Text style={styles.scheduleHours}>{schedule.hours}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>Data rumah sakit tidak tersedia</Text>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </Modal>
  );

  return (
    <>
      {showTextInput && renderTextInput()}
      {showPredictedSymptoms && renderPredictedSymptoms()}
      {showDurationSelection && renderDurationSelection()}
      {showSeveritySelection && renderSeveritySelection()}
      {renderResultScreen()}
    </>
  );
}