import { 
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react';
import { Input, Button, Divider } from '@rneui/themed';

import { collection, addDoc, updateDoc , doc } from "firebase/firestore"; 
import db from 'database/firebase'

import markers from 'util/markers'
import buildings from 'util/building'


async function update(id, src, note) {
  return await updateDoc(doc(db, "mapping", id), {
    mnote: note,
    msrc: src
  })
}

async function add(data) {
  return await addDoc(collection(db, "mapping"), data)
}

export default function Marker({navigation, route}) {
  const { fid, building } = route.params
  const { marker } = building
  const [icon, setIcon] = useState(marker?.msrc || '')
  const [note, setNote] = useState(marker?.mnote || '')
  console.log('marker =>', building)
  useEffect(() => {

  }, [])

  const _updateDoc = async () => {
    console.log('Update =>')
    await update(marker.id, icon, note).then((res) => {
      Alert.alert("Update Successful", '', [
        {text: 'OK', onPress: () => navigation.navigate('Sub-map', {available: true, fid: fid})},
      ])
    })
  }

  const _addDoc = async () => {
    const uid = await AsyncStorage.getItem('uid')
    await add({
      bid: building.id,
      fid: fid,
      mnote: note,
      msrc: icon,
      notes: [],
      uid: uid //TODO: fect uid from storage
    }).then((res) => {
      Alert.alert("Add Successful", [
        {text: 'OK', onPress: () => navigation.navigate('Sub-map', {available: true, fid: fid})},
      ])
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 20, marginHorizontal: -16 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            onPress={() => setIcon('cafe')}
            style={styles.containerImage}
          >
            <Image
              resizeMode="contain"
              source={markers['cafe']}
              style={[{width: 150, height: 150, borderRadius: 150 / 2, backgroundColor: 'white'}]}
              
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIcon('book')}
            style={styles.containerImage}
          >
            <Image
              resizeMode="contain"
              source={markers['book']}
              style={[{width: 150, height: 150, borderRadius: 150 / 2, backgroundColor: 'white'}]}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIcon('food')}
            style={styles.containerImage}
          >
            <Image
              resizeMode="contain"
              source={markers['food']}
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
          source={buildings[building.src]}
          resizeMode="contain"
          style={[{width: '100%', flex: 1, alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'flex-end'}]}
        >
          <Image
            resizeMode="contain"
            source={markers[icon]}
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
          value={note}
          onChangeText={newText  => setNote(newText)}
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
          onPress={() => { marker ?  _updateDoc() : _addDoc() }}
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