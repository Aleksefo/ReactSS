import React from 'react'
import {View, StyleSheet, Text} from 'react-native'

const FeedCard = (props) => {
	const {} = styles
    return (
        <View>
	        <Text>{props.feed.fTitle}</Text>
        </View>
    )
}

const styles  = StyleSheet.create({
	styleTop: {
	},
})

export default FeedCard