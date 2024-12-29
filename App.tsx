import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types/navigation';
import HomeScreen from './src/screens/HomeScreen';
import NewEntryScreen from './src/screens/NewEntryScreen';
import DiaryListScreen from './src/screens/DiaryListScreen';
import ViewEntryScreen from './src/screens/ViewEntryScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewEntry" component={NewEntryScreen} />
        <Stack.Screen name="DiaryList" component={DiaryListScreen} />
        <Stack.Screen name="ViewEntry" component={ViewEntryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 