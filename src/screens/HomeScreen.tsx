import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import RecordButton from '@/components/ui/RecordButton';
import { useStore } from '@/src/store/useStore';


export default function HomeScreen() {
  const currentQuestion = useStore((state) => state.currentQuestion);
  const speechText = useStore((state) => state.speechText);
  const isRecording = useStore((state) => state.isRecording);
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>How was your day overall?</Text>
      
      <ThemedView style={styles.transcriptContainer}>
        {isRecording && (
          <Text style={styles.recordingText}>Recording...</Text>
        )}
        {speechText && (
          <Text style={styles.transcriptText}>{speechText}</Text>
        )}
      </ThemedView>
      
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
  transcriptContainer: {
    flex: 1,
    width: '100%',
    padding: 16,
    marginBottom: 20,
  },
  recordingText: {
    color: '#ee1010',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  transcriptText: {
    fontSize: 18,
    lineHeight: 24,
    color: '#333',
  },
}); 