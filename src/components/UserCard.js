import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Button, Divider } from '@rneui/themed'

export default function UserCard({navigation, user, detail, handler}) {
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
          <Text style={[styles.titleText]}>{user?.fname}</Text>
          <Text style={[styles.titleText]}>{user?.lname}</Text>
          <Divider />
          <Text style={styles.subTitleText}>{user?.email}</Text>
        </View>
        {
          !detail ? (<View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
            <Button
              title="delete"
              icon={{
                name: 'trash',
                type: 'font-awesome',
                size: 13,
                color: 'white',
              }}
              size="md"
              buttonStyle={{
                backgroundColor: 'rgba(199, 43, 98, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 10,
              }}
              onPress={() => {
                handler(user.id)
              }}
            />
          </View>) :
          (
            <Text style={[styles.subTitleText, { marginTop: 5 }]}>role: {user?.role}</Text>
          )
        }
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