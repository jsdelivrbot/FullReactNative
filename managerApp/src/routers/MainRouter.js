import {
    createStackNavigator,
} from 'react-navigation';
import React from 'react';
import {
    Dimensions,
} from 'react-native';
import { MenuScreen } from '../common/ScreenName';
import { MenuRouter } from './MenuRouter';
import DashboardComponent from '../components/main/dashboard/DashboardComponent';
import SystemMailComponent from '../components/main/master-data/system-mail/SystemMailComponent';
import UserComponent from '../components/main/master-data/user/UserComponent';
import WarehouseComponent from '../components/main/master-data/warehouse/WarehouseComponent';
import ConfigWarehouseComponent from '../components/main/master-data/warehouse/ConfigWarehouseComponent';
import TestListComponent from '../components/main/test-component/TestListComponent';
import OwnersComponent from '../components/main/master-data/owners/OwnersComponent';


const WIDTH = Dimensions.get('screen').width / 100;
export const optionHeaderHiden = {
    headerTransparent: true,
	headerLeft: null
}
MenuRouter.navigationOptions = ({ navigation }) => ({
    header: null
  });
const routerStack = {
    MenuScreen: {
        screen: MenuRouter
    },
    // children
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
    },
    ConfigWarehouseScreen: {
        screen: ConfigWarehouseComponent
    },
    OWnersScreen: {
        screen: OwnersComponent
    },
    Test: {
        screen:  TestListComponent
    }
};

const optionsStack = {
    initialRouteName: MenuScreen
}
export const MainRouter = createStackNavigator(routerStack,optionsStack)
