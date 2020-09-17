import React from 'react'
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'

import CoreModule from 'Core/Module'

import { reducer } from 'BaseLayout/IEReduxs/Reducers'
import LayoutRedux from 'BaseLayout/IEReduxs/LayoutRedux'
import RootRedux from 'Core/IEReduxs/RootRedux'

import Theme from './Theme'

export default class Module extends BaseModule
{
    initialize(){
        LayoutRedux.setReducer(reducer);
        RootRedux.register(LayoutRedux);
    }

    postInitialize(){
        return Theme.init();
    }
}

new ModuleFactory().register(Module, [
    CoreModule
]);