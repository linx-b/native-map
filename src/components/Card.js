import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar'
import { 
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native'

export default function Card({navigation, data, handler}) {
	const {header, subHeader, src } = data
	return (
		<TouchableOpacity 
			onPress={() => handler()}
			style={{paddingHorizontal: 5}}
		>
			<View style={styles.card}>
				<View style={{flex: 3,}}>
					<Image
						resizeMode="contain"
						style={[styles.image,]}
						source={src}
					/>
				</View>
				<View style={styles.description}>
					<Text style={[styles.header]}>{header}</Text>
					<Text style={[styles.subHeader]}>{subHeader}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		// flexWrap: 'wrap',
		backgroundColor: '#F99417',
		padding: 10,
		marginVertical: 10,
		// marginHorizontal: 16,
		borderRadius: 12,
	},

	image: {
		width: '100%',
		height: 120,
	},

	description: {
		flex: 4,
		justifyContent: 'center',
	},

	header: {
		color: 'white',
		fontSize: 20,
	},

	subHeader: {
    marginVertical: 5,
		color: 'white',
		fontSize: 16,
	}
})
