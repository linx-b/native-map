// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer, CommonActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useReducer, useEffect, useMemo } from 'react'
import * as SecureStore from 'expo-secure-store'
import { 
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import db from 'database/firebase'


import AuthContext  from './src/pages/auth/context'

import MapStackScreen from './src/pages/maps/StackScreen'
import SearchStackScreen from './src/pages/search/StackScreen'
import ProfileStackScreen from './src/pages/profile/ProfileScreen'

import LoginScreen from './src/pages/auth/login'
import RegisterScreen from './src/pages/auth/register'

import UserStackScreen from './src/pages/admin/UserStackScreen'
import ManageMapStackScreen from './src/pages/admin/ManageMapStackScreen'
import SettingScreen from './src/pages/admin/setting'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

export default function App() {
   const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            role: action.role
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            role: ''
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      role: '',
    }
  )

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async ({username, password}) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        //username.trim()
        // ====================================================
        const _query = query(collection(db, 'users'), 
          where("email", "==", username.trim()),
          where("password", "==", password.trim()),
          where("del", "==", false)
        )
        const querySnapshot = await getDocs(_query)
        const [user] = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id }))

        if(!user) {
          return false
        }

        await AsyncStorage.setItem('uid', user.id)

        dispatch({ type: 'SIGN_IN', token: user.id, role: user.role,})
        
        return true
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {
            state.userToken ? (
              state.role === 'ADMIN' ? (
                <Stack.Screen 
                  name="Admin"
                  component={AdminTabStack}
                  options={{headerShown: false}}
                ></Stack.Screen>
              ) : (
                <Stack.Screen 
                  name="User"
                  component={UserTabStack}
                  options={{headerShown: false}}
                ></Stack.Screen>
              )
            ) : (
              <Stack.Group
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='SignUp' component={RegisterScreen}/>
              </Stack.Group>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

function UserTabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if(route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline'
          }else if (route.name === 'Search') {
            return <MaterialCommunityIcons name={focused ? 'map-search' : 'map-search-outline' } size={size + 8} color={color} />
          }else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline'
          }

          return <Ionicons name={iconName} size={size + 5} color={color} />;
        },
        tabBarActiveTintColor: '#645CBB',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: { height: 65 },
        tabBarHideOnKeyboard: true,
      })}
      // tabBarOptions={{
      //   keyboardHidesTabBar: true
      // }}   
    >
      <Tab.Screen name="Map" component={MapStackScreen} />
      <Tab.Screen name="Search" component={SearchStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator> 
  )
}

function AdminTabStack() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName
          if(route.name === 'User') {
            iconName = focused ? 'person-circle' : 'person-circle-outline'
          }else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline'
          }else if (route.name === 'Setting') {
            iconName = focused ? 'settings-sharp' : 'settings-outline'
          }

          return <Ionicons name={iconName} size={size + 5} color={color} />;
        },
        tabBarActiveTintColor: '#645CBB',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: { height: 65 },
        keyboardHidesTabBar: true,
      })}
    >
      <Tab.Screen name="User" component={UserStackScreen}></Tab.Screen>
      <Tab.Screen name="Map" component={ManageMapStackScreen}></Tab.Screen>
      <Tab.Screen name="Setting" component={SettingScreen}/>
    </Tab.Navigator>
  )
}
