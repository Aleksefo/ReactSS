import React from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'

const NewsCard = (props) => {
	const {styleCard, styleText, styleDate, styleDescription, styleImage} = styles
	let descr = 'No description provided'
	// if (props.feed.fDescription !== '') {
	// 	descr = props.feed.fDescription
	// }
console.log('entry props',props.entry)
	return (
		<View style={styleCard}>
			<Text style={styleText}>{props.entry.title}</Text>
			<Text style={styleDate}>{props.entry.date}</Text>
			{/*<Text>{props.entry.link}</Text>*/}
			{/*<Text>{props.entry.description}</Text>*/}
		</View>
	)
	// return (
	// 	<View style={styleCard}>
	// 		<View style={styleText}>
	// 			<Text style={styleTitle}>{props.feed.fTitle}</Text>
	// 			<Text style={styleDescription}>{descr}</Text>
	// 		</View>
	// 		<Image resizeMode="contain" source={{uri: props.feed.fImage}} style={styleImage}/>
	// 	</View>
	// )
}

const styles = StyleSheet.create({
	styleCard: {
		// flex: 1,
		// flexDirection: 'row',
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