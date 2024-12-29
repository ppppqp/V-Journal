import { TouchableOpacity, Text } from 'react-native';
import { Feather  } from '@expo/vector-icons';

export default function NewButton({onPress}: {onPress: () => void}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Feather name="plus" size={24} color="black" />
    </TouchableOpacity>
  );
}