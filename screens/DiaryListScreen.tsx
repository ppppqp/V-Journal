import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '@/store/useStore';
import { format } from 'date-fns';
import { DiaryEntry } from '@/types/diary';

export default function DiaryListScreen() {
  const diaries = useStore((state) => state.diaries);
  const loadDiaries = useStore((state) => state.loadDiaries);

  useEffect(() => {
    loadDiaries();
  }, []);

  const renderItem = ({ item }: { item: DiaryEntry }) => (
    <TouchableOpacity 
      style={styles.diaryCard}
      onPress={() => router.push(`/(entry)/${item.id}`)}
    >
      <Text style={styles.date}>
        {format(new Date(item.date), 'MMM dd, yyyy')}
      </Text>
      {item.title && <Text style={styles.title}>{item.title}</Text>}
      {item.summary && <Text style={styles.summary}>{item.summary}</Text>}
      {item.tags.length > 0 && (
        <View style={styles.tagContainer}>
          {item.tags.map(tag => (
            <Text key={tag} style={styles.tag}>#{tag}</Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={diaries}
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  listContainer: {
    flexGrow: 1,
  },
  diaryCard: {
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
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: '#666',
  },
  summary: {
    fontSize: 14,
    color: '#666',
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    padding: 4,
    borderRadius: 4,
    marginRight: 8,
    color: '#666',
  },
}); 