import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Modal,
  TouchableOpacity
} from 'react-native';
import { CheckBox, Button } from '@rneui/themed';

export default function SearchModal({faculties, isVisible, onClose, onSelected}) {
  const [selectedIndex, setIndex] = useState('');

  // const faculties = ['None', 'Agriculture', 'Architecture', 'Fine Art', 'Education', 'humanities', 'Science']

  return (
    <Modal 
      animationType="fade"
      // animationInTiming={1}
      // animationOutTiming={1}
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose(false)}
    >
      <TouchableOpacity style={styles.modalContainer} onPress={() => onClose(false)}>
        <TouchableOpacity activeOpacity={1} style={styles.container}>
          <View>
            <Text>Filter</Text>
          </View>
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <View>
              {
                faculties.map(faculty => {
                  return <CheckBox
                    key={faculty.fid}
                    title={faculty.name}
                    checked={selectedIndex === faculty.fid}
                    onPress={() => { 
                      selectedIndex === faculty ? setIndex('') : setIndex(faculty.fid)
                    }}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                })
              }
            </View>
          </ScrollView>
          <View style={{ alignItems: 'flex-end' }}>
            <Button
              style={{width: 60}}
              color={'#BA94D1'}
              containerStyle={{
                padding: 5,
                width: '23%',
              }}
              radius='md'
              icon={{
                name: 'search',
                size: 25,
                color: 'white',
              }}
              onPress={() => {
                setIndex('')
                onSelected(selectedIndex)
              }}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.8)'
  },
  container: {
    height: '45%',
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    padding: 15,
    position: 'absolute',
    bottom: 0,
  },

});