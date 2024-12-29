import React, { useCallback, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import RecordButton from '@/components/ui/RecordButton';
import { useStore } from '@/store/useStore';
import { ConversationMessage } from '@/types/conversation';
import NewButton from '@/components/ui/NewButton';

const mockMessages: ConversationMessage[] = [
  {
    id: '1',
    timestamp: new Date().getTime(),
    type: 'assistant',
    content: 'How was your day overall?',
  },
  {
    id: '2',
    timestamp: new Date().getTime(),
    type: 'user',
    content: 'I had a great day!',
  },
  {
    id: '3',
    timestamp: new Date().getTime(),
    type: 'assistant',
    content: 'What did you do?',
  },
  {
    id: '4',
    timestamp: new Date().getTime(),
    type: 'user',
    content: 'I went to the gym and then had dinner with friends.',
  },
];

export default function HomeScreen() {
  const speechText = useStore((state) => state.speechText);
  const isRecording = useStore((state) => state.isRecording);
  const currentDiary = useStore((state) => state.currentDiary);
  const setCurrentDiary = useStore((state) => state.setCurrentDiary);
  const createNewDiary = useStore((state) => state.createNewDiary);
  const loadDiaries = useStore((state) => state.loadDiaries);

  useEffect(() => {
    const checkForTodaysDiary = async () => {
      await loadDiaries();
      const diaries = useStore.getState().diaries;
      const today = new Date();
      const todaysDiary = diaries.find(diary => {
        const diaryDate = new Date(diary.date);
        return diaryDate.toDateString() === today.toDateString();
      });
      if (!todaysDiary) {
        await createNewDiary();
      } else {
        setCurrentDiary(todaysDiary);
      }
    };

    checkForTodaysDiary();
  }, [createNewDiary, setCurrentDiary]);

  const handleNewDiary = useCallback(() => {
    createNewDiary();
  }, [createNewDiary]);

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>How was your day overall?</Text>
      
      <ThemedView style={styles.transcriptContainer}>
        {currentDiary?.conversation?.messages.map((message) => (
          <Text key={message.id} style={[
            styles.messageText,
            message.type === 'assistant' ? styles.assistantMessage : styles.userMessage
          ]}>
            {message.content}
          </Text>
        ))}
        {isRecording && speechText && (
          <Text style={styles.recordingText}>{speechText}</Text>
        )}
      </ThemedView>
      
      <ThemedView style={styles.recordButtonContainer}>
        <RecordButton />
      </ThemedView>
      
      <ThemedView style={styles.newButtonContainer}>
        <NewButton onPress={handleNewDiary} />
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
    flex: 2,
    width: '100%',
    padding: 16,
    marginBottom: 20,
    overflowY: 'scroll',
  },
  recordingText: {
    color: '#ee1010',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 12,
  },
  assistantMessage: {
    color: '#666',
    alignSelf: 'flex-start',
  },
  userMessage: {
    color: '#111',
    alignSelf: 'flex-end',
  },
  newButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
}); 