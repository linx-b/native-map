import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet, 
  View,
  ScrollView,
  ImageBackground,
  Alert,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { Input, FAB, Button, Divider } from '@rneui/themed'
import { 
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore"
import db from 'database/firebase'
import { useEffect, useState } from 'react'

import __building from 'util/building'

function Preview({onSelected, onClose}) {
  
  const images = [
    'custom1',
    'custom2',
    'custom3',
    'bio',
    'building30',
    'building40',
    'chemistry',
    'comp',
    'geology',
    'math',
    'physis1',
  ]

  return (
    <View style={{}}>
      <FlatList
        horizontal
        style={{paddingVertical: 10, marginBottom: 1}}
        data={images}
        renderItem={({item}) => {
          return <TouchableOpacity
                    onPress={() => onSelected(item)}
                    style={{marginHorizontal: 3}}
                  >
                    <View style={{padding: 12}}>
                      <ImageBackground
                        resizeMode="contain"
                        source={__building[item]}
                        style={[{width: 200, height: 200,}]}
                      />
                    </View>
                  </TouchableOpacity>
        }}
        keyExtractor={item => item}
      />
      {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ backgroundColor: 'red'}}>
        {
          images.map((image) => {
            return <TouchableOpacity
              onPress={() => onSelected(image)}
              style={{marginHorizontal: 3}}
            >
              <View style={{padding: 12}}>
                <ImageBackground
                  resizeMode="contain"
                  source={__building[image]}
                  style={[{width: 200, height: 200,}]}
                />
              </View>
            </TouchableOpacity>
          })
        }
      </ScrollView> */}
      <FAB
        style={{ alignSelf: 'flex-end', position: 'absolute', top: 10, right: 10}}
        icon={{ name: 'cancel', color: 'white' }}
        size="small"
        color="#F2921D"
        onPress={() => {
          onClose(false)
        }}
      />
    </View>
  )
}

function update(fid, bid, payload) {
  return updateDoc(doc(db, 'maps', fid, 'buildings', bid), payload)
}

export default function About({navigation, route}) {
  const { fid, bid } = route.params
  const [building, setBuilding] = useState({})
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      await getDoc(doc(db, 'maps', fid, 'buildings', bid)).then((document) => {
        if(document.exists()){
          console.log('Detail =>', document.id, document.data())
          setBuilding(document.data())
        }
      })
    }
    fetch()
  }, [])

  const  _update = () => {
    update(fid, bid, building).then(() => {
      Alert.alert("Update Successful")
    })
  }

  const onSelected = (image) => {
    setBuilding({...building, src: image})
    setEdit(false)
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      {
        edit ? (<Preview onSelected={onSelected} onClose={setEdit}/>) : (
          <View style={[styles.containerImage]}>
            <ImageBackground
              source={__building[building.src]}
              resizeMode="contain"
              style={[{width: '100%', height: 225, flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-end'}]}
            >
              <FAB
                style={{}}
                icon={{ name: 'edit', color: 'white' }}
                size="small"
                color="#F2921D"
                onPress={() => {
                  setEdit(true)
                }}
              />
            </ImageBackground>
          </View>
        )
      }
      <Divider width={1} style={{ marginVertical: 10 }} />
      <View style={{backgroundColor: '#FFFBF5', borderRadius: 7, padding: 10, paddingVertical: 20}}>
        <View>
          <Input
            label="English Name"
            inputStyle={{}}
            value={building.ename}
            onChangeText={(newText) => setBuilding({...building, ename: newText})}
          />
        </View>
        <View>
          <Input
            label="Name"
            inputStyle={{}}
            value={building.name}
            onChangeText={(newText) => setBuilding({...building, name: newText})}
          />
        </View>
        <View>
          <Input
            editable
            multiline
            numberOfLines={4}
            label="Description"
            inputStyle={{
              
            }}
            containerStyle={{
              // width: 200,
              // marginHorizontal: 50,
              // marginVertical: 10,
            }}
            value={building.description}
            onChangeText={(newText) => setBuilding({...building, description: newText})}
          />
        </View>
        <View style={{ alignItems: 'center'}}>
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
            onPress={() => _update()}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#F5EFE6',
    // alignItems: 'center',
  },
  containerImage: {
    backgroundColor: '#FFFBF5',
    borderRadius: 7,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
});