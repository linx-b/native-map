import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FacultyListScreen from './map/FacultyListScreen'
import BuildingListScreen from './map/BuildingListScreen'
import DetailScreen from './map/DetailScreen'

const MapStack = createNativeStackNavigator()

export default function ManageMapStackScreen({navigation, route}) {
  return (
    <MapStack.Navigator>
      <MapStack.Screen name="Facultys" component={FacultyListScreen}></MapStack.Screen>
      <MapStack.Screen name="Buildings" component={BuildingListScreen}></MapStack.Screen>
      <MapStack.Screen name="Detail" component={DetailScreen}></MapStack.Screen>
    </MapStack.Navigator>
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