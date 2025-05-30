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
} from 'react-native';
import { ChevronLeft, Search, X, Phone, ChevronDown, ChevronUp, User } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';

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
];

const mockHospital: Hospital = {
  id: '1',
  name: 'Klinik Utama Jasmine MQ Medika',
  address: 'Jl. Dayang Sumbi No.10, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132',
  distance: '2.4 kilometer dari Anda',
  image: 'https://via.placeholder.com/400x200', 
  phone: '+62-22-1234567',
  doctors: [
    {
      id: '1',
      name: 'Dr. Erdianti Silalahi',
      specialty: 'Poli Penyakit dalam',
      schedule: [
        { day: 'Senin', hours: '09.00-14.00' },
        { day: 'Selasa', hours: '09.00-14.00' },
        { day: 'Rabu', hours: '09.00-14.00' },
      ],
    },
    {
      id: '2',
      name: 'Dr. Wiga Ryan',
      specialty: 'Poli Penyakit dalam',
      schedule: [
        { day: 'Senin', hours: '09.00-14.00' },
        { day: 'Selasa', hours: '09.00-14.00' },
        { day: 'Rabu', hours: '09.00-14.00' },
      ],
      isExpanded: true,
    },
  ],
};

export default function CheckScreen() {
  const { theme } = useTheme();
  
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [searchText, setSearchText] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [hospitalData, setHospitalData] = useState<Hospital>(mockHospital);

  const filteredSymptoms = availableSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchText.toLowerCase()) &&
    !selectedSymptoms.find(selected => selected.id === symptom.id)
  );

  const addSymptom = (symptom: Symptom) => {
    setSelectedSymptoms([...selectedSymptoms, symptom]);
  };

  const removeSymptom = (symptomId: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptomId));
  };

  const handleConfirmSymptoms = () => {
    setShowResult(true);
  };

  const toggleDoctorExpansion = (doctorId: string) => {
    setHospitalData(prev => ({
      ...prev,
      doctors: prev.doctors.map(doctor =>
        doctor.id === doctorId
          ? { ...doctor, isExpanded: !doctor.isExpanded }
          : doctor
      ),
    }));
  };

  const getStyles = (theme: any) => StyleSheet.create({
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
    // Modal styles
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
      marginRight: theme.spacing.b3,
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
  });

  // Get styles using the theme
  const styles = getStyles(theme);

  const renderSymptomChecker = () => (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DokuCek</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.exitText}>Keluar</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Question Section */}
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

        {/* Symptoms Section */}
        <View style={styles.symptomsSection}>
          <Text style={styles.sectionTitle}>Gejala Anda</Text>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Search size={20} color={theme.colors.neutral_800} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari gejala Anda"
              placeholderTextColor={theme.colors.neutral_800}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Selected Symptoms Tags */}
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

          {/* Available Symptoms List */}
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
        </View>
      </ScrollView>

      {/* Confirm Button */}
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

  const renderHospitalDetail = () => (
    <Modal visible={showResult} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderTitle}>Detail Rumah Sakit</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowResult(false)}
          >
            <X size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {/* Hospital Image */}
          <View style={styles.hospitalImageContainer}>
            <Image
              source={{ uri: hospitalData.image }}
              style={styles.hospitalImage}
              resizeMode="cover"
            />
            <View style={styles.distanceTag}>
              <Text style={styles.distanceText}>{hospitalData.distance}</Text>
            </View>
          </View>

          {/* Hospital Info */}
          <View style={styles.hospitalInfo}>
            <Text style={styles.hospitalName}>{hospitalData.name}</Text>
            <Text style={styles.hospitalAddress}>{hospitalData.address}</Text>
            
            <TouchableOpacity style={styles.contactButton}>
              <Phone size={20} color="white" />
              <Text style={styles.contactButtonText}>Hubungi Fasilitas Kesehatan</Text>
            </TouchableOpacity>
          </View>

          {/* Doctors List */}
          <View style={styles.doctorsSection}>
            <Text style={styles.doctorsTitle}>Daftar Dokter</Text>
            <Text style={styles.doctorsSubtitle}>Poli Penyakit dalam</Text>
            
            {hospitalData.doctors.map((doctor) => (
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
      </SafeAreaView>
    </Modal>
  );

  return (
    <>
      {renderSymptomChecker()}
      {renderHospitalDetail()}
    </>
  );
}