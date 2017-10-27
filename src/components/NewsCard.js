import React from 'react'
import {StyleSheet, Text, TouchableOpacity, Linking, Share} from 'react-native'

const NewsCard = (props) => {
	const {styleCard, styleText} = styles

	return (
		<TouchableOpacity
			onPress={() => Linking.openURL(props.entry.link)}
			onLongPress={() => Share.share({
				message: props.entry.title,
				url: props.entry.link,
				title: props.entry.title
			}, {
				// Android only:
				dialogTitle: props.entry.title,
			})}
			style={styleCard}
		>
			<Text	style={styleText}>
				{props.entry.title}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	styleCard: {
		borderRadius: 2,
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		backgroundColor: 'lightgrey',
		borderColor: 'grey',
		borderWidth: 1,
		flex: 1,
		justifyContent: 'center',
		padding: 8,
	},
	styleText: {
		fontSize: 16,
	},
})

export default NewsCard