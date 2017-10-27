import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Linking, FlatList, Share} from 'react-native'
import {DOMParser} from 'xmldom'
import NewsCard from '../components/NewsCard'

class SelectedScreen extends Component {
	state = {
		url: this.props.navigation.state.params.entry.url,
		news: []
	}

	static navigationOptions = ({navigation}) => ({
		title: `${navigation.state.params.entry.feedInf.fTitle}`,
	});

	componentDidMount() {
		console.log('SelectedScreen DidMount')
		this.fetchRSS()
	}
	// fetches xml data from url
	async fetchRSS() {
		await fetch(this.state.url)
			.then(response => response.text())
			.then((responseText) => {
				this.parseDetails(responseText)
			}).catch((err) => {
				console.log('fetch', err)
			})
	}

	// Parses xml file and get's required data
	parseDetails(responseText) {
		let doc = new DOMParser().parseFromString(responseText, 'url/xml');
		let objs = []
		let titles = doc.getElementsByTagName('title');
		let dates = doc.getElementsByTagName('pubDate');
		let links = doc.getElementsByTagName('link');
		let descriptions = doc.getElementsByTagName('description');
		let videos = doc.getElementsByTagName('yt:videoId');
		let thumbs = doc.getElementsByTagName('media:thumbnail');
		for (let i = 1; i < dates.length; i++) {
			objs.push({
				title: titles[i + 1].childNodes[0].nodeValue,
				date: dates[i].childNodes[0].nodeValue,
				link: links[i + 1].childNodes[0].nodeValue,
				description: descriptions[i].childNodes[0].nodeValue,
			})
		}
		this.setState({news: objs});
		console.log('updated Video state:', this.state)
	}

	renderNews() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.news}
					renderItem={({item}) => (
						<NewsCard entry={item}/>
					)}
				/>
			</View>
		)
	}

	render() {
		// const {} = styles
		return (
			<View style={{flex: 1}}>
				{this.renderNews()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
})

export default SelectedScreen