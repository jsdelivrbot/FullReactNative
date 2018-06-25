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
    login(username,password) {
        return new Promise((resolve, reject) => {
            ApiService.post(APIRESOURCE.SIGNIN, {
                obj: JSON.stringify({ username, password })
            }).then(response => {
                
                let data1 = response.res;
                alert(JSON.stringify(data1))
                ApiService.post('Users/aftersignin', {
                    obj: JSON.stringify({
                        token: data1.token.id,
                        username: data1.user.username,
                        appcode: 'wms',
                        type: data1.user.type
                    })
                }).then(response => {
                    alert(JSON.stringify(response))
                    let data2 = response.res;
                    if (!data2.owner || data2.owner.length === 0) {
                        throw 'NO_OWNER';
                    } else if (!data2.warehouse || data2.warehouse.length === 0) {
                        throw 'NO_WAREHOUSE';
                    } else {
                        Global.user = {
                            token: data1.token.id,
                            parentuser: data1.user.parentuser,
                            username: data1.user.username,
                            fullname: data1.user.fullname,
                            email: data1.user.email,
                            tel: data1.user.tel,
                            type: data1.user.type,
                            owners: data2.owner,
                            strOwners: data2.owner.map(owner => `'${owner.storerkey}'`).join(),
                            warehouses: data2.warehouse,
                            whseid: data2.warehouse[0].warehousecode,
                            warehousename: data2.warehouse[0].warehousename
                        };
                        ApiService.timeoutRequest( AsyncStorage.setItem(keyStore,JSON.stringify(Global.user)),5000);
                        resolve(true);
                    }
                }).catch(err => {
                    reject(err);
                });
            }).catch(err => {
                reject(err);
            });
        });

    }

}