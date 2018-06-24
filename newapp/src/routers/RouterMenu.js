import {
    createStackNavigator,
    createDrawerNavigator,
    DrawerActions
} from 'react-navigation';
import React from 'react';
import {
    Dimensions,
} from 'react-native';
const WIDTH = Dimensions.get('screen').width / 100;
import Home from '../screens/Home';
import SideMenu from './SideMenu';
import BlankPage2 from '../screens/BlankPage2';
const routerDrawer = {
    home: {
        screen: Home,    
    },
    blankPage2: { screen: BlankPage2 }
};
const optionsDrawer = {
     initialRouteName: 'home' ,
    // order: [],
    contentComponent: props => <SideMenu {...props}/>,
    drawerWidth: WIDTH * 75,
    style: {
        paddingTop: 0,
    },
};

export const RouterMenu = createDrawerNavigator(routerDrawer, optionsDrawer)