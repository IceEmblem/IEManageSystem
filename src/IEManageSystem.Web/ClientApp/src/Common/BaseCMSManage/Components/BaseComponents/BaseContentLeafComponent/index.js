import BaseContentLeafComponent, { BaseContentLeafComponentProps } from './BaseContentLeafComponent'
import BaseComponentObject from '../BaseLeafComponent';
import ReduxComponentContainer from './ComponentContainer'

export default class ContentLeafComponentObject extends BaseComponentObject {
    ComponentDataConfig = undefined;
    getComponentContainer(){
        if(this.ComponentContainerIntance){
            return this.ComponentContainerIntance;
        }

        this.ComponentContainerIntance = ReduxComponentContainer(this.Component);
        return this.ComponentContainerIntance;
    }
}

export { BaseContentLeafComponent, BaseContentLeafComponentProps }