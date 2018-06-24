import {
    createStackNavigator,
    createDrawerNavigator,
    DrawerActions
} from 'react-navigation';
import React from 'react';
import {
    Dimensions,
} from 'react-native';
import Login from '../screens/Login';
import Home from '../screens/Home';
import { RouterMenu } from './RouterMenu';
import BlankPage2 from '../screens/BlankPage2';
import BlankPage from '../screens/BlankPage';
import DetailHome from '../screens/DetailHome';

const WIDTH = Dimensions.get('screen').width / 100;
export const optionHeaderHiden = {
    headerTransparent: true,
	headerLeft: null
}
RouterMenu.navigationOptions = ({ navigation }) => ({
    header: null
  });
const routerStack = {
    drawer: {
        screen: RouterMenu
    },
    home: {
        screen: Home,    
    },
    blankPage2: { screen: BlankPage2 },
    blankPage: { screen: BlankPage },
    detailHome: {screen: DetailHome}
};

const optionsStack = {
    initialRouteName: 'drawer',
    // navigationOptions: (props ) =>(
    //     {
    //         header: null
    //         //header: <HeaderComponent {...props}/>,
    //         //   headerTransparent: true,
    //         //   headerLeft: null
        
    //     }
    // )
}
export const RouterMain = createStackNavigator(routerStack,optionsStack)
