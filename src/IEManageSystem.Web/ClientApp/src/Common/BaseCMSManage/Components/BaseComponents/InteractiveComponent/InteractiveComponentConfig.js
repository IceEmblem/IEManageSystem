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

    bulidConfigBtnComponent(sign, currentPageAndPost) {
        let Component = IocContainer.getService(IInteractiveComponentConfigBtnComponent);

        return <Component
            sign={sign}
            currentPageAndPost={currentPageAndPost}
            interactiveTypes={this._interactiveTypes}
        />
    }
}