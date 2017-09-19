import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import {DOMParser} from 'xmldom'

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

	async fetchRSS() {
		await fetch(this.state.url)
			.then(response => response.text())
			.then((responseText) => {
				this.parseVideos(responseText)
			}).catch((err) => {
				console.log('fetch', err)
			})
	}

	parseVideos(responseText) {
		let doc = new DOMParser().parseFromString(responseText, 'url/xml');
		let objs = []
		let titles = doc.getElementsByTagName('title');
		let dates = doc.getElementsByTagName('pubDate');
		let videos = doc.getElementsByTagName('yt:videoId');
		let thumbs = doc.getElementsByTagName('media:thumbnail');
		for (let i=1; i < dates.length; i++) {
			objs.push({
				title: titles[i+1].childNodes[0].nodeValue,
				// id: videos[i].textContent,
				// thumbnail: thumbs[i].getAttribute('url'),
				// title: titles[i+1].childNodes[0].nodeValue,
				date: dates[i].childNodes[0].nodeValue
			})
		}
		// this.setState({fTitle});
		this.setState({news: objs});
		console.log('updated Video state:',this.state)
	}

	renderNews() {
		return this.state.news.map(entry =>
			<View>
				<Text>{entry.title}</Text>
			</View>
		)
	}

	render() {
		const {} = styles
		return (
				<ScrollView style={{flex: 1, paddingTop: 20}}>
					{this.renderNews()}
					{/*<ListView*/}
					{/*dataSource={this.state.dataSource}*/}
					{/*renderRow={(rowData) => <Text>{rowData.title}, {rowData.pubDate}</Text>}*/}
					{/*/>*/}
				</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	styleTop: {},
})

export default SelectedScreen