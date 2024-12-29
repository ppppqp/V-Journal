import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useStore } from '@/src/store/useStore';
import { generateId } from '@/src/utils/random';

export default function RecordButton() {
  const isRecording = useStore((state) => state.isRecording);
  const setIsRecording = useStore((state) => state.setIsRecording);
  const setSpeechText = useStore((state) => state.setSpeechText);
  const speechProcess = useStore((state) => state.speechProcess);
  const addMessage = useStore((state) => state.addMessage);
  const saveDiary = useStore((state) => state.saveDiary);
  const currentDiary = useStore((state) => state.currentDiary);
  const speechText = useStore((state) => state.speechText);

  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(colorAnim, {
      toValue: isRecording ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isRecording]);

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ee1010', '#111'],
  });

  const handlePress = async () => {
    if (!isRecording) {
      setIsRecording(true);
      setSpeechText(''); // Clear previous speech text
      try {
        speechProcess.startListening({
          language: 'zh-CN',
          onResult: (result) => {
            setSpeechText(result.text);
            if (result.isFinal) {
              // Add the final speech text to conversation
              addMessage({
                type: 'user',
                content: result.text,
              });
              setSpeechText(''); // Clear after adding to conversation
            }
          },
        });
      } catch (error) {
        console.error('Speech recognition error:', error);
        setIsRecording(false);
      }
    } else {
      speechProcess.stopListening();
      setIsRecording(false);
      if(speechText){
        currentDiary?.conversation.messages.push({
          id: generateId(),
          timestamp: Date.now(),
          type: 'user',
          content: speechText,
        });
      }
      saveDiary();
    }
  };

  return (
    <Animated.View style={[
      styles.recordButton,
      !isRecording && styles.recording,
      {
        backgroundColor,
      },
    ]}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={handlePress}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowColor: '#ee1010',
    shadowRadius: 10,
    elevation: 5,
  },
  recording: {
    shadowOpacity: 0.5,
  },
  touchable: {
    width: '100%',
    height: '100%',
  },
}); 