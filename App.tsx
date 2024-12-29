import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types/navigation';
import HomeScreen from './screens/HomeScreen';
import NewEntryScreen from './screens/NewEntryScreen';
import DiaryListScreen from './screens/DiaryListScreen';
import ViewEntryScreen from './screens/ViewEntryScreen';

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