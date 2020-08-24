import {
    DefaultComponentDataUpdate,
    DefaultComponentDataUpdateAction
} from './Action'
import {
    PageReceive,
    SetPage
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
    let defaultComponentDatas = state[action.pageId];
    defaultComponentDatas[action.sign] = { ...defaultComponentDatas[action.sign], ...action.componentData };
    setComponentDataModel(defaultComponentDatas[action.sign]);

    return state;
}

// 页面接收 case reducer
function pageReceive(state, action: FetchAction) {
    let newState = { ...state };
    let defaultComponentDatas = {};
    action.data.defaultComponentDatas.forEach((element: any) => {
        let signs = action.data.pageComponents.map(e => e.sign);
        if (signs.some(e => e == element.sign)) {
            element.singleDatas.sort((l, r) => l.sortIndex - r.sortIndex);
            defaultComponentDatas[element.sign] = element;
            setComponentDataModel(defaultComponentDatas[element.sign]);
        }
    });

    newState[action.data.page.id] = defaultComponentDatas;

    return newState;
}

// 设置页面 case reducer
function setPage(state, action) {
    // 如果不指定平台，则执行逻辑与界面接收相同
    if (!action.data.os) {
        return pageReceive(state, action);
    }

    let newdatas = {...state[action.data.page.id]}

    // 否则直接数据添加进去即可
    let datas = pageReceive(state, action);
    // 导入的数据不应该覆盖之前的数据，所以旧数据放在后面
    newdatas = {...datas[action.data.page.id], ...newdatas}

    state[action.data.page.id] = newdatas;

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

    return state;
}