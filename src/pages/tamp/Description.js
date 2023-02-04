import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useState } from 'react';
import { Input, FAB } from '@rneui/themed';

export default function Description({ navigation }) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={[styles.containerImage, styles.bgColor]}>
            <ImageBackground
              source={require('../images/building.png')}
              style={{width: 300, height: 300}}
            >
              <TouchableOpacity  
                onPress={() =>
                  alert("building")
                }
              >
                <Image
                  source={require('../images/kenny.jpg')}
                  style={[styles.marker, {width: 75, height: 75}]}
                ></Image>
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={[styles.containerText, styles.bgColor, styles.mt16]}>
            <Text>Description</Text>
          </View>
          <View style={[styles.containerInput, styles.bgColor, styles.mt16]}>
            <Input></Input>
          </View>
        </ScrollView>
        <FAB 
          onPress={() =>
            navigation.navigate('Marker')
          }
          placement="left"
          size='large'
          icon={{ name: 'place', color: 'white' }}
        ></FAB>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#B5D5C5',
      // alignItems: 'center',
    },
    bgColor: {
      backgroundColor: '#F5F5DC',
    },
    mt16: {
      marginTop: 16,
    },
    containerImage: {
      borderRadius: 6,
      padding: 16,
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
      left: "65%",
    },
  });