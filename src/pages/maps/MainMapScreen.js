import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { Button } from '@rneui/themed'
import { 
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc
} from "firebase/firestore";
import db from 'database/firebase'

// Linking.openURL('google.navigation:q=100+101')
import MainMap from 'components/MainMap'
import { useEffect, useState } from 'react';

export default function Home({navigation, route}) {
  const [faculties, setFacultues] = useState([])

  useEffect(() => {
    console.log("mounted")
    const fetch = async () => {
      await getDocs(collection(db, 'maps')).then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          // console.log(doc);
        })
      })
    }

    fetch()
  }, [])

  return (
    <View style={[styles.container, { width: '100%', height:'100%' }]}>
      {/* <Text>Home</Text>
      <StatusBar style="auto" />
      <Button
        title="About"
        icon={{
          name: 'home',
          type: 'font-awesome',
          size: 15,
          color: 'white',
        }}
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={{
          backgroundColor: 'rgba(90, 154, 230, 1)',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() =>
          navigation.navigate('Sub-map', {isDefault: false})
        }
      /> */}
      <StatusBar style="auto" />
      <MainMap navigation={navigation} route={route} ></MainMap>
    </View>
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