import React, {Component} from 'react'
import {FlatList} from 'react-native'
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
		this.fetchRSS()
	}
	// Fetches xml data from url
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
		let doc = new DOMParser().parseFromString(responseText, 'url/xml')
		let objs = []
		let titles = doc.getElementsByTagName('title')
		let dates = doc.getElementsByTagName('pubDate')
		let links = doc.getElementsByTagName('link')
		let descriptions = doc.getElementsByTagName('description')
		for (let i = 1; i < dates.length; i++) {
			objs.push({
				title: titles[i + 1].childNodes[0].nodeValue,
				date: dates[i].childNodes[0].nodeValue,
				link: links[i + 1].childNodes[0].nodeValue,
				description: descriptions[i].childNodes[0].nodeValue,
			})
		}
		this.setState({news: objs})
	}

	//Generates a list of Feeds from State array
	render() {
		return (
			<FlatList
				data={this.state.news}
				keyExtractor={(item, index) => index}
				renderItem={({item}) => (
					<NewsCard entry={item}/>
				)}
			/>
		)
	}
}

export default SelectedScreen