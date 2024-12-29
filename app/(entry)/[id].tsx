import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useStore } from '@/src/store/useStore';
import { format } from 'date-fns';

export default function ViewEntryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const loadDiary = useStore((state) => state.loadDiary);
  const currentDiary = useStore((state) => state.currentDiary);

  useEffect(() => {
    if (id) {
      loadDiary(id);
    }
  }, [id]);

  if (!currentDiary) {
    return (
      <ThemedView style={styles.container}>
        <Text>Loading...</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.date}>
        {format(new Date(currentDiary.date), 'MMMM dd, yyyy')}
      </Text>
      {currentDiary.title && (
        <Text style={styles.title}>{currentDiary.title}</Text>
      )}
      <ScrollView style={styles.conversationContainer}>
        {currentDiary.conversation.messages.map((message) => (
          <Text
            key={message.id}
            style={[
              styles.messageText,
              message.type === 'assistant'
                ? styles.assistantMessage
                : styles.userMessage,
            ]}
          >
            {message.content}
          </Text>
        ))}
      </ScrollView>
      {currentDiary.tags.length > 0 && (
        <ThemedView style={styles.tagContainer}>
          {currentDiary.tags.map((tag) => (
            <Text key={tag} style={styles.tag}>
              #{tag}
            </Text>
          ))}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  date: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  conversationContainer: {
    flex: 1,
    marginVertical: 16,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  assistantMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#007AFF',
    color: 'white',
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
}); 