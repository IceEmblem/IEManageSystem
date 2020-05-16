import ContainerComponentObject from 'CMSManage/Component/Components/BaseContainerComponent'
import PageLeafComponentObject from 'CMSManage/Component/Components/BasePageLeafComponent'
import BaseLeafComponentObject from 'CMSManage/Component/Components/BaseLeafComponent'
import CreatePageComponentService from 'CMSManage/Models/Pages/CreatePageComponentService'

class CreateComponentService{
    createComponent(pageComponents, componentDescribe, parentSign){
        var timetamp = Number(new Date());
        while (true) {
            if (!pageComponents.some(item => item.sign === timetamp)) {
                break;
            }

            timetamp = Number(new Date());
        }

        let pageComponent;
        if (componentDescribe.componentObject instanceof ContainerComponentObject) 
        {
            pageComponent = CreatePageComponentService.createCompositeComponent(timetamp, componentDescribe.name)
        }
        else if(componentDescribe.componentObject instanceof PageLeafComponentObject)
        {
            pageComponent = CreatePageComponentService.createPageLeafComponent(timetamp, componentDescribe.name)
        }
        else if((componentDescribe.componentObject instanceof BaseLeafComponentObject))
        {
            pageComponent = CreatePageComponentService.createLeafComponent(timetamp, componentDescribe.name)
        }
        else
        {
            throw new Error("无法识别的组件类型");
        }

        pageComponent.parentSign = parentSign;

        return pageComponent;
    }
}

const service  = new CreateComponentService();

export default service;