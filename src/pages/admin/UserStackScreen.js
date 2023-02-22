import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserListScreen from './user/UserListScreen'
import UserDetailScreen from './user/UserDetailScreen'

const UserStack = createNativeStackNavigator()

export default function UserStackScreen({navigation, route}) {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="Users" component={UserListScreen}></UserStack.Screen>
      <UserStack.Screen name="Detail" component={UserDetailScreen}></UserStack.Screen>
    </UserStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});