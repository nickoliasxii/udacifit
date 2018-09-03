import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'

import History from './components/History'
import AddEntry from './components/AddEntry'
import EntryDetail from './components/EntryDetail'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

const UdaciStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backcrounColor={backgroundColor} {...props} />
    </View>
  )
}
const RouteConfig = {
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'AddEntry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Tabs = Platform.OS === "ios"
  ? createBottomTabNavigator(RouteConfig, TabNavigatorConfig)
  : createMaterialTopTabNavigator(RouteConfig, TabNavigatorConfig);


const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    })
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}