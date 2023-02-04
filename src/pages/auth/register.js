import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { Button, Divider } from '@rneui/themed'

export default function Register({navigation, route}) {
  return (
    <View style={styles.container}>
      <View style={[{ paddingHorizontal: 30}]}>
        <TextInput
          style={styles.input}
          placeholder='First Name'
          // onChangeText={onChangeText}
          // value={text}
        />
        <TextInput
          style={styles.input}
          placeholder='Last Name'
          // onChangeText={onChangeText}
          // value={text}
        />
        <TextInput
          style={styles.input}
          placeholder='Username'
          // onChangeText={onChangeText}
          // value={text}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          // onChangeText={onChangeText}
          // value={text}
        />
        <Divider style={{marginTop: 15}}/>
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
            marginTop: 25,
            width: '80%',
            marginVertical: 10,
            alignSelf: 'center'
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
      {/* <Text>About</Text>
      <Text>Code : sign-up</Text>
      <Button
        title="back"
        icon={{
          name: 'arrow-left',
          type: 'font-awesome',
          size: 15,
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
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => navigation.goBack()}
      /> */}
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