import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, 
  Text,
  View,
  ScrollView,
  ImageBackground
} from 'react-native';
import { Input, FAB, Button } from '@rneui/themed';

export default function About({navigation, route}) {
  return (
    <ScrollView style={styles.container}>
      {/* <Text>About</Text>
      <Text></Text> */}
      <StatusBar style="auto" />
      <View style={[styles.containerImage]}>
        <ImageBackground
          source={require('src/images/building/building30.png')}
          resizeMode="contain"
          style={[{width: '100%', height: 225, flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-end'}]}
        >
          <FAB
            style={{}}
            icon={{ name: 'edit', color: 'white' }}
            size="small"
            color="#F2921D"
          />
        </ImageBackground>
      </View>
      <View style={{backgroundColor: '#FFFBF5', borderRadius: 7, padding: 10, paddingVertical: 20}}>
        <View>
          <Input
            label="Name"
            inputStyle={{}}
          />
        </View>
        <View>
          <Input
            label="Name"
            inputStyle={{}}
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
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    // backgroundColor: '#F5EFE6',
    // alignItems: 'center',
  },
  containerImage: {
    borderRadius: 6,
    padding: 0,
    width: '100%',
    alignItems: 'center',
  },
});