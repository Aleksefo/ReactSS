import React from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity, Linking, Share} from 'react-native'

const NewsCard = (props) => {
	const {styleCard, styleText, styleDate, styleDescription, styleImage} = styles
	console.log('entry props', props.entry)

	return (
		<View style={styleCard}>
			<TouchableOpacity
				onPress={() => Linking.openURL(item.link)}
				onLongPress={() => Share.share({
					message: props.entry.title,
					url: props.entry.link,
					title: props.entry.title
				})}
				style={{
					height: 60,
				}}
			>
				<View
					style={{
						backgroundColor: 'lightgrey',
						borderColor: 'grey',
						borderWidth: 1,
						flex: 1,
						justifyContent: 'center',
						padding: 8,
					}}
				>
					<Text
						style={{
							backgroundColor: 'transparent',
							color: 'black',
							fontSize: 16,
						}}
					>
						{props.entry.title}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	styleCard: {
		justifyContent: 'space-between',
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		backgroundColor: 'white',
	},
	styleText: {
		marginLeft: 5,
		marginTop: 5,
	},
	styleDate: {
		fontSize: 10,
		textAlign: 'right',
		marginRight: 5,
	},
	styleDescription: {},
	styleImage: {
		width: 100,
	},
})

export default NewsCard