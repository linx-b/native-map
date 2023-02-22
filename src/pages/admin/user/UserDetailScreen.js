import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import UserCard from 'components/UserCard';

export default function UserDetailScreen({navigation, route}) {
  return (
    <View style={styles.container}>
      <UserCard></UserCard>
      <StatusBar style="auto" />
    </View>
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