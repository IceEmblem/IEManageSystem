import RegisterTemplateParts from './RegisterTemplateParts'
import IocContainer from 'Core/IocContainer'

class RegisterTemplateManager {
    init(){
        RegisterTemplateParts.forEach(item => {
            item((type, single)=>{
                IocContainer.registerSingleIntances(type, single);
            })
        })
    }
}

const registerTemplateManager = new RegisterTemplateManager();
export default registerTemplateManager;