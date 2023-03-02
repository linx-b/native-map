import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchBar, Button, Divider } from '@rneui/themed'
import { 
  collection,
  collectionGroup,
  orderBy, 
  startAt, 
  endAt,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  QuerySnapshot
} from "firebase/firestore"
import db from 'database/firebase'

import buildings from 'util/building'

import Modal from 'components/SearchModal'

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
  const { data } = building
  return (
    <TouchableOpacity onPress={() =>navigation.navigate('Detail', building)}>
      <View style={styles.item}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={buildings[data?.src]}
        />
        <Text style={[styles.title, styles.description]}>{data?.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

function getFaculty() {
  const _query = query(collection(db, 'maps'))
  return getDocs(_query)
}

async function findByName(name) {
  const _query1 = query(collectionGroup(db, 'buildings'), orderBy('name'), startAt(name), endAt(name+'\uf8ff'))
  // const _query2 = query(collectionGroup(db, 'buildings'), orderBy('ename'), startAt(name), endAt(name+'\uf8ff'))
  const _name = await getDocs(_query1)
  // const _ename = await getDocs(_query2)
  return [..._name.docs]
}

function findByFaculty(fid) {
  const _query = query(collection(db, 'maps', fid, 'buildings'))
  return getDocs(_query)
}

async function getMapping(bid) {
  const uid = await AsyncStorage.getItem('uid')
  const _query = query(collection(db, "mapping"), where("bid", "==", bid), where("uid", "==", uid))
  return getDocs(_query)
}

export default function SearchScreen({navigation, route}) {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([])
  const [faculties, setFaculties] = useState([])
  const [visible, setVisible] = useState([false])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setItems([])
      setSearch('')
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    getFaculty().then(querySnapshot => {
      const data = []
      querySnapshot.forEach(doc => data.push({fid: doc.id, name: doc.data()?.name}))
      console.log('faculties =>', data)
      setFaculties(data)
    })
  }, [])

  const searching = (data) => {
    findByName(data).then(async (docs) => {
      const list = []
      for(const doc of docs) {
        const mapping = await getMapping(doc.id)
        list.push({
          fid: doc.ref
                  .parent
                  .parent
                  .id,
          data: {
            id: doc.id,
            ...doc.data(),
            marker: mapping.docs[0] ? {
              id: mapping.docs[0].id,
              ...mapping.docs[0].data()
            } : null
          }
        })
      
      }
      setItems(list)
    })
    // data ? setItem(DATA) : setItem([])
    
    // findByName(data).then(doc => {
    //   doc.forEach(doc => {
        
    //   })
    // })
  }

  const selectHandler = (keyword) => {
    findByFaculty(keyword).then(async buildings => {
      const list = []
      for(const doc of buildings.docs) {
        console.log('doc =>', doc.id, doc.data())
        const mapping = await getMapping(doc.id)
        list.push({
          fid: doc.ref
                  .parent
                  .parent
                  .id,
          data: {
            id: doc.id,
            ...doc.data(),
            marker: mapping.docs[0] ? {
              id: mapping.docs[0].id,
              ...mapping.docs[0].data()
            } : null
          }
        })
      }
      setItems(list)
    })
    setVisible(false)
  }

  // const goToDetail = async (building) => {
  //   const mappings = await getMapping(building.id)
  //   const _building = {
  //     ...building,
  //     marker: mappings.empty() ? null : mappings.docs[0]
  //   }
  //   navigation.navigate('Detail', { fid: building.fid, data: _building}) 
  // }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={styles.searchContainer}
      >
        <SearchBar
          containerStyle={{
            flex: 1,
          }}
          platform="android"
          placeholderTextColor="#888"
          cancelButtonTitle="Cancel"
          placeholder='Search'
          onChangeText={(newText) => setSearch(newText)}
          onSubmitEditing={() => searching(search)}
          // onClear={() => setItems([])}
          value={search}
        />
        <Button
          color={'#BA94D1'}
          containerStyle={{
            padding: 5,
          }}
          radius='md'
          icon={{
            name: 'tune',
            size: 25,
            color: 'white',
          }}
          onPress={() => setVisible(true)}
        />
      </View>
      <Divider />
      <View
        style={{
          padding: 5,
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
      </View>
      {
        items.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('src/images/search.png')}
              style={{width: 175, height: 175}}
            />
          </View>
        ) : (
          <View
            style={[styles.container,]}
          >
            <FlatList
              data={items}
              renderItem={({item}) => <Card building={item} navigation={navigation} />}
              keyExtractor={item => item.data.id}
            />
          </View>
        )
      }
      <Modal faculties={faculties} isVisible={visible} onClose={setVisible} onSelected={selectHandler}></Modal>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    padding: 5,
  },
  item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#BFACE2',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
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
