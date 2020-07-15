import ContainerComponentObject from 'CMSManage/Component/Components/BaseComponents/BaseContainerComponent'
import PageLeafComponentObject from 'CMSManage/Component/Components/BaseComponents/BasePageLeafComponent'
import BaseLeafComponentObject from 'CMSManage/Component/Components/BaseComponents/BaseLeafComponent'
import BaseMenuComponentObject from 'CMSManage/Component/Components/BaseComponents/BaseMenuComponent'
import BaseContentLeafComponent from 'CMSManage/Component/Components/BaseComponents/BaseContentLeafComponent'
import CreatePageComponentService from 'CMSManage/Models/Pages/CreatePageComponentService'
import PageComponentSettingModel from 'CMSManage/Models/Pages/PageComponentSettingModel'

class CreateComponentService{
    createComponent(componentDescribe, parentSign){
        var timetamp = new Date().getTime();

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
        else if((componentDescribe.componentObject instanceof BaseMenuComponentObject))
        {
            pageComponent = CreatePageComponentService.createMenuComponent(timetamp, componentDescribe.name)
        }
        else
        {
            throw new Error("无法识别的组件类型");
        }

        pageComponent.parentSign = parentSign;

        componentDescribe.componentObject.ComponentSettingConfigs.forEach(element => {
            pageComponent.pageComponentSettings.push(
                PageComponentSettingModel.createDefaultSettingData(element.name, element.displayName)
            );
        });

        return pageComponent;
    }

    isExistDefaultComponentData(componentDescribe){
        if(componentDescribe.componentObject instanceof BaseContentLeafComponent){
            return true;
        }

        return false;
    }
}

const service  = new CreateComponentService();

export default service;