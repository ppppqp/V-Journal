import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { DiaryEntry } from '../types/diary';

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
    <View style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  entryCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
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