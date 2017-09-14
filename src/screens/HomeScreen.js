import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Button, AsyncStorage} from 'react-native'
const parseString = require('react-native-xml2js').parseString

class HomeScreen extends Component {
	state = {feeds: [], feedsDetails: [{title: 'title',link: 'link'}]}

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
			AsyncStorage.getItem('RSSListKeys')
				.then(JSON.parse).then(feeds => {
						// return items.map(item =>
						console.log(feeds)
						return this.setState({feeds})
						// )
					}
				)
		} catch (error) {
			console.log('saveRSSLocally error ' + error)
		}
	}

	fetchRSS() {
		return this.state.feeds.map(entry =>
			fetch(entry)
				.then(response => response.text())
				.then((response) => {
					console.log('hello')
					parseString(response, function (err, result) {
						console.log(this.state.feedsDetails)
						console.log(result.feed.title.toString())
						let title = result.feed.title.toString()
					// 	// let description = result.feed.description.toString()
						let link = result.feed.link.toString()
						// let image = result.feed.image.toString()
						// let joinedState = this.state.feedsDetails.push({title, link})
						// this.setState({feedsDetails: joinedState})

						{/*<Text key={result.feed.title.toString()}>{result.feed.title.toString()}</Text>*/}
					})
				}).catch((err) => {
				console.log('fetch', err)
			})
		)
	}

	renderFeeds() {
		return this.state.feeds.map(entry =>
			<Text key={entry}>{entry}</Text>
		)
	}
	// ScrollView
// <TouchableOpacity>
// <Image
// source={{uri: video.thumbnail}}
// style={{height: 280}}
// resizeMode={Image.resizeMode.cover}
// />
// </TouchableOpacity>

	render() {
		const {} = styles
		const {navigate} = this.props.navigation
		console.log(this.state.feedsDetails)
		return (
			<View>
				<Button
					// onPress={() => navigate('Selected', { user: 'Lucy' })}
					 onPress={this.fetchRSS.bind(this)}
					title="Chat with Lucy"
				/>
				{this.renderFeeds()}
				{/*{this.fetchRSS()}*/}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	styleTop: {},
})

export default HomeScreen