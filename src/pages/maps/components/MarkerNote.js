import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Input, FAB, Button } from '@rneui/themed';

export default function MarkerNote(prop) {
  return (
    <View style={styles.container}>
      <View style={styles.noteHeader}>
        <Text>some text</Text>
      </View>
      <View style={styles.noteFooter}>
        <Button
          
          icon={{
            
          }}
          containerStyle={{
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        />
      </View> 
      {/* <Text>Note</Text>
      <StatusBar style="auto" /> */}
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
  note: {
    borderRadius: 15,
  },
  noteHeader: {
    padding: 12,
    fontSize: 16
  },
  noteFooter: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});