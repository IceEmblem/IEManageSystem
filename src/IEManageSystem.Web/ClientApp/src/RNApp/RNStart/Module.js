import {AsyncStorage} from 'react-native'

// 核心模块依赖
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module';
import {setBaseUrl} from 'Core/IEReduxs/Actions'
import {baseUrl} from '../../../app.json'
import IETool from 'Core/ToolLibrary/IETool'

import ModuleList from '../ModuleList'

const getCookie = async (name) => {
    return AsyncStorage.getItem(name);
}

const setCookie = (name, value, expiredays, path = "/") => {
    return AsyncStorage.setItem(name, value);
}

const delCookie = (name) => {
    return AsyncStorage.removeItem(name);
}

export default class Module extends BaseModule {
    initialize() {
        setBaseUrl(baseUrl);
        IETool.getCookie = getCookie;
        IETool.setCookie = setCookie;
        IETool.delCookie = delCookie;
    }
}

new ModuleFactory().register(Module, [...ModuleList, CoreModule]);