import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { useEffect, useMemo, useState } from 'react'
import { Input, FAB, Button } from '@rneui/themed'

import { collection, addDoc, updateDoc , doc } from "firebase/firestore"; 
import db from 'database/firebase'

import Note from './components/Note'
import buildings from 'util/building'
import markers  from 'util/markers'

async function update(id, notes) {
  return await updateDoc(doc(db, "mapping", id), {
    notes: notes,
  })
}

async function add(data) {
  return await addDoc(collection(db, "mapping"), data)
}

export default function Description({ navigation, route }) {
  const { fid, data } = route.params
  const { marker } = data
  console.log('marker =>', marker)
  const [notes, setNotes] = useState(marker?.notes || [])
  const [text, setText] = useState('')

  const updateDoc = async () => {
    await update(marker.id, notes).then((res) => {
      Alert.alert("Update Successful")
    })
  }

  const addDoc = async () => {
    await add({
      bid: data.id,
      fid: fid,
      mnote: '',
      msrc: '',
      notes: notes,
      uid: 'i7wmi5dcHsf7FQhLh2Ws'
    }).then((res) => {
      Alert.alert("Add Successful")
    })
  }
  
  const noteHandler = useMemo(
    () => ({
      delete: (index) => {
        const n = [...notes]
        n.splice(index, 1)
        setNotes(n)
      },
      update: (index, text) => {
        const nextState = notes.map((c, i) => {
          if (i === index) {
            // Increment the clicked counter
            return text
          } else {
            // The rest haven't changed
            return c;
          }
        })
        setNotes(nextState)
      }
    }),[notes]
  )

  return (
    <View style={styles.container}>
      <ScrollView  showsVerticalScrollIndicator={false}>
        <View style={[styles.containerImage]}>
          <ImageBackground
            source={buildings[data.name]}
            resizeMode="contain"
            style={[{width: '100%', height: 225, flex: 1, alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'flex-end'}]}
          >
            {
              marker?.msrc ? (
                <TouchableOpacity  
                  onPress={() =>
                    alert("kenny")
                  }
                  onLongPress={() => alert("delete!!!")}
                >
                  <Image
                    source={markers[marker.msrc]}
                    style={[styles.marker, {width: 150, height: 150}]}
                  ></Image>
                </TouchableOpacity>
              ) : (<></>)
            }
          </ImageBackground>
        </View>
        <View style={[styles.containerText, styles.bgColor, styles.mt16]}>
          <Text>{ data.description }</Text>
        </View>
        <View style={[styles.containerInput, styles.bgColor, styles.mt16]}>
          <Input
            label="Note"
            onChangeText={newText  => setText(newText)}
            value={text}
            onSubmitEditing={() => { 
              setNotes([text, ...notes])
              setText('')
            }}
          />
        </View>
        {
          notes.map((note, index) => <Note key={index} body={note} index={index} hendler={noteHandler}/>)
        }
        <View style={{alignItems: 'center'}}>
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
            onPress={() => {
              marker ? updateDoc() : addDoc()
            }}
          />
        </View>
      </ScrollView>
      <FAB 
        onPress={() =>
          navigation.navigate('Marker', { marker: marker})
        }
        color="#BA94D1"
        placement="left"
        size='large'
        icon={{ name: 'place', color: 'white' }}
      ></FAB>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      // backgroundColor: '#F5EFE6',
      // alignItems: 'center',
    },
    bgColor: {
      backgroundColor: '#BFACE2',
    },
    mt16: {
      marginTop: 16,
    },
    containerImage: {
      borderRadius: 6,
      padding: 0,
      width: '100%',
      alignItems: 'center',
    },
    containerText: {
      flex: 1,
      padding: 16,
      borderRadius: 6,
      width: '100%',
      alignItems: 'center',
    },
    containerInput: {
      padding: 16,
      borderRadius: 6,
    },
    marker: {
      // position: 'absolute',
      // bottom: 0,
      // left: "65%",
    },
  });