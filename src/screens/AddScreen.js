import React, {Component} from 'react'
import {View, StyleSheet, Button, TextInput, Text, AsyncStorage} from 'react-native'
import {Sae} from 'react-native-textinput-effects'
import {FontAwesome} from '@expo/vector-icons'
import {DOMParser} from 'xmldom'

const parseString = require('react-native-xml2js').parseString

class AddScreen extends Component {
	state = {text: '', feedInf: []}

	static navigationOptions = {
		title: 'Add new RSS feed',
	}

	parseVideos(responseText) {
		console.log('Parsing the feed...')
		console.log("Got feed with length: " + responseText.length);
		console.log("responsetext: %O", responseText);
		let doc = new DOMParser().parseFromString(responseText, 'text/xml');
		let feedInf = [];
		let fLink = ''
		let fDescription = ''
		let fImage = ''
		console.log("doc: %O", doc)
		let fTitle = doc.getElementsByTagName("title")[0].childNodes[0].nodeValue
		try {
			fLink = doc.getElementsByTagName("uri")[0].childNodes[0].nodeValue
		} catch (error) {
			fLink = doc.getElementsByTagName("link")[0].childNodes[0].nodeValue
		}
		try {
			fDescription = doc.getElementsByTagName("description")[0].childNodes[0].nodeValue
		} catch (error) {
		}
		try {
			fImage = doc.getElementsByTagName("url")[0].childNodes[0].nodeValue
		} catch (error) {
		}
		let videos = doc.getElementsByTagName('yt:videoId');
		let thumbs = doc.getElementsByTagName('media:thumbnail');
		// for (let i=0; i < videos.length; i++) {
		feedInf.push({
				// id: videos[i].textContent,
				// thumbnail: thumbs[i].getAttribute('url')
				title: fTitle,
				link: fLink,
				description: fDescription,
				image: fImage
			})
		// }
		this.setState({title: fTitle});
		this.setState({feedInf: feedInf});
		console.log(this.state.feedInf)
	}


	async fetchRSS() {
		await fetch(this.state.text)
			.then(response => response.text())
			.then((responseText) => {
				this.parseVideos(responseText)
			}).catch((err) => {
				console.log('fetch', err)
			})
	}

	testShow() {
		let x = this.fetchRSS()
		console.log('Heres the : %O', x)
		let result = parseString(x, function (err, result) {
			// console.log(this.state.feedsDetails)
			// console.log(result.feed.title.toString())
			// let title = result.feed.title.toString()
			// 	// let description = result.feed.description.toString()
			// let link = result.feed.link.toString()
			// let image = result.feed.image.toString()
			// return [{title: 'title',link: 'link'}]

			return result

			// this.setState({feedsDetails: joinedState})
		})
		console.log('Heres the result')
		console.log(result)
	}


	async saveRSSLocally() {
		try {
			await AsyncStorage.getItem('RSSListKeys')
				.then(keys => {
					keys = keys == null ? [] : JSON.parse(keys)
					keys.push(this.state.text)
					return AsyncStorage.setItem('RSSListKeys', JSON.stringify(keys))
				})
			// await AsyncStorage.setItem('RSSListKey', this.state.text);
		} catch (error) {
			console.log('saveRSSLocally error ' + error)
		}
		console.log('saveRSSLocally keys: ', AsyncStorage.getItem('RSSListKeys'))
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
				<Button
					// onPress={() => navigate('Selected', { user: 'Lucy' })}
					onPress={() => this.fetchRSS()}
					title="Chat with Lucy"
				/>
				<Text>{this.state.text}</Text>
				{/*<Text>{this.state.feedInf}</Text>*/}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	styleTop: {},
})

export default AddScreen