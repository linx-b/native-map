import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,  } from 'react-native';
import { Input, FAB, Button, Divider } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useState } from 'react';

export default function Note({index, body, hendler}) {
  const [text, setText] = useState(body)
  const [edit, setEdit] = useState(false)

  const setDefaultText = () => setText(body)

  return (
    <View style={[styles.container, styles.note]}>
      <View style={styles.noteHeader}>
        <Text style={{fontSize: 20, color: 'white',  fontWeight: 'bold',}}>Note</Text>
        <TouchableOpacity 
          style={[styles.button, {marginLeft: 'auto'}]}
          onPress={() => hendler.delete(index)}
        >
          <Ionicons name="trash" size={24} color="white"/>
        </TouchableOpacity>
      </View>
      <Divider></Divider>
      <View style={styles.body}>
        {
          edit ? (
            <Input
              value={text}
              onChangeText={newText  => setText(newText)}
              onSubmitEditing={() => {
                hendler.update(index, text)
                setEdit(!edit)
              }}
              inputStyle={{
                fontSize: 15
              }}
            ></Input>
          ) : (
            <Text style={{fontSize: 15, color: 'white'}}>{body}</Text>
          )
        }
      </View>
      <View style={styles.noteFooter}>
        {
          !edit ? (
            <>
              <FAB
                style={styles.button}
                icon={{ name: 'edit', color: 'white' }}
                size="small"
                onPress={() => setEdit(!edit)}
              />
            </>
          ) : (
            <>
              <FAB
                style={styles.button}
                icon={{ name: 'save', color: 'white' }}
                size="small"
                onPress={() => {
                  hendler.update(index, text)
                  setEdit(!edit)
                }}
              />
              <FAB
                style={styles.button}
                icon={{ name: 'cancel', color: 'white' }}
                size="small"
                onPress={() => {
                  setDefaultText()
                  setEdit(!edit)
                }}
              />
            </>
          )
        }
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFACE2',
    marginVertical: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  note: {
    borderRadius: 12,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: 'white',
  },
  body: {
    padding: 12,
    // marginVertical: 15,
  },
  button: {
    marginHorizontal: 7,
  },
  noteFooter: {
    // backgroundColor: 'white',
    flexWrap: 'wrap',
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});