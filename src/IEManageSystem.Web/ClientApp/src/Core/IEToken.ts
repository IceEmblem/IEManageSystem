import IETool from 'ToolLibrary/IETool'

export default class IEToken {
    static setToken(token: string, isRemember: boolean) {
        while(true)
        {
            let oldtoken = IETool.getCookie('ie_token');
            if(!oldtoken || oldtoken == ""){
                break;
            }
            IETool.delCookie('ie_token');
        }
        
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