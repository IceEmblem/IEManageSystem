import {IocContainer} from 'ice-common'
import ComponentFactory, {IInvalidOSComponent} from 'BaseCMSManage/Components/ComponentFactory'
import InvalidOSComponent from './InvalidOSComponent'
import Templates from './Templates'

class RegisterTemplateManager {
    init(){
        ComponentFactory.register(Templates, InvalidOSComponent)
    }
}

const registerTemplateManager = new RegisterTemplateManager();
export default registerTemplateManager;