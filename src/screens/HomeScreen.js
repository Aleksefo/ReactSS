import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text, AsyncStorage, FlatList} from 'react-native'

class HomeScreen extends Component {
	state = {feeds: []}

	static navigationOptions = ({navigation}) => ({
		title: 'ReactSS',
		headerLeft: null,
		headerRight: <TouchableOpacity onPress={() => navigation.navigate('Add')}>
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

	removeFeed(item) {
		console.log('clicked on remove! ', item)
		let spliced = this.state.feeds
		spliced.splice(item, 1)
		console.log('spliced ', spliced)
		this.setState({
			feeds: spliced
		})
		AsyncStorage.setItem('RSSListData', JSON.stringify(spliced))
	}

	renderFeeds() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.feeds}
					renderItem={({item, index}) => (
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Selected', {entry: item})}
							onLongPress={() => this.removeFeed(index)}
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
				/>
			</View>
		)
	}


	render() {
		// const {} = styles
		const {navigate} = this.props.navigation
		return (
			<View style={{flex: 1}}>
				{this.renderFeeds()}
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
	styleCard: {
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
		color: '#841584',
		fontWeight: 'bold',
	}
})

export default HomeScreen