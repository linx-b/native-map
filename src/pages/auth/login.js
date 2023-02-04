import { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { 
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image
} from 'react-native'
import { Button, Divider } from '@rneui/themed'

import Contex from './context'

export default function Login({navigation, route}) {
  const { signIn, signInAsAdmin } = useContext(Contex)
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Image
          source={require('../../images/search.png')}
          style={{width: 150, height: 150}}
        />
      </View>
      <View style={[{ paddingHorizontal: 30}]}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          // onChangeText={onChangeText}
          // value={text}
        />
        <TextInput
          style={[styles.input, {marginBottom: 20}]}
          placeholder='Password'
          // onChangeText={onChangeText}
          // value={text}
        />
        <Divider width={1}/>
        <Button
          title="Sign In"
          icon={{
            name: 'sign-in',
            type: 'font-awesome',
            size: 15,
            color: 'white',
          }}
          iconContainerStyle={{ marginRight: 10 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: '#A084DC',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            marginTop: 35,
            width: '80%',
            marginVertical: 10,
            alignSelf: 'center'
          }}
          onPress={() => signIn({ username: 'user', password: 'password' })}
        />
        <Text style={{textAlign: 'center'}}>OR</Text>
        <Button
          title="Sign Up"
          icon={{
            name: 'sign-in',
            type: 'font-awesome',
            size: 15,
            color: 'white',
          }}
          iconContainerStyle={{ marginRight: 10 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: '#A084DC',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: '80%',
            marginVertical: 10,
            alignSelf: 'center'
          }}
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF5',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    padding: 12,
    paddingHorizontal: 15,
  }
});