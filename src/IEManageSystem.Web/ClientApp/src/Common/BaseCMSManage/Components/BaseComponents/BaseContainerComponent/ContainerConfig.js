import React from 'react'
import IEditConfig from '../BaseComponent/IEditConfig'
import IocContainer from 'Core/IocContainer'

export class IContainerConfigBtnComponent extends React.Component {}
IContainerConfigBtnComponent.iocKey = Symbol()

export default class ContainerConfig extends IEditConfig{
    bulidConfigBtnComponent(pageId, pageDataId, os, sign){
        let Component = IocContainer.getService(IContainerConfigBtnComponent);

        return <Component
            pageId={pageId}
            pageDataId={pageDataId}
            os={os}
            sign={sign}
        />
    }
}