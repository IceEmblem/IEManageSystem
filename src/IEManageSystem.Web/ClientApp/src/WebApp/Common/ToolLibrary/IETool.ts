export const getCookie = (name) => {
    return new Promise(function(resolve, reject){
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        resolve(arr != null ? unescape(arr[2]) : null);
    });
}

export const setCookie = (name, value, expiredays, path = "/") => {
    return new Promise(function(resolve, reject){
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString()) + ";path=" + path;
        resolve();
    });
}

export const delCookie = (name) => {
    return new Promise(function(resolve, reject){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
        }
        resolve();
    });
}