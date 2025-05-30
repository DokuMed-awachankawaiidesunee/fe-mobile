import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import Navbar from '@/components/Navbar'; // Import komponen Navbar custom Anda
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { SFSymbols6_0 } from '@/types';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Sembunyikan tab bar bawaan
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Beranda',
            // Tab icon tidak diperlukan karena kita menggunakan Navbar kustom
          }}
        />
        <Tabs.Screen
          name="medicine"
          options={{
            title: 'Obat',
          }}
        />
        <Tabs.Screen
          name="symptom"
          options={{
            title: 'Gejala',
          }}
        />
        <Tabs.Screen
          name="chatbot"
          options={{
            title: 'DokuHelp',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profil',
          }}
        />
      </Tabs>
      
      {/* Tambahkan Navbar kustom di sini */}
      <Navbar />
    </View>
  );
}