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
import BlankPage from '../screens/BlankPage';
import { RouterMain } from './RouterMain';

export const WIDTH = Dimensions.get('screen').width / 100;
export const optionHeaderHiden = {
    headerTransparent: true,
	headerLeft: null
}

const routerStack = {
    login: {
        screen: Login,    
    },
    main: {
        screen: RouterMain,    
    }
};

const optionsStack = {
    initialRouteName: 'login',
    navigationOptions: (props ) =>(
        {
            header: null
            //header: <HeaderComponent {...props}/>,
            //   headerTransparent: true,
            //   headerLeft: null
        
        }
    )
}
export const RouterApp = createStackNavigator(routerStack,optionsStack)
