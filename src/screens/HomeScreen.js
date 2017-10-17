import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Button, AsyncStorage} from 'react-native'
import FeedCard from '../components/FeedCard'
import {SwipeableFlatList} from 'react-native-swipeable-flat-list'

class HomeScreen extends Component {
	state = {feeds: []}

	static navigationOptions = ({navigation}) => ({
		title: 'ReactSS',
		headerLeft: null,
		headerRight: <TouchableOpacity onPress={() => navigation.navigate('Add')}>
			{/*<Icons name="ios-car" size={28} color="white" />*/}
			<Text style={styles.add}>Add</Text>
		</TouchableOpacity>,
	})

	componentDidMount() {
		try {
			AsyncStorage.getItem('RSSListData')
				.then(JSON.parse).then(feeds => {
					console.log(feeds)
					this.setState({feeds})
					console.log('super new state ', this.state)
				}
			)
		} catch (error) {
			console.log('saveRSSLocally error ' + error)
		}
	}

	// renderFeeds() {
	// 	return this.state.feeds.map(entry =>
	// 		<TouchableOpacity key={entry.feedInf.fTitle} onPress={() => this.props.navigation.navigate('Selected', {entry: entry})}>
	// 			<FeedCard  feed={entry.feedInf} url={entry.url}/>
	// 		</TouchableOpacity>
	// 	)
	// }

	renderFeeds() {
		return (
			<View style={styles.container}>
				<SwipeableFlatList
					data={this.state.feeds}
					renderItem={({item}) => (
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Selected', {entry: item})}
							style={{height: 60}}
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
										fontWeight: 'bold',
									}}
								>
									{item.feedInf.fTitle}
								</Text>
								<Text
									style={{
										backgroundColor: 'transparent',
										color: 'black',
										fontSize: 12,
									}}
								>
									{item.feedInf.fDescription}
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
									backgroundColor: 'red',
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
									Delete
								</Text>
							</View>
						</TouchableOpacity>
					)}
					backgroundColor={'pink'}
				/>
			</View>
		)
	}


	render() {
		// const {} = styles
		const {navigate} = this.props.navigation
		// console.log(this.state.feedsDetails)
		return (
			<View style={{flex: 1}}>
				{/*<Button*/}
				{/*onPress={() => navigate('Selected', { user: 'Lucy' })}*/}
				{/*// onPress={this.fetchRSS.bind(this)}*/}
				{/*title="Chat with Lucy"*/}
				{/*/>*/}
				{this.renderFeeds()}
				{/*<FeedCard></FeedCard>*/}
			</View>
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
	styleCard: {
		// flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		// height: 50,
		backgroundColor: 'white',
	},
	styleText: {
		flex: 0.75,
		marginLeft: 5,
		marginTop: 5,
		marginBottom: 5,
	},
	styleTitle: {

		fontWeight: 'bold',
	},
	styleDescription: {},
	styleImage: {
		width: 100,
		flex: 0.25,

	},
	add: {
		paddingRight: 5,
		marginRight: 5,
	}
})

export default HomeScreen