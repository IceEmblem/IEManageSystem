import React from 'react'
import IEditConfig from './IEditConfig'
import {IocContainer} from 'ice-common'

export class IDeleteConfigBtnComponent extends React.Component {}
IDeleteConfigBtnComponent.iocKey = Symbol()

export default class DeleteConfig extends IEditConfig{
    bulidConfigBtnComponent(sign, currentPageAndPost){
        let Component = IocContainer.getService(IDeleteConfigBtnComponent);

        return <Component
            sign={sign}
            currentPageAndPost={currentPageAndPost}
        />
    }
}