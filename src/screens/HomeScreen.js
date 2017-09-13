import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Button, AsyncStorage} from 'react-native'

class HomeScreen extends Component {
	state = {text: []}

	static navigationOptions = ({ navigation }) => ({
		// title: `Home ${navigation.state.params.newFeed}`,

		// ({navigation}) => ({
		headerRight: <TouchableOpacity onPress={() => navigation.navigate('Add')}>
			{/*// 		headerRight: <TouchableOpacity onPress={() => NativeModules.ActivityStarter.navigateToExample2()}>*/}
			{/*<Icons name="ios-car" size={28} color="white" />*/}
			<Text>Click</Text>
		</TouchableOpacity>,
	})

	componentDidMount() {
		try {
			AsyncStorage.getItem('RSSListKey')
				.then(JSON.parse).then(text => {
						// return items.map(item =>
						console.log(text)
						return this.setState({text})
						// )
					}
				)
		} catch (error) {
			console.log('saveRSSLocally error ' + error)
		}
	}

	renderFeeds() {
		return this.state.text.map(entry =>
			<Text key={entry}>{entry}</Text>
		)
	}

	render() {
		const {} = styles
		const {navigate} = this.props.navigation
		return (
			<View>
				<Button
					onPress={() => navigate('Selected', { user: 'Lucy' })}
					title="Chat with Lucy"
				/>
				<Text>{this.state.text}</Text>
				{this.renderFeeds()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	styleTop: {},
})

export default HomeScreen