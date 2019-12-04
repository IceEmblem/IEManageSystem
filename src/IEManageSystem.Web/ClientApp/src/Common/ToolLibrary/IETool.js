export function setToken(token)
{
    $.cookie('ie_token', token, { expires: 7, path: '/' });
}

export function getToken()
{
    return $.cookie('ie_token');
}

export function clearToken() {
    $.cookie('ie_token', null, { expires: 0, path: '/' });
}

// 图片转base64编码
// file: event.target.files[0];
// setBase64StringFun: fun(base64)
export function imageToBase64String(file, setBase64StringFun){
    //判断是否是图片类型
    if (!/image\/\w+/.test(file.type)) {
        alert("只能选择图片");
        return false;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        setBase64StringFun(e.target.result);
    }.bind(this);
    reader.readAsDataURL(file);
}