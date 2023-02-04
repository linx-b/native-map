import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import SVGComponent from '../../components/Demo'

export default function SubMapScreen({navigation, route}) {
  return (
    <View style={[styles.container, { width: '100%', height:'100%' }]}>
      <SVGComponent navigation={navigation} route={route}>
      </SVGComponent>
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