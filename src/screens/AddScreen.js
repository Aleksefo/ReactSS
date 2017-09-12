import React, { Component } from 'react'
import {View, StyleSheet, Button, TextInput, Text} from 'react-native'
import {Sae} from 'react-native-textinput-effects'
import { FontAwesome } from '@expo/vector-icons'

class AddScreen extends Component {
	state = { text: 'Useless Placeholder' }

	static navigationOptions = {
		title: 'Add new RSS feed',
	}

	render() {
		const {} = styles
		const {navigate} = this.props.navigation
		return (
	        <View>
		        <Sae
			        label={'Paste your RSS link here'}
			        iconClass={FontAwesome}
			        iconName={'pencil'}
			        iconColor={'green'}
			        // TextInput props
			        autoCapitalize={'none'}
			        autoCorrect={false}
			        onChangeText={(text) => this.setState({text})}
		        />

		        <Button
			        onPress={() => navigate('Home', { newFeed: this.state.text })}
			        title="Add feed"
			        color="#841584"
		        />
		        <Text>{this.state.text}</Text>
	        </View>
		)
	}
}

const styles  = StyleSheet.create({
	styleTop: {
	},
})

export default AddScreen