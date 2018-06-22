import React, { Component } from 'react'
import { AsyncStorage} from 'react-native'
import { SignInScreen } from '../common/ScreenName';
import { Global } from '../common/Global';

export default class BaseComponent extends Component {
    constructor(props) {
        super(props);

    }
    outSession(){
        Global.userInfo = null;
        AsyncStorage.clear().then(() => {
         this.props.navigation.navigate(SignInScreen);
            }).catch(_ => {
        });
    }
}
