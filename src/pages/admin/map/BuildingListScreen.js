import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Alert, TouchableOpacity,} from 'react-native';
import { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { 
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore"
import db from 'database/firebase'

import Card from 'components/Card'
import __building from 'util/building'

function update(fid, bid) {
  return updateDoc(doc(db, 'maps', fid, 'buildings', bid), {
    del: true,
  })
}

// function DeleteButton(handler) {
//   return (
//     <FAB
//       style={{}}
//       icon={{ name: 'trash', color: 'white' }}
//       size="small"
//       color="#F2921D"
//     />
//   )
// }

export default function About({navigation, route}) {
  const { fid } = route.params
  const [buildings, setBuildings] = useState([])

  const deleteHandler = (bid, index) => {
    Alert.alert('Warning', 'Delete this building', [
      {text: 'OK', onPress: () =>  update(fid, bid).then(() => {
        const b = [...buildings]
        b.splice(index, 1)
        setBuildings(b)
      })},
      {
        text: 'Cancel',
        // onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
    // update(fid, bid).then(() => {
    //   Alert.alert('Update Successful')
    // })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getDocs(collection(db, 'maps', fid , 'buildings')).then((querySnapshot) => {
        const _buildings = []
        querySnapshot.forEach((building) => {
          console.log('building =>', building.id, building.data())
          if(building.data().del) {
            return
          }
          _buildings.push({
            id: building.id,
            ...building.data()
          })
        })
        setBuildings(_buildings)
      })
    })
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={buildings}
        renderItem={({item, index}) => 
          <Card 
            data={item} 
            handler={() => navigation.navigate('Detail', { fid: fid, bid: item.id})}
            image={__building[item.src]}
            compo={
              <TouchableOpacity 
                style={[{  position: 'absolute', top: 3, right: 15}]}
                onPress={() => deleteHandler(item.id, index)}
              >
                <Ionicons name="trash" size={24} color="white"/>
              </TouchableOpacity>
            }
          />}
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
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});