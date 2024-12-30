import { useStore } from '@/store/useStore';
import { generateId } from '@/utils/random';


export const useRecord = () => {
  const speechProcess = useStore((state) => state.speechProcess);
  const addMessage = useStore((state) => state.addMessage);
  const setSpeechText = useStore((state) => state.setSpeechText);
  const isRecording = useStore((state) => state.isRecording);
  const setIsRecording = useStore((state) => state.setIsRecording);
  const currentDiary = useStore((state) => state.currentDiary);
  const saveDiary = useStore((state) => state.saveDiary);
  const speechText = useStore((state) => state.speechText);

  return () => {
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
      if (speechText) {
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
};