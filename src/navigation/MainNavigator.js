import {StackNavigator} from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import SelectedScreen from '../screens/SelectedScreen'
import AddScreen from '../screens/AddScreen'

export default MainStack = StackNavigator({
		Home: {screen: HomeScreen},
		Selected: {screen: SelectedScreen},
		Add: {screen: AddScreen},
	}
)