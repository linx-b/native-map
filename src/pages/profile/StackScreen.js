import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from './ProfileScreen';

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen () {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen name="_Profile" component={ProfileScreen} />
      </ProfileStack.Navigator>
    )
}