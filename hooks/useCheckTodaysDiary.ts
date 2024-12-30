import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export const useCheckTodaysDiary = () => {
  const loadDiaries = useStore((state) => state.loadDiaries);
  const createNewDiary = useStore((state) => state.createNewDiary);
  const setCurrentDiary = useStore((state) => state.setCurrentDiary);

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
};