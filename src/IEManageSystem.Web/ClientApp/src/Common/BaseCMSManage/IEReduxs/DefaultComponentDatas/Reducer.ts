import {
    DefaultComponentDataUpdate,
    DefaultComponentDataUpdateAction
} from './Action'
import {
    PageReceive
} from '../Actions'
import {
    FetchAction
} from 'Core/IEReduxs/Actions'
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

    // 页面接收
    if (action.type == PageReceive) {
        return pageReceive(state, action);
    }

    return state;
}