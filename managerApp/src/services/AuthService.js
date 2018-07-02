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
import { APIREQUEST } from './ApiRequest';
export class AuthService {
    constructor() {
        if (!Global.userInfo) {
            AsyncStorage.getItem(keyStore).then(data => {
                if (data != null) {
                    Global.userInfo = JSON.parse(data)
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
        return ApiService.post(APIRESOURCE.USER.SIGNIN, data);
    }
    login(username, password) {
        return new Promise((resolve, reject) => {
            ApiService.post(APIRESOURCE.USER.SIGNIN, {
                obj: JSON.stringify({ username, password })
            }).then(res => {
                let data1 = res.res;
                ApiService.post(APIRESOURCE.USER.AFTERSIGNIN, {
                    obj: JSON.stringify({
                        token: data1.token.id,
                        username: data1.user.username,
                        appcode: Global.appcode.wms,
                        type: data1.user.type
                    })
                }).then(response => {

                    let data2 = response.res;
                    if (!data2.owner || data2.owner.length === 0) {
                        throw 'NO_OWNER';
                    } else if (!data2.warehouse || data2.warehouse.length === 0) {
                        throw 'NO_WAREHOUSE';
                    } else {
                        Global.userInfo = {
                            token: data1.token.id,
                            parentuser: data1.user.parentuser,
                            username: data1.user.username,
                            fullname: data1.user.fullname,
                            email: data1.user.email,
                            tel: data1.user.tel,
                            type: data1.user.type,
                            owners: data2.owner,
                            warehouses: data2.warehouse,
                            whseid: data2.warehouse[0].warehousecode,
                            warehousename: data2.warehouse[0].warehousename
                        };
                        ApiService.timeoutRequest( AsyncStorage.setItem(keyStore,JSON.stringify(Global.userInfo)),8000);
                        resolve(Global.userInfo);
                    }
                }).catch(err => reject(err))
            }).catch(err => reject(err))
        })
    }

}