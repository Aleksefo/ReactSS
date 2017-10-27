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
		this.loadRSSList()
	}

	// Loads array of Feeds from local storage
	loadRSSList() {
		try {
			AsyncStorage.getItem('RSSListData')
				.then(JSON.parse).then(feeds => {
					this.setState({feeds})
				}
			)
		} catch (error) {
			console.log('saveRSSLocally error ' + error)
		}
	}

	// Removes feed from local storage
	removeFeed(item) {
		let spliced = this.state.feeds
		spliced.splice(item, 1)
		this.setState({
			feeds: spliced
		})
		AsyncStorage.setItem('RSSListData', JSON.stringify(spliced))
	}

	render() {
		const {navigate} = this.props.navigation
		const {styleCard, styleTitle, styleText} = styles
		return (
			<FlatList
				data={this.state.feeds}
				keyExtractor={(item, index) => index}
				renderItem={({item, index}) => (
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('Selected', {entry: item})}
						onLongPress={() => this.removeFeed(index)}
						style={styleCard}
					>
						<Text style={styleTitle}>
							{item.feedInf.fTitle}
						</Text>
						<Text style={styleText}>
							{item.feedInf.fDescription}
						</Text>
					</TouchableOpacity>
				)}
			/>
		)
	}
}

const styles = StyleSheet.create({
	styleCard: {
		borderRadius: 2,
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		backgroundColor: 'lightgrey',
		borderColor: 'grey',
		borderWidth: 1,
		flex: 1,
		justifyContent: 'center',
		padding: 8,
	},
	styleText: {
		fontSize: 12,
		marginTop: 5,
		marginBottom: 5,
	},
	styleTitle: {
		fontWeight: 'bold',
	},
	add: {
		paddingRight: 5,
		marginRight: 5,
		color: '#841584',
		fontWeight: 'bold',
	}
})

export default HomeScreen