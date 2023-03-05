import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, FlatList} from 'react-native'
import { useEffect, useState } from 'react'
import { 
  collection,
  getDocs,
} from "firebase/firestore"
import db from 'database/firebase'

import Card from 'components/Card'
import icon from 'util/icon'

export default function About({navigation, route}) {
  const [faculties, setFaculties] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getDocs(collection(db, "maps")).then((querySnapshot) => {
        const _faculties = []
        querySnapshot.forEach((faculty) => {
          _faculties.push({
            id: faculty.id,
            ...faculty.data()
          })
        })
        setFaculties(_faculties)
      })
    })
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={faculties}
        renderItem={({item}) => <Card data={item} handler={() => navigation.navigate('Buildings', { fid: item.id})} image={icon[item.src]}></Card>}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});