import { Tabs } from 'expo-router';
import { Feather  } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: true,
      tabBarStyle: { backgroundColor: '#fafafa' },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather  name="home" size={18} color={color} />,
          tabBarActiveTintColor: 'black',
          tabBarLabel: '',
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather  name="book" size={18} color={color} />,
          tabBarActiveTintColor: 'black',
          tabBarLabel: '',
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
      <Tabs.Screen
        name="new-entry"
        options={{
          title: 'New',
          headerTitle: 'New',
          href: null,
        }}
      />
    </Tabs>
  );
} 