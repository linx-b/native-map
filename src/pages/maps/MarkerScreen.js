import { 
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { Input, FAB, Button } from '@rneui/themed';

export default function Marker() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{height: '35%', marginBottom: 15}}>
          <ScrollView horizontal={true}>
            <View style={styles.containerImage}>
              <Image
                source={require('../../images/kenny.jpg')}
                style={[{width: 150, height: 150}]}
              ></Image>
            </View>
            <View style={styles.containerImage}>
              <Image
                source={require('../../images/kenny.jpg')}
                style={[{width: 150, height: 150}]}
              ></Image>
            </View>
            <View style={styles.containerImage}>
              <Image
                source={require('../../images/kenny.jpg')}
                style={[{width: 150, height: 150}]}
              ></Image>
            </View>
          </ScrollView>
        </View>
        <View>
          <Text>Marker</Text>
        </View>
        <View style={{width: '100%'}}>
          <Input
            placeholder='marker note'
            multiline
            numberOfLines={8}
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
              backgroundColor: 'rgba(90, 154, 230, 1)',
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
      backgroundColor: '#B5D5C5',
      alignItems: 'center',
      // justifyContent: 'center',
    },
    containerImage: {
      margin: 10,
    }
  });