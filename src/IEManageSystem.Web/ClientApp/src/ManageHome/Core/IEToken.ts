import IETool from 'ToolLibrary/IETool'

export default class IEToken {
    static setToken(token: string) {
        IETool.setCookie('ie_token', token, 7);
    }

    static getToken() {
        return IETool.getCookie('ie_token');
    }

    static clearToken() {
        IETool.delCookie('ie_token');
    }
}