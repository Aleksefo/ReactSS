import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, Linking} from 'react-native'
import {DOMParser} from 'xmldom'
import NewsCard from '../components/NewsCard'
import {SwipeableFlatList} from 'react-native-swipeable-flat-list'

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
		let links = doc.getElementsByTagName('link');
		let descriptions = doc.getElementsByTagName('description');
		let videos = doc.getElementsByTagName('yt:videoId');
		let thumbs = doc.getElementsByTagName('media:thumbnail');
		for (let i = 1; i < dates.length; i++) {
			objs.push({
				title: titles[i + 1].childNodes[0].nodeValue,
				// id: videos[i].textContent,
				// thumbnail: thumbs[i].getAttribute('url'),
				// title: titles[i+1].childNodes[0].nodeValue,
				date: dates[i].childNodes[0].nodeValue,
				link: links[i + 1].childNodes[0].nodeValue,
				description: descriptions[i].childNodes[0].nodeValue,
			})
		}
		// this.setState({fTitle});
		this.setState({news: objs});
		console.log('updated Video state:', this.state)
	}

	// renderNews() {
	// 	return this.state.news.map(entry =>
	// 		<TouchableOpacity key={entry.link}
	// 		                  onPress={() => Linking.openURL(entry.link)}>
	// 			<NewsCard entry={entry}/>
	// 		</TouchableOpacity>
	//
	// 	)
	// }

	renderNews() {
		return (
			<View style={styles.container}>
				<SwipeableFlatList
					data={this.state.news}
					renderItem={({item}) => (
						<TouchableOpacity
							onPress={() => Linking.openURL(item.link)}
							style={{
								height: 60,
							}}
						>
							<View
								style={{
									backgroundColor: 'lightgrey',
									borderColor: 'grey',
									borderWidth: 1,
									flex: 1,
									justifyContent: 'center',
									padding: 8,
								}}
							>
								<Text
									style={{
										backgroundColor: 'transparent',
										color: 'black',
										fontSize: 16,
									}}
								>
									{item.title}
								</Text>
							</View>
						</TouchableOpacity>
					)}
					renderRight={({item}) => (
						<TouchableOpacity
							style={{
								height: 60,
								width: 80,
							}}
						>
							<View
								style={{
									backgroundColor: 'cornflowerblue',
									borderColor: 'black',
									borderWidth: 1,
									flex: 1,
									justifyContent: 'center',
									padding: 8,
								}}
							>
								<Text
									style={{
										backgroundColor: 'transparent',
										color: 'black',
										fontSize: 16,
										paddingLeft: 10,
									}}
								>
									Share
								</Text>
							</View>
						</TouchableOpacity>
					)}
					backgroundColor={'white'}
				/>
			</View>
		)
	}

	render() {
		// const {} = styles
		return (
			<ScrollView style={{flex: 1}}>
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
	container: {
		flex: 1,
		justifyContent: 'center',
		//alignItems: 'center',
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