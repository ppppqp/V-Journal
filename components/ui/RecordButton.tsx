import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

export default function RecordButton() {
  return <Animated.View style={[
    styles.recordButton,
    isRecording && styles.recording,
  ]}>
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => setIsRecording(!isRecording)}
    />
  </Animated.View>
}



const styles = StyleSheet.create({
  recordButton: {
    backgroundColor: '#111',
    width: 80,
    height: 80,
    borderRadius: 10,
    shadowColor: '#111',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 10,
    elevation: 5,
  },
  recording: {
    backgroundColor: '#ee1010',
    shadowColor: '#ee1010',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  touchable: {
    width: '100%',
    height: '100%',
  },
}); 