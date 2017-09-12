import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Button} from 'react-native'

class HomeScreen extends Component {
	state = {}

	static navigationOptions = ({ navigation }) => ({
		title: `Home ${navigation.state.params.newFeed}`,

		// ({navigation}) => ({
		headerRight: <TouchableOpacity onPress={() => navigation.navigate('Add')}>
			{/*// 		headerRight: <TouchableOpacity onPress={() => NativeModules.ActivityStarter.navigateToExample2()}>*/}
			{/*<Icons name="ios-car" size={28} color="white" />*/}
			<Text>Click</Text>
		</TouchableOpacity>,
	})

	render() {
		const {} = styles
		const {navigate} = this.props.navigation
		return (
			<View>
				<Button
					onPress={() => navigate('Selected', { user: 'Lucy' })}
					title="Chat with Lucy"
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	styleTop: {},
})

export default HomeScreen