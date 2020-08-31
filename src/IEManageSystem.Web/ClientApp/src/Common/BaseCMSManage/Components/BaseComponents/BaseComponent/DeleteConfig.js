import React from 'react'
import IEditConfig from './IEditConfig'
import IocContainer from 'Core/IocContainer'

export class IDeleteConfigBtnComponent extends React.Component {}
IDeleteConfigBtnComponent.iocKey = Symbol()

export default class DeleteConfig extends IEditConfig{
    bulidConfigBtnComponent(pageId, pageDataId, os, sign){
        let Component = IocContainer.getService(IDeleteConfigBtnComponent);

        return <Component
            pageId={pageId}
            pageDataId={pageDataId}
            os={os}
            sign={sign}
        />
    }
}