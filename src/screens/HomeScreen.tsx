import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Diary</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/new-entry')}
      >
        <Text style={styles.buttonText}>New Entry</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/diary')}
      >
        <Text style={styles.buttonText}>View Entries</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
}); 