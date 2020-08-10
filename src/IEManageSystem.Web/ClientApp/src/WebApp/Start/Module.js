import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module';
import ModuleList from '../ModuleList';
import IETool from 'Core/ToolLibrary/IETool'

const getCookie = (name) => {
    return new Promise(function(resolve, reject){
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        resolve(arr != null ? unescape(arr[2]) : null);
    });
}

const setCookie = (name, value, expiredays, path = "/") => {
    return new Promise(function(resolve, reject){
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString()) + ";path=" + path;
        resolve();
    });
}

const delCookie = (name) => {
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

export default class Module extends BaseModule
{
    initialize(){
        IETool.getCookie = getCookie;
        IETool.setCookie = setCookie;
        IETool.delCookie = delCookie;
    }
}

new ModuleFactory().register(Module, [...ModuleList, CoreModule]);