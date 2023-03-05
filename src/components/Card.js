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

export default function Card({data, image, handler, compo = <></>}) {
	const {ename, name } = data
	return (

		<View style={styles.card}>
			<View style={{flex: 3, alignItems: 'center'}}>
				<Image
					resizeMode="contain"
					style={[styles.image,]}
					source={image}
				/>
			</View>
			<View
				style={{flex: 4, alignItems: 'flex-start', justifyContent: 'center'}}
			>
				{compo}
				<TouchableOpacity 
					onPress={() => handler()}
					// style={{backgroundColor: 'blue'}}
				>
					{/* <View style={styles.description}> */}
						<Text style={[styles.header]}>{ename}</Text>
						<Text style={[styles.subHeader]}>{name}</Text>
					{/* </View> */}
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		// flexWrap: 'wrap',
		backgroundColor: '#F99417',
		paddingVertical: 10,
		marginVertical: 10,
		// marginHorizontal: 16,
		borderRadius: 12,
	},

	image: {
		// width: '100%',
		// height: 120,
		width: 120,
    height: 120,
	},

	description: {
		justifyContent: 'center',
	},

	header: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 20,
	},

	subHeader: {
    marginVertical: 5,
		color: 'white',
		fontSize: 16,
	}
})
