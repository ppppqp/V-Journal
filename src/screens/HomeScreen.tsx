import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import RecordButton from '@/components/ui/RecordButton';


export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>How was your day overall?</Text>
      <ThemedView style={styles.recordButtonContainer}>
      <RecordButton />

      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    paddingTop: 80,
    fontSize: 28,
    fontWeight: 'bold',
  },
  recordButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 100,
  },
  button: {
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 10,
    width: '50%',
    marginVertical: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
}); 