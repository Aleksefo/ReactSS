import React, {Component} from 'react'
import {View, StyleSheet, Button, TextInput, Text, AsyncStorage} from 'react-native'
import {Sae} from 'react-native-textinput-effects'
import {FontAwesome} from '@expo/vector-icons'

class AddScreen extends Component {
	state = {text: 'Useless Placeholder'}

	static navigationOptions = {
		title: 'Add new RSS feed',
	}

	async saveRSSLocally() {
		try {
			await AsyncStorage.getItem('RSSListKey')
				.then(keys => {
					keys = keys == null ? [] : JSON.parse(keys)
					keys.push(this.state.text)
					return AsyncStorage.setItem('RSSListKey', JSON.stringify(keys))
				})
			// await AsyncStorage.setItem('RSSListKey', this.state.text);
		} catch (error) {
			console.log('saveRSSLocally error ' + error)
		}
		console.log('saveRSSLocally keys: ', AsyncStorage.getItem('RSSListKey'))
		this.props.navigation.navigate('Home', {newFeed: this.state.text})
	}

	render() {
		const {} = styles
		// const {navigate} = this.props.navigation
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
					// onChangeText={(text) => this.setState({text})}
					onChangeText={(text) => this.setState({text})}
				/>

				<Button
					// onPress={() => navigate('Home', {newFeed: this.state.text})}
					onPress={() => this.saveRSSLocally()}
					title="Add feed"
					color="#841584"
				/>
				<Text>{this.state.text}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	styleTop: {},
})

export default AddScreen