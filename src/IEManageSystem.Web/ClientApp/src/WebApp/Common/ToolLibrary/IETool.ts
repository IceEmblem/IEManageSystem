export default class IETool {
    //读取cookies 
    static getCookie(name: string) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        return arr != null ? unescape(arr[2]) : null;
    }

    //写cookies  
    static setCookie(name: string, value: string, expiredays: number, path: string = "/") {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString()) + ";path=" + path;
    }

    //删除cookies  
    static delCookie(name: string) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
        }
    }

    // 图片转base64编码
    // file: event.target.files[0];
    // setBase64StringFun: fun(base64)
    static imageToBase64String(file: any, setBase64StringFun: (base64: string) => void) {
        //判断是否是图片类型
        if (!/image\/\w+/.test(file.type)) {
            alert("只能选择图片");
            return false;
        }

        var reader = new FileReader();
        reader.onload = function (e: any) {
            setBase64StringFun(e.target.result);
        }.bind(this);
        reader.readAsDataURL(file);
    }

    // 深拷贝函数
    static deepCopy(obj: any) {
        let result:any = Array.isArray(obj) ? [] : {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    result[key] = this.deepCopy(obj[key]);   //递归复制
                } else {
                    result[key] = obj[key];
                }
            }
        }
        result.__proto__ = obj.__proto__;
        return result;
    }
}