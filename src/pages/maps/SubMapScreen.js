import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react';
import { 
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import db from 'database/firebase'
import SubMap from 'components/SubMap'
import NotFound from 'components/404'


export default function SubMapScreen({navigation, route}) {
  const { available, fid } = route.params
  const [data, setData] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const uid = await AsyncStorage.getItem('uid') 
      const buildings = await getDocs(
        query(
          collection(db, 'maps', fid , 'buildings'),
          where('del', '==', false)
        )
      )
      const _query = query(collection(db, 'mapping'), where('fid', '==', fid), where('uid', '==', uid))
      const markers = await getDocs(_query)

      const _d =  buildings.docs.map(building => {
        const marker = markers.docs.find(marker => marker.data().bid === building.id )
        return {
          id: building.id,
          ...building.data(),
          marker: marker?.id ? {id: marker?.id, ...marker?.data()} : null
        }
      })

      setData(_d)
      
    })
    return unsubscribe
  }, [navigation])

  if(!available) {
    return (
      <>
        <NotFound image={require('src/images/404.png')}></NotFound>
      </>
    )
  }
  return (
    <View style={[styles.container, { width: '100%', height:'100%' }]}>
      <SubMap navigation={navigation} fid={fid} data={data}>
      </SubMap>
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