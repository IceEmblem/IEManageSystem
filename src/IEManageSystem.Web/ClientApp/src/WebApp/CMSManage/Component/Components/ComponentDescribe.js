import React from 'react'
import ContainerComponentObject from 'CMSManage/Component/Components/BaseComponents/BaseContainerComponent'
import PageLeafComponentObject from 'CMSManage/Component/Components/BaseComponents/BasePageLeafComponent'
import BaseLeafComponentObject from 'CMSManage/Component/Components/BaseComponents/BaseLeafComponent'
import BaseMenuComponentObject from 'CMSManage/Component/Components/BaseComponents/BaseMenuComponent'
import BaseContentLeafComponent from 'CMSManage/Component/Components/BaseComponents/BaseContentLeafComponent'
import CreatePageComponentService from 'CMSManage/Models/Pages/CreatePageComponentService'

export const componentType = {
    container: "container",
    nav: "nav",
    menu: "menu",
    page: "page",
    text: "text",
    graph: "graph",
    other: "other"
}

// 组件描述，每个自定义的组件都应该以组件描述的形式导出
export default class ComponentDescribe {
    constructor(name, componentObject, type = componentType.other, displayName = null) {
        if (!name) {
            throw new Error("name 是必须的");
        }

        if (!componentObject) {
            throw new Error("componentObject 是必须的");
        }

        this.name = name;
        this.componentObject = componentObject;
        this.componentType = type;
        this.displayName = displayName || name;
        this.logicCode = undefined;
        this.defauleStyle = {};
    }

    createPageComponent(parentSign) {
        var timetamp = new Date().getTime();

        let pageComponent;
        if (this.componentObject instanceof ContainerComponentObject) {
            pageComponent = CreatePageComponentService.createCompositeComponent(timetamp, this.name)
        }
        else if (this.componentObject instanceof PageLeafComponentObject) {
            pageComponent = CreatePageComponentService.createPageLeafComponent(timetamp, this.name)
        }
        else if ((this.componentObject instanceof BaseLeafComponentObject)) {
            pageComponent = CreatePageComponentService.createLeafComponent(timetamp, this.name)
        }
        else if ((this.componentObject instanceof BaseMenuComponentObject)) {
            pageComponent = CreatePageComponentService.createMenuComponent(timetamp, this.name)
        }
        else {
            throw new Error("无法识别的组件类型");
        }

        pageComponent.parentSign = parentSign;

        this.componentObject.ComponentSettingConfigs.forEach(element => {
            pageComponent.pageComponentSettings.push(
                { id: 0, name: element.name, displayName: element.displayName, singleDatas: [] }
            );
        });

        return pageComponent;
    }

    isExistComponentData() {
        if (this.componentObject instanceof BaseContentLeafComponent) {
            return true;
        }

        return false;
    }

    isExistChildComponent() {
        return (this.componentObject instanceof ContainerComponentObject);
    }

    // 生成 React 组件
    createComponent(pageId, pageDataId, sign, childs) {
        return <this.componentObject.ComponentContainer
            pageId={pageId}
            pageDataId={pageDataId}
            sign={sign}
        >
            {childs}
        </this.componentObject.ComponentContainer>
    }
}