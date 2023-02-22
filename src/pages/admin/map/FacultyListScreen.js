import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Card from 'components/Card'
import icon from 'util/icon'

export default function About({navigation, route}) {
  const data1 = {header: 'Faculty of Science', subHeader: 'คณะวิทย์', src: icon['science']}
  const data2 = {header: 'Faculty of agriculture', subHeader: 'คณะเกษตร', src: icon['agriculture']}
  const handler = () => navigation.navigate('Buildings', {faculty: 'xxx'})

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Card data={data1} handler={handler}></Card>
      <Card data={data2} handler={handler}></Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});