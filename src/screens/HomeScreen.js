import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Button, AsyncStorage} from 'react-native'

class HomeScreen extends Component {
	state = {feeds: [], feedsDetails: [{title: 'title',link: 'link'}]}

	static navigationOptions = ({ navigation }) => ({
		// title: `Home ${navigation.state.params.newFeed}`,


		headerRight: <TouchableOpacity onPress={() => navigation.navigate('Add')}>
			{/*<Icons name="ios-car" size={28} color="white" />*/}
			<Text>Add</Text>
		</TouchableOpacity>,
	})

	componentDidMount() {
		try {
			AsyncStorage.getItem('RSSListData')
				.then(JSON.parse).then(feeds => {
						console.log(feeds)
						this.setState({feeds})
						console.log('super new state ',this.state)
					}
				)
		} catch (error) {
			console.log('saveRSSLocally error ' + error)
		}
	}

	renderFeeds() {
		return this.state.feeds.map(entry =>
			<View>
				<Text key={entry.feedInf.fTitle}>{entry.feedInf.fTitle}</Text>
				<Text key={entry.feedInf.fLink}>{entry.feedInf.fLink}</Text>
				<Text key={entry.feedInf.fDescription}>{entry.feedInf.fDescription}</Text>
				<Text key={entry.feedInf.fImage}>{entry.feedInf.fImage}</Text>
			</View>

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
					{/*// onPress={() => navigate('Selected', { user: 'Lucy' })}*/}
					 // onPress={this.fetchRSS.bind(this)}
					title="Chat with Lucy"
				/>
				{this.renderFeeds()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	styleTop: {},
})

export default HomeScreen