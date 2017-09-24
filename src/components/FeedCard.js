import React from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'

const FeedCard = (props) => {
	const {styleCard, styleText, styleTitle, styleDescription, styleImage} = styles
	let descr = 'No description provided'
	if (props.feed.fDescription !== '') {
		descr = props.feed.fDescription
	}

	return (

			<View style={styleCard}>
				<View style={styleText}>
					<Text style={styleTitle}>{props.feed.fTitle}</Text>
					<Text style={styleDescription}>{descr}</Text>
				</View>
				<Image resizeMode="contain" source={{uri: props.feed.fImage}} style={styleImage}/>
			</View>


	)
}

const styles = StyleSheet.create({
	styleCard: {
		// flex: 1,
		flexDirection: 'row',
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
		// height: 50,
		backgroundColor: 'white',
	},
	styleText: {
		flex: 0.75,
		marginLeft: 5,
		marginTop: 5,
		marginBottom: 5,
	},
	styleTitle: {

		fontWeight: 'bold',
	},
	styleDescription: {},
	styleImage: {
		width: 100,
		flex: 0.25,

	},

})

export default FeedCard