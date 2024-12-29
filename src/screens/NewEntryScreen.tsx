import React from 'react';
import { Text, StyleSheet } from 'react-native';
import RecordButton from '@/components/ui/RecordButton';
import { ThemedView } from '@/components/ThemedView';
import { useStore } from '@/src/store/useStore';

export default function NewEntryScreen() {
  const currentQuestion = useStore((state) => state.currentQuestion);

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>{currentQuestion}</Text>
      <RecordButton />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 30,
  },
}); 