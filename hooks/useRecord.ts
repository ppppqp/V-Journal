import { useStore } from '@/store/useStore';
import { useLLMAgent } from '@/hooks/useLLMAgent';

export const useRecord = () => {
  const speechProcess = useStore((state) => state.speechProcess);
  const addMessage = useStore((state) => state.addMessage);
  const setSpeechText = useStore((state) => state.setSpeechText);
  const isRecording = useStore((state) => state.isRecording);
  const setIsRecording = useStore((state) => state.setIsRecording);
  const saveDiary = useStore((state) => state.saveDiary);
  const speechText = useStore((state) => state.speechText);
  const { generateNextQuestion } = useLLMAgent();

  return async () => {
    if (!isRecording) {
      // start recording
      setIsRecording(true);
      setSpeechText('');
      try {
        speechProcess.startListening({
          language: 'zh-CN',
          onResult: (result) => {
            setSpeechText(result.text);
            if (result.isFinal) {
              addMessage({
                type: 'user',
                content: result.text,
              });
              setSpeechText('');
            }
          },
        });
      } catch (error) {
        console.error('Speech recognition error:', error);
        setIsRecording(false);
      }
    } else {
      // stop recording
      speechProcess.stopListening();
      setIsRecording(false);
      if (speechText) {
        addMessage({
          type: 'user',
          content: speechText,
        });
        setSpeechText('');
      }
      await saveDiary();

      // Generate and speak the next question
      await generateNextQuestion();
    }
  };
}; 