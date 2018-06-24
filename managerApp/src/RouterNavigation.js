import {
    createStackNavigator,
    createDrawerNavigator,
    DrawerActions
} from 'react-navigation';
import React from 'react';
import {
    Dimensions,
    TouchableHighlight,
    View
} from 'react-native';
import SignInComponent from './components/autentication/SignInComponent';
import {
    SignInScreen,
    DashboardScreen,
    MasterDataScreen,
    SystemMailScreen,
    UserScreen,
    WarehouseScreen, 
    ConfigWarehouseScreen
} from './common/ScreenName';
import {
    Color
} from './common/Color';
import SideMenuComponent from './components/main/SideMenuComponent';
import SystemMailComponent from './components/main/master-data/system-mail/SystemMailComponent';
import UserComponent from './components/main/master-data/user/UserComponent';
import DashboardComponent from './components/main/dashboard/DashboardComponent';
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
    SystemMailScreen: {
        screen: SystemMailComponent
    },
    SignInScreen: {
        screen: SignInComponent
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
    order: [DashboardScreen,SystemMailScreen,SignInScreen,UserScreen,WarehouseScreen,ConfigWarehouseScreen],
    contentComponent: props => <SideMenuComponent {...props}/>,
    drawerWidth: WIDTH * 75,
    style: {
        paddingTop: 0,
    },
};

export const RouterMenu = createDrawerNavigator(routes, optionsDrawer);

const routerStack = {
    DashboardScreen: {
        screen: DashboardComponent,    
    },
    SystemMailScreen: {
        screen: SystemMailComponent
    },
    SignInScreen: {
        screen: SignInComponent
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
    MenuScreen: {
        screen: ({navigation}) => <RouterMenu  screenProps={{rootNavigation: navigation}} /> 
     
    }
}
const optionsStack = {
    initialRouteName: SignInScreen,
    // navigationOptions: (props ) =>(
    //     {
    //         header: null
    //         //header: <HeaderComponent {...props}/>,
    //         //   headerTransparent: true,
    //         //   headerLeft: null
        
    //     }
    // )
}
RouterMenu.navigationOptions = ({ navigation }) => ({
    header: null
  });
export const RouterStack = createStackNavigator(routerStack,optionsStack)

const routerApp = {
    SignInScreen: {
        screen: SignInComponent
    },
    MenuScreen: {
        screen: ({navigation}) => <RouterMenu screenProps={{rootNavigation: navigation}} /> 
    }
}