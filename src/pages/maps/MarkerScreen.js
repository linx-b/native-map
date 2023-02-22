import { 
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { useState } from 'react';
import { Input, FAB, Button, Divider } from '@rneui/themed';
import markers from 'util/markers'
import building from 'util/building'

const _m = ['cafe', 'book', 'food']

export default function Marker({_building}) {
  const [marker, setMarker] = useState('cafe')
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 20, marginHorizontal: -16 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            onPress={() => setMarker('cafe')}
            style={styles.containerImage}
          >
            <Image
              resizeMode="contain"
              source={markers['cafe']}
              style={[{width: 150, height: 150, borderRadius: 150 / 2, backgroundColor: 'white'}]}
              
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMarker('book')}
            style={styles.containerImage}
          >
            <Image
              resizeMode="contain"
              source={require('src/images/marker/book.png')}
              style={[{width: 150, height: 150, borderRadius: 150 / 2, backgroundColor: 'white'}]}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMarker('food')}
            style={styles.containerImage}
          >
            <Image
              resizeMode="contain"
              source={require('src/images/marker/food.png')}
              style={[{width: 150, height: 150, borderRadius: 150 / 2, backgroundColor: 'white'}]}
            ></Image>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold',}}>Marker</Text>
      </View>
      <Divider></Divider>
      <View style={{ width: '100%', height: 175, marginBottom: 5}}>
        <ImageBackground
          source={building['building30']}
          resizeMode="contain"
          style={[{width: '100%', flex: 1, alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'flex-end'}]}
        >
          <Image
            resizeMode="contain"
            source={markers[marker]}
            style={[{width: 150, height: 150 }]}
          ></Image>
        </ImageBackground>
      </View>
      <View style={{width: '100%', marginTop: 7}}>
        <Input
          label="Note"
          placeholder='marker note'
          multiline
          numberOfLines={4}
        />
      </View>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Button
          title="Save"
          icon={{
            name: 'save',
            type: 'material',
            size: 20,
            color: 'white',
          }}
          iconContainerStyle={{ marginRight: 10 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: '#BFACE2',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            // marginHorizontal: 50,
            marginVertical: 10,
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      // backgroundColor: '#B5D5C5',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    containerImage: {
      marginHorizontal: 3

    }
  });