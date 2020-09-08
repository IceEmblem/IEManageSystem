import React from 'react'
import IEditConfig from '../BaseComponent/IEditConfig'
import IocContainer from 'Core/IocContainer'
import ComponentContainer from './ComponentComponentContainer'

export class IInteractiveComponentConfigBtnComponent extends React.Component { }
IInteractiveComponentConfigBtnComponent.iocKey = Symbol()

export const InteractiveType = {
    text: 0,
    click: 1,
}

export default class InteractiveComponentConfig extends IEditConfig {
    ComponentContainer = ComponentContainer;
    _interactiveTypes = undefined;

    constructor(interactiveTypes = [InteractiveType.text, InteractiveType.click]){
        super();

        this._interactiveTypes = interactiveTypes;
    }

    bulidConfigBtnComponent(pageId, pageDataId, os, sign) {
        let Component = IocContainer.getService(IInteractiveComponentConfigBtnComponent);

        return <Component
            pageId={pageId}
            pageDataId={pageDataId}
            os={os}
            sign={sign}
            interactiveTypes={this._interactiveTypes}
        />
    }
}