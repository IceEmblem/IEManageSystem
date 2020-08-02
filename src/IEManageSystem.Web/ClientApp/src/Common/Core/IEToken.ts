import IETool from 'Common/ToolLibrary/IETool'

export default class IEToken {
    static setToken(token: string, isRemember: boolean) {
        if(isRemember){
            IETool.setCookie('ie_token', token, 7);
        }
        else{
            IETool.setCookie('ie_token', token);
        }
    }

    static getToken() {
        return IETool.getCookie('ie_token');
    }

    static clearToken() {
        IETool.delCookie('ie_token');
    }
}