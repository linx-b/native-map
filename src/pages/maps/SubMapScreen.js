import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native'
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
import SubMap from 'components/SubMap'
import NotFound from 'components/404'


export default function SubMapScreen({navigation, route}) {
  const { available, fid } = route.params
  const [data, setData] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {

      const buildings = await getDocs(collection(db, 'maps', fid , 'buildings'))
      const _query = query(collection(db, 'mapping'), where('fid', '==', fid))
      const markers = await getDocs(_query)

      const _data = []

      buildings.forEach(b => {
        let marker = null
        markers.forEach(m => {
          const { bid } = m.data()
          marker = marker || (bid === b.id && { id: m.id, ...m.data()})
        })

        const d = {
          id: b.id,
          ...b.data(),
          marker: marker || null,
        }
        
        _data.push(d)

      })

      setData(_data)
      
      // await _bs.then(querySnapshot => {
      //   querySnapshot.forEach((doc) => {
      //     console.log(doc.id, '=>', doc.data())
      //     bs.push({id: doc.id, ...doc.data()})
      //     setBuildings(bs)
      //   })
      // })
      // await _marker.then(querySnapshot => {
      //   console.log('marker')
      //   querySnapshot.forEach((doc) => {
      //     console.log(doc.id, '=>', doc.data())
      //     mks.push({...doc.data()})
      //     setMarkers(mks)
      //   })
      // })
      
    })
    return unsubscribe;
  }, [navigation])

  if(!available) {
    return (
      <>
        <NotFound></NotFound>
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