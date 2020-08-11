import {
    PageAddComponent,
    PageRemoveComponent,
    PageEditComponent,
    AddComponentAction,
    RemoveComponentAction,
    EditComponentAction,
    RootComponentSign,
    CopyComponent,
    CopyComponentAction,
} from './Action';
import { PageReceive } from '../Actions'
import CreatePageComponentService from '../../Models/Pages/CreatePageComponentService'
import PageComponentModel, { PageComponentOSType } from '../../Models/Pages/PageComponentModel'
import PageComponentSettingModel from '../../Models/Pages/PageComponentSettingModel'
import SingleDataModel from '../../Models/SingleDataModel'
import IETool from 'Core/ToolLibrary/IETool'

function setPageComponentModel(pageComponentData: any) {
    pageComponentData.__proto__ = PageComponentModel.prototype;
    pageComponentData.pageComponentSettings.forEach(pageComponentSetting => {
        pageComponentSetting.__proto__ = PageComponentSettingModel.prototype;
        pageComponentSetting.singleDatas.forEach(singleData => {
            singleData.__proto__ = SingleDataModel.prototype;
        });
    });
}

// 获取子组件
function getChildComponents(pageComponents: object, sign): object {
    let result = {};
    for (let item of Object.keys(pageComponents)) {
        if (pageComponents[item].parentSign == sign) {
            result[item] = pageComponents[item];
        }
    }

    return result;
}

// 获取父组件
function getParentComponent(pageComponents: object, sign): object {
    return pageComponents[pageComponents[sign].parentSign];
}

// 组件是否有效
function isValidOfComponent(pageComponents: object, parentSign): boolean {
    if (!parentSign) {
        return true;
    }

    let parentComponent = pageComponents[parentSign];
    // 如果如组件有值，但是却没有对应的父组件，返回失效
    if (!parentComponent) {
        return false;
    }

    return isValidOfComponent(pageComponents, parentComponent.parentSign);
}

// 清理失效的组件
function clearInvalidComponent(pageComponents: object): object {
    let result = {};
    for (let item of Object.keys(pageComponents)) {
        if (isValidOfComponent(pageComponents, pageComponents[item].parentSign)) {
            result[item] = pageComponents[item];
        }
    }

    return result;
}

// 设置组件子组件
function setChildComponentSigns(pageComponents: object, pageComponent: any): any {
    let childs = getChildComponents(pageComponents, pageComponent.sign);
    let childsSign = Object.values(childs).sort((l, r) => l.pageComponentBaseSetting.sortIndex - r.pageComponentBaseSetting.sortIndex).map(item => item.sign);

    return { ...pageComponent, ...{ pageComponentSigns: childsSign } };
}

// 添加组件 case reducer
function addComponent(state: object, action: AddComponentAction): object {
    // 页面组件列表
    let pageComponents = { ...state[action.pageId][action.os] };
    if (pageComponents[action.pageComponent.sign]) {
        throw new Error("组件标识已存在");
    }

    // 组件的索引为当前子元素的最大索引 + 1
    let sortIndex = 0;
    let sortIndexs = Object.values(getChildComponents(pageComponents, action.pageComponent.parentSign)).map<number>(e => e.sortIndex);
    if (sortIndexs.length > 0) {
        sortIndex = Math.max(
            ...sortIndexs
        ) + 1;
    }

    // 向页面数组中添加组件
    pageComponents[action.pageComponent.sign] = action.pageComponent;
    pageComponents[action.pageComponent.sign].os = action.os;
    pageComponents[action.pageComponent.sign].pageComponentBaseSetting.sortIndex = sortIndex;
    pageComponents[action.pageComponent.sign] = setChildComponentSigns(pageComponents, pageComponents[action.pageComponent.sign]);
    setPageComponentModel(pageComponents[action.pageComponent.sign]);

    // 更新父元素的子元素数组
    pageComponents[action.pageComponent.parentSign] = setChildComponentSigns(pageComponents, pageComponents[action.pageComponent.parentSign]);
    setPageComponentModel(pageComponents[action.pageComponent.parentSign]);

    // 更新页面组件数组
    state[action.pageId][action.os] = pageComponents;

    return state;
}

