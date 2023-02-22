import { useContext, useState } from 'react'
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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validate, setValidate] = useState(false)
  const { signIn } = useContext(Contex)

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
          resizeMode="contain"
          source={require('src/images/logo.png')}
          style={{width: 225, height: 175}}
        />
      </View>
      <View style={[{ paddingHorizontal: 30}]}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          onChangeText={newText  => setEmail(newText)}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, {marginBottom: 20}]}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={newText=> setPassword(newText)}
          value={password}
        />
        {
          validate && <Text style={{textAlign: 'center', color: 'red', marginBottom: 10}}>Email or password incorrect!</Text>
        }
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
          onPress={async () => {
            const res = await signIn({ username: email, password: password })
            setValidate(!res)
          }}
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
    borderColor: "gray",
  }
});