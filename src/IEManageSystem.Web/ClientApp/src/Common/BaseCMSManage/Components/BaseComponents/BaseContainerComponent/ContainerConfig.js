import IEditConfig from '../BaseComponent/IEditConfig'
import IocContainer from 'Core/IocContainer'

export class IContainerConfigBtnComponent {}

export default class ContainerConfig extends IEditConfig{
    bulidConfigBtnComponent(pageComponent){
        let Component = IocContainer.getService(IContainerConfigBtnComponent);

        return <Component 
            pageComponent={pageComponent}
        />
    }
}