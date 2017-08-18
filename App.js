import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
const parseString = require('react-native-xml2js').parseString
//convert that
export default class App extends React.Component {
	render() {
		console.log("Ho")
		fetch('https://www.youtube.com/feeds/videos.xml?channel_id=UCTFN4eJu6uAatDb6VR9XZag')
			.then(response => response.text())
			.then((response) => {
				parseString(response, function (err, result) {
					console.log(result.feed.entry)
				});
			}).catch((err) => {
			// console.log('fetch', err)
		})
		return (
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
				<Text>Changes you make will automatically reload.</Text>
				<Text>Shake your phone to open the developer menu.</Text>
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
