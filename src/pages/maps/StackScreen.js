import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Home'
import AboutScreen from './About'
import MainMapScreen from './MainMapScreen'
import SubMapScreen from './SubMapScreen'
import DetailScreen from './DetailScreen'
import MarkerScreen from './MarkerScreen';

const MapStack = createNativeStackNavigator();

export default function MapStackScreen ({navigation}) {
  return (
    <MapStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#645CBB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <MapStack.Screen name="Main-map" component={MainMapScreen} />
      <MapStack.Screen name="Sub-map" component={SubMapScreen} />
      <MapStack.Screen name="Detail" component={DetailScreen}  options={({ route }) => ({ title: route.params.data?.sname || 'Detail' })} />
      <MapStack.Screen name="Marker" component={MarkerScreen} />
      <MapStack.Screen name="Home" component={HomeScreen} />
      <MapStack.Screen name="About" component={AboutScreen} />
    </MapStack.Navigator>
  )
}