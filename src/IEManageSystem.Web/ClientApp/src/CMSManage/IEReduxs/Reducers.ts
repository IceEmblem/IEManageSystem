import {
    PageAddComponent,
    PageRemoveComponent,
    PageEditComponent,
    PageReceive,
    PageDataReceive,
    ComponentDataUpdate,
    DefaultComponentDataUpdate,
    PageDataClear,
} from './Actions'
import PageModel from '../Models/Pages/PageModel'
import PageDataModel from '../Models/PageDatas/PageDataModel'
import ComponentDataModel from '../Models/ComponentDataModel';

function page(
    state: PageModel = new PageModel({
        id: 0,
        name: "initPage",
        displayName: "初始化页面",
        description: "",
        pageType: "StaticPage",
        pageComponents: []
    }),
    action: any) {
    // 添加组件
    if (action.type == PageAddComponent) {
        state.addPageComponent(action.pageComponent);
        return state;
    }

    // 移除组件
    if (action.type == PageRemoveComponent) {
        state.removePageComponent(action.pageComponent);
        return state;
    }

    // 编辑组件
    if (action.type == PageEditComponent) {
        state.editPageComponent(action.pageComponent);

        return state;
    }

    // 页面接收
    if (action.type == PageReceive) {
        return new PageModel(action.data.page);
    }

    return state;
}

function defaultComponentDatas(
    state: Array<ComponentDataModel> = [],
    action: any): Array<ComponentDataModel> {
    if (action.type == DefaultComponentDataUpdate) {
        let componentData = new ComponentDataModel(action.resource);

        let index = state.findIndex(e => e.sign == componentData.sign);
        if (index == -1) {
            state.push(componentData);
        }
        else {
            state[index] = componentData;
        }

        return state;
    }

    // 添加组件
    if (action.type == PageAddComponent) {
        if(!action.isAddDefaultComponentData){
            return state;
        }

        let componentData = new ComponentDataModel({
            id: 0,
            sign: action.pageComponent.sign,
            singleDatas: []
        });

        state.push(componentData);
        return state;
    }

    // 移除组件
    if (action.type == PageRemoveComponent) {
        let childs = action.pageComponent.getAllChilds().map(e=>e.sign);

        let reomveItems = [action.pageComponent.sign, ...childs];

        state = state.filter(e => !reomveItems.some(ie => ie == e.sign));

        return state;
    }

    // 编辑组件
    if (action.type == PageEditComponent) {
        let index = state.findIndex(e => e.sign == action.sign);
        if (index < 0) {
            return state;
        }
        state[index].sign = action.pageComponent.sign;

        return state;
    }

    if (action.type == PageReceive) {
        let datas = [];
        action.data.defaultComponentDatas.forEach((element: any) => {
            let signs = action.data.page.pageComponents.map(e=>e.sign);
            if(signs.some(e=>e==element.sign)){
                datas.push(new ComponentDataModel(element));
            }
        });

        return datas;
    }

    return state;
}

function pageData(
    state: PageDataModel = new PageDataModel({
        id: 0
    }),
    action: any) {
    if (action.type == PageDataReceive) {
        return new PageDataModel(action.data.pageData);
    }

    if(action.type == PageDataClear){
        return new PageDataModel({
            id: 0
        });
    }

    return state;
}

function contentComponentDatas(state: Array<ComponentDataModel> = [],
    action: any): Array<ComponentDataModel> {
    if (action.type == ComponentDataUpdate) {
        let componentData = new ComponentDataModel(action.resource);

        let index = state.findIndex(e => e.sign == componentData.sign);
        if (index == -1) {
            state.push(componentData);
        }
        else {
            state[index] = componentData;
        }

        return state;
    }

    if (action.type == PageDataReceive) {
        let datas = [];
        action.data.contentComponentDatas.forEach((element: any) => {
            datas.push(new ComponentDataModel(element));
        });

        return datas;
    }

    if(action.type == PageDataClear){
        return [];
    }

    return state;
}

export function reducer(state: any = {
}, action: any) {
    return Object.assign({}, state,
        {
            page: page(state.page, action),
            defaultComponentDatas: defaultComponentDatas(state.defaultComponentDatas, action),
            pageData: pageData(state.pageData, action),
            contentComponentDatas: contentComponentDatas(state.contentComponentDatas, action)
        })
}