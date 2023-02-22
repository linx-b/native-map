import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';

export default function NotFound({navigation, route}) {
  return (
    <View style={styles.container}>
      <Image
        source={require('src/images/404.png')}
        style={{width: 325, height: 275}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});