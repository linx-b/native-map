import { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import { 
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Divider } from '@rneui/themed'

import { collection, doc, getDocs, getDoc, query, where, } from "firebase/firestore"; 
import db from 'database/firebase'

import _b from 'util/building'
import markers  from 'util/markers'

import AuthContext from '../auth/context';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    image: 'kenny.jpg',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    image: 'kenny.jpg',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'kenny.jpg',
  },
];

function Card({navigation, building}) {
  console.log('Card =>', building)
  const { data } = building
  const { marker } = data
  return (
    <TouchableOpacity onPress={() =>navigation.navigate('Detail', building)}>
      <View style={styles.item}>
        <ImageBackground
          resizeMode="contain"
          style={[styles.image, { alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'flex-end'}]}
          source={_b[data?.src]}
        >
          <Image
            source={markers[marker.msrc]}
            style={[{width: 75, height: 75, marginBottom: 20}]}
          ></Image>
        </ImageBackground>
        <Text style={[styles.title, styles.description]}>{data?.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function Profile({navigation, route}) {
  const { signOut } = useContext(AuthContext)
  const [buildings, setBuildings] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetch = async () => {
      const uid = await AsyncStorage.getItem('uid')
      await getDoc(doc(db, 'users', uid)).then(snapshot => {
        console.log('user =>', snapshot.data())
        setUser(snapshot.data())
      })
    }

    fetch()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const uid = await AsyncStorage.getItem('uid')
      const _query = query(collection(db, 'mapping'), where('uid', '==', uid))
      await getDocs(_query).then(async snapshot => {
        let _buildings = []
        for(const element of snapshot.docs) {
          const { fid, bid } = element.data()
          await getDoc(doc(db, 'maps', fid, 'buildings', bid)).then(document => {
            if(document.exists()) {
              _buildings.push({
                fid: fid,
                data: {
                  id: document.id,
                  ...document.data(),
                  marker: {
                    id: element.id,
                    ...element.data()
                  }
                }
              })
            }
          })
        }
        setBuildings(_buildings)
      })
    })

    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <View  style={[ styles.card, {marginTop: 40, marginBottom: 20,}]}>
        <View style={{ alignSelf: 'center', marginRight: 10,}}>
          <Image
            resizeMode="contain"
            source={require('src/images/person.png')}
            style={styles.imageProfile}
          />
        </View>
        <View style={{flex: 1}}>
          <View>
            <Text style={[styles.titleText]}>{user.fname}</Text>
            <Text style={[styles.titleText]}>{user.lname}</Text>
            <Divider />
            <Text style={styles.subTitleText}>{user.email}</Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-evenly',}}>
            <Button
              title="Edit"
              icon={{
                name: 'edit',
                type: 'font-awesome',
                size: 13,
                color: 'white',
              }}
              size="md"
              buttonStyle={{
                backgroundColor: 'rgba(199, 43, 98, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 10,
              }}
            />
            <Button
              title="Log Out"
              size="md"
              // icon={{
              //   name: 'arrow-right',
              //   type: 'font-awesome',
              //   size: 13,
              //   color: 'white',
              // }}
              buttonStyle={{
                backgroundColor: 'rgba(199, 43, 98, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 10,
              }}
              onPress={() => signOut()}
            />
          </View>
        </View>
      </View>
      <Divider />
      {
        buildings ? (
          <View style={{flex: 1}}>
            <FlatList
              data={buildings}
              renderItem={({item}) => <Card building={item} navigation={navigation} />}
              keyExtractor={item => item.data.id}
            />
          </View>
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
      }
      {/* <Button
        title="Sign Out"
        icon={{
          name: 'sign-out',
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
        onPress={() => signOut()}
      /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    height: 190,
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: '#BFACE2',
    borderRadius: 20,
  },
  imageProfile: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  titleText: {
    color: '#ECF9FF',
    fontSize: 25,
    marginVertical: 2,
    fontWeight: 'bold',
  },
  subTitleText: {
    color: '#ECF9FF',
    fontSize: 14,
  },

  item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginVertical: 10,
    // marginHorizontal: 16,
    borderRadius: 12,
  },
  image: {
    flex: 2,
    width: 100,
    height: 110,
  },
  description: {
    flex: 4
  },
  title: {
    fontSize: 18,
  },
});