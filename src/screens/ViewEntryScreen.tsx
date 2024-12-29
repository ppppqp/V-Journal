import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type ViewEntryScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ViewEntry'>;
  route: RouteProp<RootStackParamList, 'ViewEntry'>;
};

export default function ViewEntryScreen({ route }: ViewEntryScreenProps) {
  const { entryId } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Diary Entry</Text>
        <Text style={styles.date}>Date: {/* Add date here */}</Text>
        <View style={styles.answersContainer}>
          {/* Add entry content here */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  answersContainer: {
    gap: 16,
  },
}); 