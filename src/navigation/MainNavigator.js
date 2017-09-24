import {StackNavigator} from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import SelectedScreen from '../screens/SelectedScreen'
import DetailsScreen from '../screens/DetailsScreen'
import AddScreen from '../screens/AddScreen'
import FeedCard from '../components/FeedCard'
import NewsCard from '../components/NewsCard'

export default MainStack = StackNavigator({
		Home: {screen: HomeScreen},
		Selected: {screen: SelectedScreen},
		Details: {screen: DetailsScreen},
		Add: {screen: AddScreen},
		FeedCard: {screen: FeedCard},
		NewsCard: {screen: NewsCard},
	}
// , {
// 	navigationOptions: ({navigation}) => ({
// 		// headerRight: <TouchableOpacity onPress={() => navigation.navigate('Parking')}>
// 		headerRight: <TouchableOpacity onPress={() => NativeModules.ActivityStarter.navigateToExample2()}>
// 			<Icons name="ios-car" size={28} color="white" />
// 		</TouchableOpacity>,
// 		headerLeft: <DrawerButton title="Drawer" navigation={navigation} />,
// 		headerStyle: {
// 			backgroundColor: 'black'
// 		},
// 	}),
// }
)