// 移除组件 case reducer
function removeComponent(state: object, action: RemoveComponentAction): object {
    // 页面组件列表
    let pageComponents = { ...state[action.pageId][action.os] };

    let parentSign = pageComponents[action.pageComponentSign].parentSign;

    // 删除组件及子组件
    delete pageComponents[action.pageComponentSign];
    pageComponents = clearInvalidComponent(pageComponents);

    // 更新父组件的引用
    pageComponents[parentSign] = setChildComponentSigns(pageComponents, pageComponents[parentSign]);
    setPageComponentModel(pageComponents[parentSign]);

    state[action.pageId][action.os] = pageComponents;

    return state;
}

// 编辑组件 case reducer
function editComponent(state: object, action: EditComponentAction): object {
    // 页面组件列表
    let pageComponents = { ...state[action.pageId][action.os] };

    // 删除原组件
    let parentSign = pageComponents[action.pageComponentSign].parentSign;
    delete pageComponents[action.pageComponentSign];

    if (pageComponents[action.pageComponent.sign]) {
        throw new Error("组件标识已存在");
    }

    // 添加新组件
    pageComponents[action.pageComponent.sign] = action.pageComponent;
    setPageComponentModel(pageComponents[action.pageComponent.sign]);

    // 更新父组件的子组件列表
    pageComponents[parentSign] = setChildComponentSigns(pageComponents, pageComponents[parentSign]);
    setPageComponentModel(pageComponents[parentSign]);

    state[action.pageId][action.os] = pageComponents;

    return state;
}

// 拷贝数据 case reducer
function copyComponent(state: object, action: CopyComponentAction): object {
    // 要操作的页面
    let page = { ...state[action.pageId] };

    page[action.distOS] = IETool.deepCopy(page[action.sourceOS]);
    Object.values(page[action.distOS]).forEach((item: any)=>{
        item.os = action.distOS;
    });

    state[action.pageId] = page;

    return state;
}

function pageReceiveHandle(receivePageComponents) {
    // 页面组件列表
    let pageComponents = {};

    // 如果不存在根组件，则创建一个根组件
    if (!receivePageComponents.some(item => item.sign == RootComponentSign)) {
        pageComponents[RootComponentSign] = CreatePageComponentService.createCompositeComponent(RootComponentSign, "");
        // 将不存在父元素的组件指定到根组件
        receivePageComponents.forEach(element => {
            if (!element.parentSign) {
                element.parentSign = RootComponentSign;
            }
        });
    }

    // 将组件实例 state
    for (let n = 0; n < receivePageComponents.length; n++) {
        let pageComponent = receivePageComponents[n];
        // 对组件设置数据进行排序
        pageComponent.pageComponentSettings.forEach(pageComponentSetting => {
            pageComponentSetting.singleDatas.sort((l, r) => l.sortIndex - r.sortIndex)
        });
        pageComponents[pageComponent.sign] = pageComponent;
    }

    // 设置组件的子组件标识
    for (let key of Object.keys(pageComponents)) {
        pageComponents[key] = setChildComponentSigns(pageComponents, pageComponents[key]);
        setPageComponentModel(pageComponents[key]);
    }

    return pageComponents;
}

// 页面接收 case reducer
function pageReceive(state: object, action): object {
    // 页面组件列表
    let receivePageComponents = action.data.pageComponents;

    // 将不具有平台标识的组件设置为 Web 组件
    action.data.pageComponents.forEach(item => {
        if (!item.os) {
            item.os = PageComponentOSType.Web;
        }
    })

    let webComponents = pageReceiveHandle(receivePageComponents.filter(item => item.os == PageComponentOSType.Web));
    webComponents[RootComponentSign].os = PageComponentOSType.Web;
    let nativeComponents = pageReceiveHandle(receivePageComponents.filter(item => item.os == PageComponentOSType.Native));
    nativeComponents[RootComponentSign].os = PageComponentOSType.Native;

    let newState = { ...state };
    newState[action.data.page.id] = {
        Web: webComponents,
        Native: nativeComponents
    };

    return newState;
}

export default function reducer(state = {}, action) {
    // 添加组件
    if (action.type == PageAddComponent) {
        return addComponent(state, action);
    }

    // 移除组件
    if (action.type == PageRemoveComponent) {
        return removeComponent(state, action);
    }

    // 编辑组件
    if (action.type == PageEditComponent) {
        return editComponent(state, action);
    }

    // 拷贝数据
    if (action.type == CopyComponent) {
        return copyComponent(state, action);
    }

    // 页面接收动作
    if (action.type == PageReceive) {
        return pageReceive(state, action);
    }

    return state;
}