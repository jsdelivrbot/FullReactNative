import {
    APIRESOURCE
} from "./ApiResouce";
import {
    Global
} from "../common/Global";

const HOST = 'http://slauth-lb.gogoviet.com/api/';
//const HOST = 'http://5b2aa92f3a8ea3001418d7d2.mockapi.io/';
export class ApiService {
    static get(url) {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'token': (Global.userInfo != null) ? Global.userInfo.token.id : ''
            }
        }
        return new Promise(async (resolve, reject) => {
            setTimeout(() => {
                reject(new Error("timeout"))
            }, 5000)
            try {
                let res = await fetch(HOST + url, options);
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
                'token': (Global.userInfo != null) ? Global.userInfo.token.id : ''
            },
            body: JSON.stringify(data)
        }
        return new Promise(async (resolve, reject) => {
            setTimeout(() => {
                reject(new Error("timeout"))
            }, 5000)
            try {
                let res = await fetch(HOST + url, options);
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
                'token': (Global.userInfo != null) ? Global.userInfo.token.id : ''
            }
        }
        try {
            let res = await fetch(HOST + url, options);
            let resJson = await res.json();
            if (res.ok) {
                return Promise.resolve(resJson);
            } else {
               return Promise.reject(resJson.error)
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
    static async postNoTimeOut(url, data) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'token': (Global.userInfo != null) ? Global.userInfo.token.id : ''
            },
            body: JSON.stringify(data)
        }
        try {
            let res = await fetch(HOST + url, options);
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