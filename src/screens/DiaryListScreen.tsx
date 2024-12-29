import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { DiaryEntry } from '../types/diary';
import { ThemedView } from '@/components/ThemedView';

export default function DiaryListScreen() {
  const [entries, setEntries] = React.useState<DiaryEntry[]>([]);

  const renderItem = ({ item }: { item: DiaryEntry }) => (
    <TouchableOpacity 
      style={styles.entryCard}
      onPress={() => router.push(`/(entry)/${item.id}`)}
    >
      <Text style={styles.entryDate}>{item.date}</Text>
      <Text style={styles.entrySummary}>{item.summary || 'No summary available'}</Text>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  listContainer: {
    flexGrow: 1,
  },
  entryCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  entrySummary: {
    fontSize: 14,
    color: '#666',
  },
}); 