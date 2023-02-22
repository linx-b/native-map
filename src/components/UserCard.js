import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Button, Divider } from '@rneui/themed'

export default function UserCard({navigation, route}) {
  return (
    <View style={[styles.container, styles.shadowColor]}>
      <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', marginRight: 10}}>
        <Image
          resizeMode="contain"
          source={require('src/images/person.png')}
          style={styles.imageProfile}
        />
      </View>
      <View style={{ flex: 1}}>
        <View>
          <Text style={[styles.titleText]}>Kenny</Text>
          <Text style={[styles.titleText]}>McCormick</Text>
          <Divider />
          <Text style={styles.subTitleText}>lilin.3x@gmail.com</Text>
        </View>
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: '#BFACE2',
    borderRadius: 20,
    marginVertical: 5,
  },
  titleText: {
    color: '#ECF9FF',
    fontSize: 25,
    marginVertical: 2,
    fontWeight: 'bold',
  },
  subTitleText: {
    color: '#ECF9FF',
    fontSize: 14,
  },
  shadowColor: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  }
});