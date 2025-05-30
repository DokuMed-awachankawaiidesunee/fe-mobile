import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';

interface HistoryItem {
  id: string;
  date: string;
  time: string;
  priceRange?: string;
  symptoms?: string[];
  recommendedClinic?: string;
  hasDetails?: boolean;
}

const historyData: HistoryItem[] = [
  {
    id: '1',
    date: '27 Mei 2025',
    time: '17:00 WIB',
    priceRange: '150.000 - 250.000',
    symptoms: ['Sakit kepala', 'Demam', 'Mual'],
    recommendedClinic: 'Poli Umum',
    hasDetails: true,
  },
  {
    id: '2',
    date: '27 Mei 2025',
    time: '17:00 WIB',
    priceRange: '200.000 - 300.000',
    symptoms: ['Batuk', 'Pilek', 'Sakit tenggorokan'],
    recommendedClinic: 'Poli Paru',
    hasDetails: true,
  },
  {
    id: '3',
    date: '27 Mei 2025',
    time: '17:00 WIB',
    hasDetails: false,
  },
  {
    id: '4',
    date: '27 Mei 2025',
    time: '17:00 WIB',
    hasDetails: false,
  },
  {
    id: '5',
    date: '27 Mei 2025',
    time: '17:00 WIB',
    hasDetails: false,
  },
  {
    id: '6',
    date: '27 Mei 2025',
    time: '17:00 WIB',
    hasDetails: false,
  },
];

export default function HistoryScreen() {
  const { theme } = useTheme();

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['2']));

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const hexToRgba = (hex: string, opacity: number) => {
    hex = hex.replace('#', '');
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const renderHistoryItem = (item: HistoryItem) => {
    const isExpanded = expandedItems.has(item.id);
    
    const calendarBgColor = theme.colors.light_green 
      ? hexToRgba(theme.colors.light_green, 0.35) 
      : 'rgba(222, 190, 239, 0.2)';
    
    return (
      <View key={item.id} style={styles(theme).historyItem}>
        <TouchableOpacity
          style={styles(theme).historyHeader}
          onPress={() => item.hasDetails && toggleExpanded(item.id)}
          activeOpacity={item.hasDetails ? 0.7 : 1}
        >
          <View style={styles(theme).historyHeaderContent}>
            <View style={[
              styles(theme).calendarIconContainer, 
              { backgroundColor: calendarBgColor }
            ]}>
              <Image
                source={require('@/assets/images/calendar-icon.png')}
                style={styles(theme).calendarIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles(theme).dateTimeText}>
              {item.date}, {item.time}
            </Text>
          </View>
          {item.hasDetails && (
            <View style={styles(theme).chevronContainer}>
              {isExpanded ? (
                <ChevronUp size={20} color="#666" />
              ) : (
                <ChevronDown size={20} color="#666" />
              )}
            </View>
          )}
        </TouchableOpacity>

        {isExpanded && item.hasDetails && (
          <View style={styles(theme).expandedContent}>
            <View style={styles(theme).detailsContainer}>
              <View style={styles(theme).detailRow}>
                <View style={styles(theme).detailColumn}>
                  <Text style={styles(theme).detailLabel}>Kisaran Harga</Text>
                  <Text style={styles(theme).detailValue}>{item.priceRange}</Text>
                </View>
                <View style={styles(theme).detailColumn}>
                  <Text style={styles(theme).detailLabel}>Rekomendasi Poli</Text>
                  <Text style={styles(theme).detailValue}>{item.recommendedClinic}</Text>
                </View>
              </View>
              
              <View style={styles(theme).symptomsSection}>
                <Text style={styles(theme).detailLabel}>Gejala</Text>
                <View style={styles(theme).symptomsContainer}>
                  {item.symptoms?.map((symptom, index) => (
                    <View key={index} style={styles(theme).symptomTag}>
                      <Text style={styles(theme).symptomTagText}>{symptom}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            
            <TouchableOpacity style={styles(theme).showCodeButton}>
              <Text style={styles(theme).showCodeButtonText}>Tampilkan Kode</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles(theme).container}>
      <ScrollView style={styles(theme).content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles(theme).header}>
          <Text style={styles(theme).title}>Lihat Riwayat{'\n'}MedisMu!</Text>
          <TouchableOpacity style={styles(theme).checkSymptomsButton}>
            <Text style={styles(theme).checkSymptomsButtonText}>Cek Gejala</Text>
          </TouchableOpacity>
        </View>

        {/* History List */}
        <View style={styles(theme).historyList}>
          {historyData.map(renderHistoryItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.purple,
    marginBottom: 20,
    lineHeight: 34,
  },
  checkSymptomsButton: {
    backgroundColor: theme.colors.purple,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  checkSymptomsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  historyList: {
    gap: 12,
    paddingBottom: 100,
  },
  historyItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  historyHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  calendarIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  calendarIcon: {
    width: 24,
    height: 24,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  chevronContainer: {
    padding: 4,
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailColumn: {
    flex: 1,
    marginRight: 16,
  },
  symptomsSection: {
    marginTop: 0,
  },
  detailLabel: {
    marginTop: 15,
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: theme.colors.purple,
    fontWeight: '600',
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomTag: {
    backgroundColor: theme.colors.light_purple,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  symptomTagText: {
    fontSize: 14,
    color: theme.colors.dark_blue,
    fontWeight: '500',
  },
  showCodeButton: {
    backgroundColor: theme.colors.purple,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  showCodeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});