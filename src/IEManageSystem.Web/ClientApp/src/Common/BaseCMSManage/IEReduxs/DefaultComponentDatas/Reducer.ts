import {
    DefaultComponentDataUpdate,
    DefaultComponentDataUpdateAction,
    SetDefaultComponentDatas,
    SetDefaultComponentDatasAction
} from './Action'
import {
    PageReceive,
    SetPage,
} from '../Actions'
import {
    FetchAction
} from 'Core/IEReduxs/Actions'
import ComponentDataModel from '../../Models/ComponentDataModel'
import SingleDataModel from '../../Models/SingleDataModel'

function setComponentDataModel(componentDataData: any) {
    componentDataData.__proto__ = ComponentDataModel.prototype;
    componentDataData.singleDatas.forEach(singleData => {
        singleData.__proto__ = SingleDataModel.prototype;
    });
}

function defaultComponentDataUpdate(state, action: DefaultComponentDataUpdateAction) {
    let defaultComponentDatas = {...state[action.pageName]};
    defaultComponentDatas[action.sign] = { ...defaultComponentDatas[action.sign], ...action.componentData };
    setComponentDataModel(defaultComponentDatas[action.sign]);

    state[action.pageName] = defaultComponentDatas;
    return state;
}

// 页面接收 case reducer
function pageReceive(state, action: FetchAction) {
    let newState = { ...state };
    let defaultComponentDatas = {};
    action.data.defaultComponentDatas.forEach((element: any) => {
        let signs = action.data.pageComponents.map(e => e.sign);
        if (signs.some(e => e == element.sign)) {
            defaultComponentDatas[element.sign] = element;
            setComponentDataModel(defaultComponentDatas[element.sign]);
            defaultComponentDatas[element.sign].sort();
        }
    });

    newState[action.data.page.name] = defaultComponentDatas;

    return newState;
}

// 设置页面 case reducer
function setPage(state, action) {
    // 如果不指定平台，则执行逻辑与界面接收相同
    if (!action.data.os) {
        return pageReceive(state, action);
    }

    let newdatas = {...state[action.data.page.name]}

    // 否则直接数据添加进去即可
    let datas = pageReceive(state, action);
    // 导入的数据不应该覆盖之前的数据，所以旧数据放在后面
    newdatas = {...datas[action.data.page.name], ...newdatas}

    state[action.data.page.name] = newdatas;

    return state;
}

// 设置页面默认数据 case reducer
function setDefaultComponentDatas(state, action: SetDefaultComponentDatasAction) {
    // Object.keys(action.defaultComponentDatas).forEach(key => {
    //     setComponentDataModel(action.defaultComponentDatas[key]);
    // })
    state[action.pageName] = action.defaultComponentDatas;

    return state;
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

    // 设置页面
    if (action.type == SetPage) {
        return setPage(state, action)
    }

    // 设置默认数据
    if(action.type == SetDefaultComponentDatas){
        return setDefaultComponentDatas(state, action);
    }

    return state;
}