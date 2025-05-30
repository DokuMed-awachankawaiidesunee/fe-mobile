import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function ExampleScreen() {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    } as ViewStyle,
    header: {
      marginBottom: theme.spacing.xl,
    } as ViewStyle,
    title: {
      fontSize: theme.fontSizes.xxl,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    } as TextStyle,
    subtitle: {
      fontSize: theme.fontSizes.body,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.textSecondary,
    } as TextStyle,
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    } as ViewStyle,
    cardTitle: {
      fontSize: theme.fontSizes.lg,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    } as TextStyle,
    cardText: {
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.textSecondary,
      lineHeight: 20,
    } as TextStyle,
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
      alignItems: 'center',
      marginTop: theme.spacing.lg,
    } as ViewStyle,
    buttonText: {
      fontSize: theme.fontSizes.body,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.background, 
    } as TextStyle,
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
      alignItems: 'center',
      marginTop: theme.spacing.md,
    } as ViewStyle,
    secondaryButtonText: {
      fontSize: theme.fontSizes.body,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.primary,
    } as TextStyle,
    badge: {
      backgroundColor: theme.colors.success,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: theme.spacing.xxs,
      borderRadius: 12,
      alignSelf: 'flex-start',
      marginBottom: theme.spacing.md,
    } as ViewStyle,
    badgeText: {
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.text,
    } as TextStyle,
    lightText: {
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.light,
      color: theme.colors.textSecondary,
      fontStyle: 'italic',
    } as TextStyle,
    heavyText: {
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.black,
      color: theme.colors.text,
      textAlign: 'center',
    } as TextStyle,
  });

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Custom Theme Demo</Text>
        <Text style={styles.subtitle}>
          Using the new color palette
        </Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>NEW FEATURE</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Font Weights Example</Text>
        <Text style={styles.lightText}>This is Figtree Light text</Text>
        <Text style={styles.cardText}>This is Figtree Regular text</Text>
        <Text style={[styles.cardText, { fontFamily: theme.fontFamily.medium }]}>
          This is Figtree Medium text
        </Text>
        <Text style={[styles.cardText, { fontFamily: theme.fontFamily.semibold }]}>
          This is Figtree SemiBold text
        </Text>
        <Text style={[styles.cardText, { fontFamily: theme.fontFamily.bold }]}>
          This is Figtree Bold text
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Font Sizes Example</Text>
        <Text style={[styles.cardText, { fontSize: theme.fontSizes.xxxs }]}>
          Extra Extra Small ({theme.fontSizes.xxxs}px)
        </Text>
        <Text style={[styles.cardText, { fontSize: theme.fontSizes.xxs }]}>
          Extra Small ({theme.fontSizes.xxs}px)
        </Text>
        <Text style={[styles.cardText, { fontSize: theme.fontSizes.xs }]}>
          Small ({theme.fontSizes.xs}px)
        </Text>
        <Text style={[styles.cardText, { fontSize: theme.fontSizes.sm }]}>
          Small Medium ({theme.fontSizes.sm}px)
        </Text>
        <Text style={[styles.cardText, { fontSize: theme.fontSizes.body }]}>
          Body ({theme.fontSizes.body}px)
        </Text>
        <Text style={[styles.cardText, { fontSize: theme.fontSizes.md }]}>
          Medium ({theme.fontSizes.md}px)
        </Text>
        <Text style={[styles.cardText, { fontSize: theme.fontSizes.lg }]}>
          Large ({theme.fontSizes.lg}px)
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Spacing Example</Text>
        <Text style={styles.cardText}>
          This card uses lg padding ({theme.spacing.lg}px) and has md margin bottom ({theme.spacing.md}px)
        </Text>
      </View>

      <Text style={styles.heavyText}>Figtree Black Weight</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Primary Button</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Secondary Button</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}