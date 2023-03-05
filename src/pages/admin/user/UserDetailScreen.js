import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useEffect } from 'react'
import { 
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import db from 'database/firebase'

import UserCard from 'components/UserCard'


// function Card({navigation, building}) {
//   console.log('Card =>', building)
//   const { data } = building
//   const { marker } = data
//   return (
//     <TouchableOpacity onPress={() =>navigation.navigate('Detail', building)}>
//       <View style={styles.item}>
//         <ImageBackground
//           resizeMode="contain"
//           style={[styles.image, { alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'flex-end'}]}
//           source={_b[data?.src]}
//         >
//           <Image
//             source={markers[marker.msrc]}
//             style={[{width: 75, height: 75, marginBottom: 20}]}
//           ></Image>
//         </ImageBackground>
//         <Text style={[styles.title, styles.description]}>{data?.name}</Text>
//       </View>
//     </TouchableOpacity>
//   )
// }


export default function UserDetailScreen({navigation, route}) {
  const { user } = route.params
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const _query = query(collection(db, 'mapping'), where('uid', '==', user.id))
      console.log('useEffect')
      getDocs(_query).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("mapping =>", doc.id, doc.data())
        })
      })
    })
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <UserCard user={user} detail={true}></UserCard>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});