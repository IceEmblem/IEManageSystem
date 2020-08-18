import RegisterTemplateParts from './RegisterTemplateParts'
import IocContainer from 'Core/IocContainer'
import {IInvalidOSComponent} from 'BaseCMSManage/Components/ComponentFactory'
import InvalidOSComponent from './InvalidOSComponent'

class RegisterTemplateManager {
    init(){
        RegisterTemplateParts.forEach(item => {
            item((type, single)=>{
                IocContainer.registerSingleIntances(type, single);
            })
        })

        IocContainer.registerSingleIntances(IInvalidOSComponent, InvalidOSComponent);
    }
}

const registerTemplateManager = new RegisterTemplateManager();
export default registerTemplateManager;