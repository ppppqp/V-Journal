import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: 'Entries',
          tabBarIcon: ({ color }) => <FontAwesome name="book" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
} 