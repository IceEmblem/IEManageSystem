import {
    DefaultComponentDataUpdate,
    DefaultComponentDataUpdateAction
} from './Action'
import {
    PageReceive
} from '../Actions'
import {
    FetchAction
} from '../../../Core/IEReduxs/Actions'
import {
    PageAddComponent,
    PageRemoveComponent,
    PageEditComponent,
    AddComponentAction,
    RemoveComponentAction,
    EditComponentAction,
} from '../PageComponents/Action'
import ComponentDataModel from '../../Models/ComponentDataModel'
import SingleDataModel from '../../Models/SingleDataModel'

function setComponentDataModel(componentDataData: any){
    componentDataData.__proto__ =  ComponentDataModel.prototype;
    componentDataData.singleDatas.forEach(singleData => {
        singleData.__proto__ =  SingleDataModel.prototype;
    });
}

function defaultComponentDataUpdate(state, action: DefaultComponentDataUpdateAction) {
    let defaultComponentDatas = state[action.pageId];
    defaultComponentDatas[action.sign] = { ...defaultComponentDatas[action.sign], ...action.componentData };
    setComponentDataModel(defaultComponentDatas[action.sign]);

    return state;
}

// 添加组件 case reducer
function addComponent(state, action: AddComponentAction){
    if (!action.isAddDefaultComponentData) {
        return state;
    }

    let defaultComponentDatas = {...state[action.pageId]};

    defaultComponentDatas[action.pageComponent.sign] = {
        id: 0,
        sign: action.pageComponent.sign,
        singleDatas: []
    };
    setComponentDataModel(defaultComponentDatas[action.pageComponent.sign]);

    state[action.pageId] = defaultComponentDatas;

    return state;
}

// 删除组件 case reducer
function removeComponent(state, action: RemoveComponentAction){
    if(!state[action.pageId][action.pageComponentSign]){
        return state;
    }

    // 这里用一个问题，如果删除子组件的默认数据
    let defaultComponentDatas = {...state[action.pageId]};
    delete defaultComponentDatas[action.pageComponentSign];
    state[action.pageId] = defaultComponentDatas;

    return state;
}

// 编辑组件 case reducer
function editComponent(state, action: EditComponentAction){
    if(!state[action.pageId][action.pageComponentSign] || action.pageComponentSign == action.pageComponent.sign){
        return state;
    }

    let defaultComponentDatas = {...state[action.pageId]};
    defaultComponentDatas[action.pageComponent.sign] = {...defaultComponentDatas[action.pageComponentSign], ...{sign: action.pageComponent.sign}};
    delete defaultComponentDatas[action.pageComponentSign];
    setComponentDataModel(defaultComponentDatas[action.pageComponent.sign]);
    
    state[action.pageId] = defaultComponentDatas;

    return state;
}

// 页面接收 case reducer
function pageReceive(state, action: FetchAction){
    let newState = {...state};
    let defaultComponentDatas = {};
    action.data.defaultComponentDatas.forEach((element: any) => {
        let signs = action.data.pageComponents.map(e => e.sign);
        if (signs.some(e => e == element.sign)) {
            element.singleDatas.sort((l, r)=> l.sortIndex - r.sortIndex);
            defaultComponentDatas[element.sign] = element;
            setComponentDataModel(defaultComponentDatas[element.sign]);
        }
    });

    newState[action.data.page.id] = defaultComponentDatas;

    return newState;
}

export default function Reducer(state = {}, action) {
    // 组件数据更新
    if (action.type == DefaultComponentDataUpdate) {
        return defaultComponentDataUpdate(state, action);
    }

    // 添加组件
    if (action.type == PageAddComponent) {
        return addComponent(state, action);
    }

    // 移除组件
    if (action.type == PageRemoveComponent) {
        return removeComponent(state, action)
    }

    // 编辑组件
    if (action.type == PageEditComponent) {
        return editComponent(state, action);
    }

    // 页面接收
    if (action.type == PageReceive) {
        return pageReceive(state, action);
    }

    return state;
}