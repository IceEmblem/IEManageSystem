import IEditConfig from '../BaseComponent/IEditConfig'
import IocContainer from 'Core/IocContainer'
import ComponentContainer from './ComponentContainer'

export class IComponentDataConfigBtnComponent {}

export default class ComponentDataConfig extends IEditConfig{
    ConfigComponent = undefined;
    ComponentContainer = ComponentContainer;

    constructor(ConfigComponent){
        this.ConfigComponent = ConfigComponent;
    }

    bulidConfigBtnComponent(pageComponent){
        let Component = IocContainer.getService(IComponentDataConfigBtnComponent);

        return <Component 
            pageComponent={pageComponent}
            ConfigComponent={this.ConfigComponent}
        />
    }
}