import { useStore } from '@/store/useStore';
import { OpenAIAgent } from '@/services/llm/OpenAIAgent';

const llmAgent = new OpenAIAgent(process.env.EXPO_PUBLIC_OPENAI_API_KEY || '');

export const useLLMAgent = () => {
  const currentDiary = useStore((state) => state.currentDiary);
  const addMessage = useStore((state) => state.addMessage);
  const speechProcess = useStore((state) => state.speechProcess);
  const saveDiary = useStore((state) => state.saveDiary);
  const generateNextQuestion = async () => {
    if (!currentDiary) return;

    const messages = currentDiary.conversation.messages;
    const prompt = `Based on this conversation about someone's day:
${messages.map(m => `${m.type}: ${m.content}`).join('\n')}

Generate a follow-up question that:
1. Helps the person reflect deeper about their day
2. Relates to what they've said
3. Is personal and empathetic
4. Is concise (max 20 words)

Only respond with the question itself, no other text. Respond in Chinese.`;

    try {
      const response = await llmAgent.query(prompt);
      const question = response.text.trim();

      // First add the question to the conversation
      addMessage({
        type: 'assistant',
        content: question,
      });


      saveDiary();
      
      // Then speak it
      await speechProcess.textToSpeech(question, {
        language: 'zh-CN',
        rate: 0.9,
      });

      

    } catch (error) {
      console.error('Failed to generate question:', error);
    }
  };

  return { generateNextQuestion };
}; 