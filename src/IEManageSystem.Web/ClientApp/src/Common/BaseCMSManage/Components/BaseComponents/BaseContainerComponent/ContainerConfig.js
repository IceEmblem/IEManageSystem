import React from 'react'
import IEditConfig from '../BaseComponent/IEditConfig'
import IocContainer from 'Core/IocContainer'
import ComponentContainer from './ComponentContainer'

export class IContainerConfigBtnComponent extends React.Component { }
IContainerConfigBtnComponent.iocKey = Symbol()

export default class ContainerConfig extends IEditConfig {
    ComponentContainer = ComponentContainer;

    itemNum = undefined;

    constructor(itemNum = 0) {
        super()
        this.itemNum = itemNum;
    }

    bulidConfigBtnComponent(pageId, pageDataId, os, sign) {
        let Component = IocContainer.getService(IContainerConfigBtnComponent);

        return <Component
            pageId={pageId}
            pageDataId={pageDataId}
            os={os}
            sign={sign}
            itemNum={this.itemNum}
        />
    }
}