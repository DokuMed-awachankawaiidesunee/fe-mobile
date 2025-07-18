import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { usePathname, router } from 'expo-router';

export default function Navbar() {
  const { theme } = useTheme();
  const currentPath = usePathname();

  const tabs = [
    {
      name: 'Beranda',
      icon: require('../assets/images/home-icon.png'),
      route: '/'
    },
    {
      name: 'DokuCheck',
      icon: require('../assets/images/doku-check-icon.png'),
      route: '/history'
    },
    {
      name: 'Profil',
      icon: require('../assets/images/profile-icon.png'),
      route: '/profile'
    }
  ];

  const isActive = (route: string) => {
    if (route === '/') {
      return currentPath === '/' || currentPath === '/index';
    }
    return currentPath.startsWith(route);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingVertical: 20,
      paddingBottom: 30, 
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabIcon: {
      width: 26,
      height: 26,
      tintColor: theme.colors.textSecondary, 
    },
    activeTabIcon: {
      tintColor: theme.colors.primary, 
    },
    tabText: {
      fontSize: theme.fontSizes.b3,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.textSecondary,
      marginTop: 4,
    },
    activeTabText: {
      color: theme.colors.primary, // Purple color when active
    },
  });

  const navigateTo = (path: string) => {
    try {
      router.push(path as any);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = isActive(tab.route);
        
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigateTo(tab.route)}
          >
            <Image 
              source={tab.icon}
              style={[
                styles.tabIcon,
                active && styles.activeTabIcon
              ]}
            />
            <Text style={[
              styles.tabText,
              active && styles.activeTabText
            ]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}