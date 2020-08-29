import IEditConfig from './IEditConfig'
import IocContainer from 'Core/IocContainer'

export class IComponentSettingConfigBtnComponent {}

export default class BaseComponentSettingConfig extends IEditConfig{
    name = undefined;
    displayName = undefined;
    ConfigComponent = undefined;

    constructor(name, displayName, ConfigComponent){
        this.name = name;
        this.displayName = displayName;
        this.ConfigComponent = ConfigComponent;
    }

    bulidConfigBtnComponent(pageComponent){
        let Component = IocContainer.getService(IComponentSettingConfigBtnComponent);

        return <Component 
            pageComponent={pageComponent}
            ConfigComponent={this.ConfigComponent}
        />
    }
}