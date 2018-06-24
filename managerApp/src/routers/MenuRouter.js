import {
    createStackNavigator,
    createDrawerNavigator,
    DrawerActions
} from 'react-navigation';
import React from 'react';
import {
    Dimensions,
} from 'react-native';
import DashboardComponent from '../components/main/dashboard/DashboardComponent';
import SystemMailComponent from '../components/main/master-data/system-mail/SystemMailComponent';
import UserComponent from '../components/main/master-data/user/UserComponent';
import WarehouseComponent from '../components/main/master-data/warehouse/WarehouseComponent';
import { DashboardScreen } from '../common/ScreenName';
import SideMenuComponent from '../components/main/SideMenuComponent';
const WIDTH = Dimensions.get('screen').width / 100;
const routerDrawer = {
    DashboardScreen: {
        screen: DashboardComponent,    
    },
    SystemMailScreen: {
        screen: SystemMailComponent
    },
    UserScreen: {
        screen: UserComponent
    },
    WarehouseScreen: {
        screen: WarehouseComponent
    }
};
const optionsDrawer = {
     initialRouteName: DashboardScreen ,
    // order: [],
    contentComponent: props => <SideMenuComponent {...props}/>,
    drawerWidth: WIDTH * 75,
    style: {
        paddingTop: 0,
    },
};

export const MenuRouter = createDrawerNavigator(routerDrawer, optionsDrawer)