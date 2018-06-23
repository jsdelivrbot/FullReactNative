import {
    createStackNavigator,
    createDrawerNavigator,
    DrawerActions
} from 'react-navigation';
import React from 'react';
import {
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import MainComponent from './components/main/MainComponent';
import SignInComponent from './components/autentication/SignInComponent';
import {
    SignInScreen,
    DashboardScreen,
    MasterDataScreen,
    SystemMailScreen,
    MainScreen,
    UserScreen,
    WarehouseScreen, 
    MenuScreen,
    ConfigWarehouseScreen
} from './common/ScreenName';
import {
    Color
} from './common/Color';
import SideMenuComponent from './components/main/SideMenuComponent';
import SystemMailComponent from './components/main/master-data/system-mail/SystemMailComponent';
import UserComponent from './components/main/master-data/user/UserComponent';
import DashboardComponent from './components/main/dashboard/DashboardComponent';
import MasterDataComponent from './components/main/test-component/MasterDataComponent';
import WarehouseComponent from './components/main/master-data/warehouse/WarehouseComponent';
import ConfigWarehouseComponent from './components/main/master-data/warehouse/ConfigWarehouseComponent';
import HeaderComponent from './components/main/HeaderComponent';
export const WIDTH = Dimensions.get('screen').width / 100;
export const optionHeaderHiden = {
    headerTransparent: true,
	headerLeft: null
}
const routes = {
    DashboardScreen: {
        screen: DashboardComponent,    
    },
    MasterDataScreen: {
        screen: MasterDataComponent,    
    },
    SystemMailScreen: {
        screen: SystemMailComponent
    },
    SignInScreen: {
        screen: SignInComponent
    },
    MainScreen: {
        screen: MainComponent
    },
    UserScreen: {
        screen: UserComponent
    },
    WarehouseScreen: {
        screen: WarehouseComponent
    },
    ConfigWarehouseScreen: {
        screen: ConfigWarehouseComponent
    }
};
const optionsDrawer = {
    initialRouteName: DashboardScreen,
    order: [DashboardScreen, MasterDataScreen,SystemMailScreen,SignInScreen,MainScreen,UserScreen,WarehouseScreen,ConfigWarehouseScreen],
    contentComponent: props => <SideMenuComponent {...props}/>,
    drawerWidth: WIDTH * 75,
    style: {
        paddingTop: 0,
    },
};

export const RouterMenu = createDrawerNavigator(routes, optionsDrawer);

const routerStack = {
    SignInScreen: {
        screen: SignInComponent
    },
    MenuScreen: {
        screen: RouterMenu
    }
}
const optionsStack = {
    initialRouteName: SignInScreen,
    navigationOptions: (props ) =>(
        {
           // header: <HeaderComponent {...props}/>,
             headerTransparent: true,
	         headerLeft: null
        }
    )
}
export const RouterStack = createStackNavigator(routerStack,optionsStack)
