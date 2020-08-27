import React from 'react'
import ContainerComponentObject from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent'
import PageLeafComponentObject from 'BaseCMSManage/Components/BaseComponents/BasePageLeafComponent'
import BaseLeafComponentObject from 'BaseCMSManage/Components/BaseComponents/BaseLeafComponent'
import BaseMenuComponentObject from 'BaseCMSManage/Components/BaseComponents/BaseMenuComponent'
import BaseContentLeafComponent from 'BaseCMSManage/Components/BaseComponents/BaseContentLeafComponent'
import CreatePageComponentService from 'BaseCMSManage/Models/Pages/CreatePageComponentService'

export const componentType = {
    container: "container",
    nav: "nav",
    menu: "menu",
    page: "page",
    text: "text",
    graph: "graph",
    other: "other"
}

var InvalidOSComponentType = undefined;

// 组件描述，每个自定义的组件都应该以组件描述的形式导出
export default class ComponentDescribe {
    static setInvalidOSComponentType(componentType) {
        InvalidOSComponentType = componentType;
    }

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
        this.defauleStyle = { minHeight: 20 };
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
    createComponent(pageId, os, pageDataId, sign, childs) {
        let ComponentContainer = this.componentObject.getComponentContainer();

        if (!ComponentContainer) {
            return <InvalidOSComponentType />;
        }

        return <ComponentContainer
            pageId={pageId}
            os={os}
            pageDataId={pageDataId}
            sign={sign}
        >
            {childs}
        </ComponentContainer>
    }
}