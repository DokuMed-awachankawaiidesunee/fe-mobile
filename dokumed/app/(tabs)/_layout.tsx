import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Navbar from '@/components/Navbar';
import { useColorScheme } from '@/hooks/useColorScheme';
import SplashScreen from '@/components/SplashScreen'; // Komponen splash screen manual

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);

  // Timer splash 1.5 detik (atau tunggu animasi selesai)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 15000); // ⏱️ ganti durasi sesuai kebutuhan
    return () => clearTimeout(timer);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Beranda' }} />
        <Tabs.Screen name="medicine" options={{ title: 'Obat' }} />
        <Tabs.Screen name="symptom" options={{ title: 'Gejala' }} />
        <Tabs.Screen name="chatbot" options={{ title: 'DokuHelp' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
      </Tabs>
      <Navbar />
    </View>
  );
}
