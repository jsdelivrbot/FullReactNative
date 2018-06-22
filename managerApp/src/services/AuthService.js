import {
    AsyncStorage
} from 'react-native'
import {
    APIRESOURCE
} from './ApiResouce';
import {
    ApiService
} from './ApiService';
import {
    Global
} from '../common/Global';
import {
    keyStore
} from '../common/Constraint';
import {
    SignInScreen
} from '../common/ScreenName';
import {
    Notifiy
} from '../common/Notify';
export class AuthService {
    constructor() {
        if (!Global.userInfo) {
            AsyncStorage.getItem(keyStore).then(data => {
                if(data!=null){
                    Global.userInfo =JSON.parse(data)
                }
            }).catch(_ => Global.userInfo = null);
        }
    }
    signIn(username, password) {
        let data = {
            obj: JSON.stringify({
                username,
                password
            })
        }
        return ApiService.post(APIRESOURCE.SIGNIN, data);
    }


}