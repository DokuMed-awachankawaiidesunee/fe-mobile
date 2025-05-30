import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { usePathname, router } from 'expo-router';

type HeaderProps = {
  title?: string;
  showBackButton?: boolean;
};

export default function Header({ title, showBackButton = false }: HeaderProps) {
  const { theme } = useTheme();
  const currentPath = usePathname();

  if (currentPath === '/') {
    return null;
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      paddingTop: 50,
      paddingBottom: 10,
      paddingHorizontal: theme.spacing.b1,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      position: 'absolute',
      left: theme.spacing.b1,
      paddingVertical: theme.spacing.b2,
      paddingHorizontal: theme.spacing.b2,
    },
    backIcon: {
      width: 24,
      height: 24,
      tintColor: theme.colors.text, 
    },
    title: {
      fontSize: theme.fontSizes.b1,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.text,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Image
            source={require('@/assets/images/arrow-back.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}