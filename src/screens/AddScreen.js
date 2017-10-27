import React, {Component} from 'react'
import {View, StyleSheet, Button, Text, AsyncStorage, Image} from 'react-native'
import {Sae} from 'react-native-textinput-effects'
import {FontAwesome} from '@expo/vector-icons'
import {DOMParser} from 'xmldom'

class AddScreen extends Component {
	state = {url: '', feedInf: {fTitle: '',fLink: '',fDescription: '',fImage: ''} }

	static navigationOptions = {
		title: 'Add new RSS feed',
	}

	// Parses xml file and get's required data
	parseDetails(responseText) {
		let doc = new DOMParser().parseFromString(responseText, 'url/xml');
		let fLink = ''
		let fDescription = ''
		let fImage = ''
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
		this.setState({feedInf: {fTitle: fTitle, fLink: fLink, fDescription: fDescription, fImage: fImage }});
		console.log('updated state:',this.state)
	}

	// fetches xml data from url
	async addFeed(url) {
		this.setState({url})
		await fetch(url)
			.then(response => response.text())
			.then((responseText) => {
				this.parseDetails(responseText)
			}).catch((err) => {
				console.log('fetch', err)
			})
	}

	// Saves RSS data to local storage and then navigates to home screen
	async saveRSSLocally() {
		try {
			await AsyncStorage.getItem('RSSListData')
				.then(keys => {
					keys = keys === null ? [] : JSON.parse(keys)
					keys.push(this.state)
					return AsyncStorage.setItem('RSSListData', JSON.stringify(keys))
				})
		} catch (error) {
			console.log('saveRSSLocally error ' + error)
		}
		this.props.navigation.navigate('Home', {newFeed: this.state.url})
	}

	render() {
		const {styleCard, styleImage, styleText, styleTitle, styleDescription, textInput} = styles
		return (
			<View >
				<Sae
					label={'Paste your RSS link here'}
					iconClass={FontAwesome}
					iconName={'pencil'}
					iconColor={'green'}
					inputStyle={textInput}
					onChangeText={(url) => this.addFeed(url)}
				/>
				<Button
					onPress={() => this.saveRSSLocally()}
					title="Add feed"
					color="#841584"
				/>
				<View style={styleCard} >
					<Image resizeMode="contain" source={{uri: this.state.feedInf.fImage}} style={styleImage}/>
					<View style={styleText}>
						<Text style={styleTitle}>{this.state.feedInf.fTitle}</Text>
						<Text style={styleDescription}>{this.state.feedInf.fDescription}</Text>
						<Text>{this.state.feedInf.fLink}</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	textInput: {
		color: '#000000',
	},
	styleCard: {
		flex: 1,
		justifyContent: 'space-between',
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
	},
	styleImage: {
		width: 400,
		height: 100,

	},
	styleText: {
		marginLeft: 5,
		marginTop: 5,
		marginBottom: 5,
	},
	styleTitle: {

		fontWeight: 'bold',
	},
	styleDescription: {
		marginTop: 10,
		marginBottom: 10,
	},
})

export default AddScreen