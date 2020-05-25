import {
    PageAddComponent,
    PageRemoveComponent,
    PageEditComponent,
    PageReceive,
    PageDataReceive,
    ComponentDataUpdate
} from './Actions'
import PageModel from 'CMSManage/Models/Pages/PageModel';
import PageDataModel from 'CMSManage/Models/PageDatas/PageDataModel';
import ContentComponentDataModel from '../Models/PageDatas/ContentComponentDataModel';

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
        state.editPageComponent(action.sign, action.pageComponent);

        return state;
    }

    // 页面接收
    if (action.type == PageReceive) {
        return new PageModel(action.data.page);
    }

    return state;
}

function pageData(
    state: PageDataModel = new PageDataModel({
        id: 0,
        name: "initPage",
        title: ""
    }),
    action: any) {
    if (action.type == PageDataReceive) {
        return new PageDataModel(action.data.pageData);
    }

    return state;
}

function contentComponentDatas(state: Array<ContentComponentDataModel> = [],
    action: any) : Array<ContentComponentDataModel>
{
    if (action.type == ComponentDataUpdate) {
        let componentData = new ContentComponentDataModel(action.resource);

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
        action.data.contentComponentDatas.forEach((element:any) => {
            datas.push(new ContentComponentDataModel(element));
        });

        return datas;
    }

    return state;
}

export function reducer(state: any = {
}, action: any) {
    return Object.assign({}, state,
        {
            page: page(state.page, action),
            pageData: pageData(state.pageData, action),
            contentComponentDatas: contentComponentDatas(state.contentComponentDatas, action)
        })
}