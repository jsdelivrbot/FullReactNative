import {
    createStackNavigator,
} from 'react-navigation';
import React from 'react';
import {
    Dimensions,
} from 'react-native';
import SignInComponent from '../components/autentication/SignInComponent';
import { SignInScreen } from '../common/ScreenName';
import { MainRouter } from './MainRouter';

export const WIDTH = Dimensions.get('screen').width / 100;

const routerStack = {
    SignInScreen: {
        screen: SignInComponent
    },
    MainScreen: {
        screen: MainRouter  
    }
};

const optionsStack = {
    initialRouteName: SignInScreen,
    navigationOptions: (props ) =>(
        {
            header: null
        }
    )
}
export const AppRouter = createStackNavigator(routerStack,optionsStack)
