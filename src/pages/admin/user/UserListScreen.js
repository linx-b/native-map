import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, } from 'react-native';

import UserCard from 'components/UserCard';

export default function UserListScreen({navigation, route}) {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
        <UserCard></UserCard>
      </TouchableOpacity>
      <UserCard></UserCard>
      <UserCard></UserCard>
      <UserCard></UserCard>
      <UserCard></UserCard>
      <UserCard></UserCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});