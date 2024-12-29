import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';


export default function NewEntryScreen() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Diary Entry</Text>
      <TouchableOpacity 
        style={[styles.recordButton, isRecording && styles.recording]}
        onPress={() => setIsRecording(!isRecording)}
      >
        <Text style={styles.buttonText}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  recordButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 50,
    width: 200,
    alignItems: 'center',
  },
  recording: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
}); 