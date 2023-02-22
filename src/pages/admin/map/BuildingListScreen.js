import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';

import Card from 'components/Card'
import building from 'util/building'

export default function About({navigation, route}) {
  useEffect(() => console.log("mounted"), [])
  const data = { header: 'วิทยาการคอมพิวเตอร์', subHeader: 'คณะวิทย์', src: building['comp'] }

  const handler = () => navigation.navigate('Detail', {building: 'building'})

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Card data={data} handler={handler}></Card>
      <Card data={data} handler={handler}></Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});