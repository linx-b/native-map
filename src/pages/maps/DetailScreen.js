import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useMemo, useState } from 'react'
import { Input, FAB, Button, Divider } from '@rneui/themed'

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

async function deleteMarker(id) {
  return await updateDoc(doc(db, "mapping", id), {
    msrc: '',
    mnote: '',
  })
}

async function add(data) {
  return await addDoc(collection(db, "mapping"), data)
}

export default function Description({ navigation, route }) {
  const { fid, data } = route.params
  const { marker } = data

  console.log("in detail marker =>", marker)
  // const [m, setM] = useState(marker?.msrc || '')
  // const [marker, setMarker] = useState()
  // const [notes, setNotes] = useState(marker?.notes || [])
  // const [text, setText] = useState('')

  // const [m, setM] = useState()
  const [__marker, set__marker] = useState(null)
  const [notes, setNotes] = useState([])
  const [text, setText] = useState('')

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', async () => {
  //     set__marker(marker)
  //     setNotes(marker?.notes || [])
  //   })
  //   return unsubscribe
  // }, [navigation])

  useEffect(() => {
    console.log("TEST =>", marker)
    setNotes(marker?.notes || [])
    set__marker(marker)
  }, [marker])

  const updateDoc = async () => {
    await update(__marker?.id, notes).then((res) => {
      Alert.alert("Update Successful")
    })
  }

  const addDoc = async () => {
    const uid = await AsyncStorage.getItem('uid')
    await add({
      bid: data.id,
      fid: fid,
      mnote: '',
      msrc: '',
      notes: notes,
      uid: uid
    }).then((res) => {
      Alert.alert("Add Successful")
      set__marker({
        id: res.id,
        bid: data.id,
        fid: fid,
        mnote: '',
        msrc: '',
        notes: notes,
        uid: uid
      })
    })
  }

  const del = () => {
    Alert.alert('Warning', 'Delete this Marker', [
      {text: 'OK', onPress: () =>  deleteMarker(__marker?.id).then(() => {
        //FIXME: re-active ?
        // marker.msrc = ""
        // marker.mnote = ""
        set__marker({
          ...__marker,
          msrc: "",
          mnote: "",
        })
        // setM('')
      })},
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ])
  }

  const show = () => {
    Alert.alert('Note', __marker?.mnote)
  }
  
  const noteHandler = useMemo(
    () => ({
      delete: (index) => {
        const n = [...notes]
        n.splice(index, 1)
        setNotes(n)
      },
      update: (index, text) => {
        const nextState = notes?.map((c, i) => {
          if (i === index) {
            return text
          } else {
            return c;
          }
        })
        setNotes(nextState)
      }
    }),[notes]
  )
   // Linking.openURL(data.link)
  return (
    <View style={styles.container}>
      <ScrollView  showsVerticalScrollIndicator={false}>
        <View style={[styles.containerImage]}>
          <ImageBackground
            source={buildings[data.src]}
            resizeMode="contain"
            style={[{width: '100%', height: 225, flex: 1, alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'flex-end'}]}
          >
            {
              __marker?.msrc ? (
                <TouchableOpacity
                  onLongPress={() => del()}
                  onPress={() => show()}
                >
                  <Image
                    source={markers[__marker?.msrc]}
                    style={[styles.marker, {width: 150, height: 150}]}
                  ></Image>
                </TouchableOpacity>
              ) : (<></>)
            }
          </ImageBackground>
        </View>
        <View style={[styles.containerText, styles.bgColor, styles.mt16]}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
            <View>
              <Text style={styles.header}>{data.ename}({data.sname})</Text>
              <Text style={styles.header}>{data.name}</Text>
            </View>
            <FAB
              style={{ position: 'absolute', top: 0, right: 0}}
              icon={{ name: 'map', color: 'white' }}
              size="small"
              color="#DF2E38"
              onPress={() => Linking.openURL(data.link)}
            />
          </View>
          {/* <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
            <Text style={{marginRight: 'auto', fontWeight: 'bold', fontSize: 18}}>Description</Text>
            <FAB
              style={{marginLeft: 'auto'}}
              icon={{ name: 'map', color: 'white' }}
              size="small"
              color="#DF2E38"
              onPress={() => Linking.openURL(data.link)}
            />
          </View> */}
           <Divider width={1} color="white" style={{marginVertical: 5,}}></Divider>
          <View>
            <Text style={{marginRight: 'auto', fontWeight: 'bold', fontSize: 14, color: 'white'}}>Description</Text>
            <Text style={{color: 'white'}}>{ data.description }</Text>
          </View>
          {/* <Text>{ data.description }</Text> */}
        </View>
        <Divider style={{marginTop: 10}}></Divider>
        <View style={[styles.containerInput, styles.bgColor, styles.mt16]}>
          <Input
            label="Note"
            labelStyle={{color: 'white'}}
            inputContainerStyle={{borderColor: 'white', marginBottom: 0}}
            errorStyle={{display: 'none',}}
            containerStyle={{marginBottom: 10}}
            onChangeText={newText  => setText(newText)}
            value={text}
            onSubmitEditing={() => { 
              setNotes([text, ...notes])
              setText('')
            }}
          />
          <FAB
            style={{marginVertical: 2, backgroundColor: 'red', alignSelf: "flex-end"}}
            icon={{ name: 'add', color: 'white' }}
            size="small"
            onPress={() => {
              setNotes([text, ...notes])
              setText('')
            }}
          />
        </View>
        {
          notes.map((note, index) => <Note key={index + note} body={note} index={index} hendler={noteHandler}/>)
        }
        <View style={{alignItems: 'center', marginTop: 10}}>
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
            errorStyle={{
              
            }}
            onPress={() => {
              __marker ? updateDoc() : addDoc()
            }}
          />
        </View>
      </ScrollView>
      <FAB 
        onPress={() =>
          navigation.navigate('Marker', { fid: fid, building: {...data, marker: __marker}})
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
      marginTop: 12,
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
      // alignItems: 'center',
    },
    containerInput: {
      padding: 7,
      borderRadius: 7,
      marginBottom: 5,
    },
    marker: {
      // position: 'absolute',
      // bottom: 0,
      // left: "65%",
    },
    fColor: {
      color: 'white',
    },
    header: {
      color: 'white',
      marginRight: 'auto',
      fontWeight: 'bold',
      fontSize: 16
    }
    
  });