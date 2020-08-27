import { AsyncStorage } from 'react-native'
import RNFS from 'react-native-fs';

// 核心模块依赖
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module';
import Weburl from 'Core/Weburl'
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
        RNFS.readFileAssets('config.json').then((result) => {
            let config = JSON.parse(result);
            Weburl.setBaseUrl(config.baseUrl)
        })

        IETool.getCookie = getCookie;
        IETool.setCookie = setCookie;
        IETool.delCookie = delCookie;
    }
}

new ModuleFactory().register(Module, [...ModuleList, CoreModule]);