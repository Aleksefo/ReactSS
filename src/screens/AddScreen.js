import React, {Component} from 'react'
import {View, StyleSheet, Button, TextInput, Text, AsyncStorage} from 'react-native'
import {Sae} from 'react-native-textinput-effects'
import {FontAwesome} from '@expo/vector-icons'
import {DOMParser} from 'xmldom'

class AddScreen extends Component {
	state = {url: '', feedInf: {fTitle: '',fLink: 'link',fDescription: '',fImage: ''} }

	static navigationOptions = {
		title: 'Add new RSS feed',
	}

	parseVideos(responseText) {
		let doc = new DOMParser().parseFromString(responseText, 'url/xml');
		let fLink = ''
		let fDescription = ''
		let fImage = ''
		// console.log("doc: %O", doc)
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
		// feedInf.push(
		// 		// id: videos[i].textContent,
		// 		// thumbnail: thumbs[i].getAttribute('url')
		// 		fTitle,
		// 		fLink,
		// 		fDescription,
		// 		fImage
		//
		// 	)
		// }
		// this.setState({fTitle});
		this.setState({feedInf: {fTitle: fTitle, fLink: fLink, fDescription: fDescription, fImage: fImage }});
		console.log('updated state:',this.state)
	}

	async addFeed() {
		await fetch(this.state.url)
			.then(response => response.text())
			.then((responseText) => {
				this.parseVideos(responseText)
				this.saveRSSLocally()
			}).catch((err) => {
				console.log('fetch', err)
			})
	}

	async saveRSSLocally() {
		try {
			await AsyncStorage.getItem('RSSListData')
				.then(keys => {
					keys = keys == null ? [] : JSON.parse(keys)
					keys.push(this.state)
					return AsyncStorage.setItem('RSSListData', JSON.stringify(keys))
				})
		} catch (error) {
			console.log('saveRSSLocally error ' + error)
		}
		this.props.navigation.navigate('Home', {newFeed: this.state.url})
	}
	
	render() {
		// const {} = styles
		// const {navigate} = this.props.navigation
		// console.log('render: ',this.state.feedInf)
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
					onChangeText={(url) => this.setState({url})}
				/>

				<Button
					// onPress={() => navigate('Home', {newFeed: this.state.url})}
					onPress={() => this.addFeed()}
					title="Add feed"
					color="#841584"
				/>
				<Button
					// onPress={() => navigate('Selected', { user: 'Lucy' })}
					onPress={() => this.fetchRSS()}
					title="Chat with Lucy"
				/>
				<Text>{this.state.url}</Text>
				<Text>{this.state.fTitle}</Text>
				<Text>{this.state.feedInf.fLink}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	styleTop: {},
})

export default AddScreen