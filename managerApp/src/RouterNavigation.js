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
import SystemMailComponent from './components/main/master-data/SystemMailComponent';
import UserComponent from './components/main/master-data/UserComponent';
import DashboardComponent from './components/main/dashboard/DashboardComponent';
import MasterDataComponent from './components/main/master-data/MasterDataComponent';
import WarehouseComponent from './components/main/master-data/WarehouseComponent';
import ConfigWarehouseComponent from './components/main/master-data/ConfigWarehouseComponent';
import HeaderComponent from './components/main/HeaderComponent';
import { styles } from './common/Styles';
import { Icon } from 'native-base';
export const WIDTH = Dimensions.get('screen').width / 100;



const routes = {
    DashboardScreen: {
        screen: DashboardComponent,
        navigationOptions: {
            title: 'Dashboard'
        }
    },
    MasterDataScreen: {
        screen: MasterDataComponent,
        navigationOptions: {
            title: 'Master Data'
        }
    },
    SystemMailScreen: {
        screen: SystemMailComponent,
        navigationOptions: {
            title: 'System Mail'
        }
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
            header: <HeaderComponent {...props}/>,
        }
    )
}
export const RouterStack = createStackNavigator(routerStack,optionsStack)
// export const RouterMenu = createDrawerNavigator({
//     DashboardScreen: {
//         screen: DashboardComponent,
//         // navigationOptions: {
//         //     drawerLabel: 'Dashboard'
//         // }
//     },
//     MasterDataScreen: {
//         screen: MasterDataComponent,
//         navigationOptions: {
//             drawerLabel: 'Master data',
//             drawerIcon: () => (
//             <Image
//                 source={require('./assets/icons/home-icon.png')}
//                 style={{width: 30, height: 30, borderRadius: 15}}
//             />
//             )
//         }
//     }
// },{
//     initialRouteName: DashboardScreen,
//     drawerPosition: 'left',
//     drawerWidth: width * 0.75,
//     drawerBackgroundColor: Color.white,
//     contentOptions: {
//         inactiveTintColor: Color.smartlog,
//         activeTintColor: Color.blue
//     } 
// })