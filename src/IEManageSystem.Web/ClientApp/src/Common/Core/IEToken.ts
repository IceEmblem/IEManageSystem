import {IETool} from 'ice-common'

export default class IEToken {
    static setToken(token: string, isRemember: boolean) {
        if(isRemember){
            return IETool.setCookie('ie_token', token, 7);
        }
        else{
            return IETool.setCookie('ie_token', token, undefined);
        }
    }

    static getToken() {
        return IETool.getCookie('ie_token');
    }

    static clearToken() {
        return IETool.delCookie('ie_token');
    }
}