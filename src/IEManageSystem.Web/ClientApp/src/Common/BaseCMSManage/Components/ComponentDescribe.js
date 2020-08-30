import React from 'react'
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

    createPageComponent(parentSign, os) {
        var timetamp = new Date().getTime();

        let pageComponent = CreatePageComponentService.createComponent(timetamp, this.name, os);

        pageComponent.parentSign = parentSign;

        return pageComponent;
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