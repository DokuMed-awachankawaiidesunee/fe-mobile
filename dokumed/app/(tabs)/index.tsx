import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const adsData = [
  {
    id: '1',
    image: require('@/assets/images/ads-1.png'),
    title: 'Layanan HomeCare RS Hemina OPI Jakabaring'
  },
  {
    id: '2',
    image: require('@/assets/images/ads-2.png'),
    title: 'Promo Vaksinasi'
  },
];

export default function HomeScreen() {
  const navigateToCheck = () => {
    router.push('/symptom');
  };
  
  const navigateToMedicine = () => {
    router.push('/medicine');
  };
  
  const navigateToHistory = () => {
    router.push('/history');
  };

  const renderAdItem = ({ item }: { item: typeof adsData[0] }) => (
    <TouchableOpacity style={styles.adContainer}>
      <Image source={item.image} style={styles.adImage} resizeMode="cover" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>           
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <View style={styles.greetingContent}>
            <Image 
              source={require('@/assets/images/app-logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.greetingText}>
              <Text style={styles.greetingTitle}>Halo, Awa!</Text>
              <Text style={styles.greetingSubtitle}>
                Apa yang kamu rasakan hari ini? Adakah yang saya bisa bantu?
              </Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.checkButton}
            onPress={navigateToCheck}
          >
            <Text style={styles.checkButtonText}>Cek Keadaan Mu Sekarang</Text>
          </TouchableOpacity>
        </View>

        {/* Feature Cards */}
        <View style={styles.featuresSection}>
          <TouchableOpacity 
            style={[styles.featureCard, styles.purpleCard]}
            onPress={navigateToMedicine}
          >
            <Image 
              source={require('@/assets/images/doku-pharm.png')} 
              style={styles.featureIcon}
              resizeMode="contain"
            />
            <Text style={styles.featureTitle}>Telusuri{'\n'}Alternatif Obat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.featureCard, styles.greenCard]}
            onPress={navigateToHistory}
          >
            <Image 
              source={require('@/assets/images/doku-hist.png')} 
              style={styles.featureIcon}
              resizeMode="contain"
            />
            <Text style={styles.featureTitle}>Lihat Riwayat{'\n'}Medis</Text>
          </TouchableOpacity>
        </View>

        {/* Advertisements */}
        <View style={styles.adsSection}>
          <FlatList
            data={adsData}
            renderItem={renderAdItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width - 40}
            decelerationRate="fast"
            contentContainerStyle={styles.adsList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  greetingSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  greetingContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  greetingText: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D1B69',
    marginBottom: 8,
  },
  greetingSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  checkButton: {
    backgroundColor: '#6B46C1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 15,
  },
  featureCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  purpleCard: {
    backgroundColor: '#E5D5FF',
  },
  greenCard: {
    backgroundColor: '#D1FAE5',
  },
  featureIcon: {
    width: 40,
    height: 40,
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D1B69',
    lineHeight: 20,
  },
  adsSection: {
    marginBottom: 30,
  },
  adsList: {
    paddingRight: 20,
  },
  adContainer: {
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  adImage: {
    width: width - 60,
    height: 200,
  },
});