import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SearchBar, Button, Divider, Overlay,  } from '@rneui/themed'

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

function Card({navigation, title}) {
  return (
    <TouchableOpacity onPress={() =>navigation.navigate('Detail', {code: 'NMLINX'})}>
      <View style={styles.item}>
        <Image
          style={styles.image}
          source={require('../../images/building.png')}
        />
        <Text style={[styles.title, styles.description]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function SearchScreen({navigation, route}) {
  const [search, setSearch] = useState("");
  const [item, setItem] = useState([])
  const [visible, setVisible] = useState([false])
  const updateSearch = (search) => {
    setSearch(search);
  };
  const searching = (data) => {
    data ? setItem(DATA) : setItem([])
  }

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
          onChangeText={updateSearch}
          onSubmitEditing={() => searching(search)}
          // onClear={() => setItem([])}
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
        item.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../../images/search.png')}
              style={{width: 175, height: 175}}
            />
          </View>
        ) : (
          <View
            style={[styles.container,]}
          >
            <FlatList
              data={DATA}
              renderItem={({item}) => <Card title={item.title} navigation={navigation} />}
              keyExtractor={item => item.id}
            />
          </View>
        )
      }
      <Modal isVisible={visible} onClose={setVisible}></Modal>
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
    fontSize: 32,
  },
});
