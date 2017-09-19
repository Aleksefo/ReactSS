import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

class SelectedScreen extends Component {
	state = {}

	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.state.params.feedTitle}`,
	});

	render() {
		const {} = styles
		return (
	    <View></View>
		)
	}
}

const styles  = StyleSheet.create({
	styleTop: {
	},
})

export default SelectedScreen