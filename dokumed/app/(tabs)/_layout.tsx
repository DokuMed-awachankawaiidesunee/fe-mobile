import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { SFSymbols6_0 } from '@/types';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={"house.fill" as SFSymbols6_0} color={color} />,
        }}
      />
      <Tabs.Screen
        name="medicine"
        options={{
          title: 'Obat',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={"pills.fill" as SFSymbols6_0} color={color} />,
        }}
      />
      <Tabs.Screen
        name="symptom"
        options={{
          title: 'Gejala',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={"heart.text.square.fill" as SFSymbols6_0} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: 'DokuHelp',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={"bubble.left.fill" as SFSymbols6_0} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={"person.crop.circle.fill" as SFSymbols6_0} color={color} />,
        }}
      />
    </Tabs>
  );
}