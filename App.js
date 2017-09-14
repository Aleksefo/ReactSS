import React from 'react'
import {StyleSheet, Text, View, StatusBar} from 'react-native'
import MainNavigator from './src/navigation/MainNavigator'


//convert that
export default class App extends React.Component {
	render() {
		// console.log("Ho")
		// fetch('https://www.youtube.com/feeds/videos.xml?channel_id=UCTFN4eJu6uAatDb6VR9XZag')
		// 	.then(response => response.text())
		// 	.then((response) => {
		// 		parseString(response, function (err, result) {
		// 			console.log(result.feed.entry)
		// 		});
		// 	}).catch((err) => {
		// 	// console.log('fetch', err)
		// })
		return (
			<View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
				<MainNavigator />
			</View>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
