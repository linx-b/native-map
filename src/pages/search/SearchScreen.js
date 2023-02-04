import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  View, 
  Image, 
  ScrollView,
  FlatList, 
} from 'react-native';
import { SearchBar, Button, Divider, Overlay,  } from '@rneui/themed'

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

function Card({title}) {
  return (
    <View style={styles.item}>
      <Image
        style={styles.image}
        source={require('../../images/building.png')}
      />
      <Text style={[styles.title, styles.description]}>{title}</Text>
    </View>
  )
}

export default function SearchScreen({navigation, route}) {
  const [search, setSearch] = useState("");
  const [item, setItem] = useState([])
  // const [visible, setVisible] = useState(false);
  const updateSearch = (search) => {
    setSearch(search);
  };
  const searching = (data) => {
    data ? setItem(DATA) : setItem([])
  }
  // const toggleOverlay = () => {
  //   setVisible(!visible);
  // };
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <View
        style={{marginTop: 40}}
      >
        <SearchBar
          platform="android"
          placeholderTextColor="#888"
          cancelButtonTitle="Cancel"
          placeholder='Search'
          onChangeText={updateSearch}
          onSubmitEditing={() => searching(search)}
          // onClear={() => setItem([])}
          value={search}
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
        {/* <Button
          color={'#BA94D1'}
          style={{
            padding: 15,
          }}
          icon={{
            name: 'tune',
            size: 30,
            color: 'white',
          }}
          onPress={toggleOverlay}
        /> */}
        {/* <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={{ flex: 0.5, width: '80%'}}>
            <Text>Hello!</Text>
            <Text>
              Welcome to React Native Elements
            </Text>
          </View>
        </Overlay> */}
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
              renderItem={({item}) => <Card title={item.title} />}
              keyExtractor={item => item.id}
            />
          </View>
        )
      }
      {/* <View
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
      </View> */}
      {/* <View
        style={[styles.container,]}
      >
        <FlatList
          data={DATA}
          renderItem={({item}) => <Card title={item.title} />}
          keyExtractor={item => item.id}
        />
      </View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
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
