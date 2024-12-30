import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useStore } from '@/store/useStore';

export default function RecordButton({ onPress }: { onPress: () => void }) {
  const isRecording = useStore((state) => state.isRecording);
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
        onPress={onPress}
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