import React from 'react'
import IEditConfig from '../BaseComponent/IEditConfig'
import {IocContainer} from 'ice-common'
import ComponentContainer from './ComponentComponentContainer'

export class IInteractiveComponentConfigBtnComponent extends React.Component { }
IInteractiveComponentConfigBtnComponent.iocKey = Symbol()

export default class InteractiveComponentConfig extends IEditConfig {
    ComponentContainer = undefined;
    _interactiveTypes = undefined;

    constructor(interactiveTypes = []){
        super();

        this._interactiveTypes = interactiveTypes;

        this.ComponentContainer = (component) => (props) => {
            return <ComponentContainer
                _containerComponent={component}
                interactiveTypes={interactiveTypes}
                {...props}
            />
        }
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