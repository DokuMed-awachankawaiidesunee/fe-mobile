import { Tabs, useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navbar from '@/components/Navbar';
import { useColorScheme } from '@/hooks/useColorScheme';
import SplashScreen from '@/components/SplashScreen';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        
        if (hasLaunched === null) {
          const timer = setTimeout(() => {
            setShowSplash(false);
            router.replace('/landing');
            AsyncStorage.setItem('hasLaunched', 'true');
          }, 15000);
          return () => clearTimeout(timer);
        } else {
          setShowSplash(false);
        }
      } catch (error) {
        console.log('Error checking first launch:', error);
        setShowSplash(false);
      }
    };

    checkFirstLaunch();
  }, [router]);

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
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="medicine" options={{ title: 'DokuPharm' }} />
        <Tabs.Screen name="symptom" options={{ title: 'DokuCheck' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>
      <Navbar />
    </View>
  );
}