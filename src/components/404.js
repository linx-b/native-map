import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';

export default function NotFound({image}) {
  return (
    <View style={styles.container}>
      <Image
        source={image}
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