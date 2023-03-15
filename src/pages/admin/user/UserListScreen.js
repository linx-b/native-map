import { StatusBar } from 'expo-status-bar'
import { StyleSheet, ScrollView, Alert } from 'react-native'

import UserCard from 'components/UserCard'
import NotFound from 'components/404'
import { useEffect, useState } from 'react'

import { 
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore"
import db from 'database/firebase'

function deleteDoc(uid) {
  return updateDoc(doc(db, "users", uid), {
    del: true,
  })
}

export default function UserListScreen({navigation, route}) {
  const [users , setUsers] = useState([])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getDocs(
        query(
          collection(db, "users"),
          where('del', '!=', true)
        )
      ).then((querySnapshot) => {
        const _users = []
        querySnapshot.forEach((user) => {
          _users.push({
            id: user.id,
            ...user.data()
          })
        })
        setUsers(_users)
      })
    })
    return unsubscribe
  }, [navigation])

  const deleteHandler = (index, uid) => {
    Alert.alert('Warning', 'Delete this user ?', [
      {text: 'OK', onPress: () => deleteDoc(uid).then(() => {
        const n = [...users]
        n.splice(index, 1)
        setUsers(n)
      })},
      {
        text: 'Cancel',
        // onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  }

  if(!users.length) {
    return (<NotFound image={require('src/images/not_found.png')}></NotFound>)
  }
  
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      {
        users?.map((user, index) => user.role === 'USER' && <UserCard user={user} key={user.id} navigation={navigation} handler={(uid) => deleteHandler(index, uid)}></UserCard>)
      }
    </ScrollView>
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