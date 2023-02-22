import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchScreen from './SearchScreen'

const SearchStack = createNativeStackNavigator();

export default function SearchStackScreen () {
  return (
    <SearchStack.Navigator  
      screenOptions={{
        headerShown: false,
      }}>
        <SearchStack.Screen name="_Search" component={SearchScreen} />
    </SearchStack.Navigator>
  )
}