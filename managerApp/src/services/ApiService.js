import {
    APIRESOURCE
} from "./ApiResouce";
import {
    Global
} from "../common/Global";
export class ApiService {
    static get(url) {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'token': (Global.userInfo != null) ? Global.userInfo.token : ''
            }
        }
        return new Promise(async (resolve, reject) => {
            setTimeout(() => {
                reject(new Error("timeout"))
            }, 5000)
            try {
                let res = await fetch(Global.HOST.administrator + url, options);
                let resJson = await res.json();
                if (res.ok) {
                    resolve(resJson);
                } else {
                    reject(resJson)
                }
            } catch (err) {
                reject(err);
            }
        })
    }
    static post(url, data) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'token': (Global.userInfo != null) ? Global.userInfo.token : ''
            },
            body: JSON.stringify(data)
        }
        return new Promise(async (resolve, reject) => {
            setTimeout(() => {
                reject(new Error("timeout"))
            }, 5000)
            try {
                let res = await fetch(Global.HOST.administrator + url, options);
                let resJson = await res.json();
                if (res.ok) {
                    resolve(resJson);
                } else {
                    reject(resJson.error)
                }
            } catch (err) {
                reject(err);
            }
        })

    }
    static postHostUser(url, data) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'token': (Global.userInfo != null) ? Global.userInfo.token : ''
            },
            body: JSON.stringify(data)
        }
       // alert(Global.userInfo.token.id);
        return new Promise(async (resolve, reject) => {
            setTimeout(() => {
                reject(new Error("timeout"))
            }, 5000)
            try {
                let keyHost = (Global.userInfo) ? Global.userInfo.parentuser : 'administrator';
                alert(keyHost);
                let res = await fetch(Global.HOST[keyHost] + url, options);
                let resJson = await res.json();
                if (res.ok) {
                    resolve(resJson);
                } else {
                    reject(resJson.error)
                }
            } catch (err) {
                reject(err);
            }
        })

    }
    static timeoutRequest(promise, ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("timeout"))
            }, ms)
            promise.then(resolve, reject);
        })
    }
    static async getNoTimeOut(url) {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'token': (Global.userInfo != null) ? Global.userInfo.token : ''
            }
        }
        try {
            let res = await fetch(Global.HOST.administrator + url, options);
            let resJson = await res.json();
            if (res.ok) {
                return Promise.resolve(resJson);
            } else {
               return Promise.reject(resJson.error)
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    static async postNoTimeOut(url, data) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'token': (Global.userInfo != null) ? Global.userInfo.token : ''
            },
            body: JSON.stringify(data)
        }
        try {
            let res = await fetch(Global.HOST.administrator + url, options);
            let resJson = await res.json();
            if (res.ok) {
                return Promise.resolve(resJson);
            } else {
               return Promise.reject(resJson.error)
            }
        } catch (err) {
           return Promise.reject(err);
        }

    }
    
}