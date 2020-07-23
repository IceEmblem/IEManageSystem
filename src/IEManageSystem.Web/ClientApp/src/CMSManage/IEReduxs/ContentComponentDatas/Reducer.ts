import {
    ComponentDataUpdate,
    ComponentDataUpdateAction
} from './Action'
import {
    PageDataReceive
} from '../Actions'
import ComponentDataModel from '../../Models/ComponentDataModel'
import SingleDataModel from '../../Models/SingleDataModel'

function setComponentDataModel(componentDataData: any){
    componentDataData.__proto__ =  ComponentDataModel.prototype;
    componentDataData.singleDatas.forEach(singleData => {
        singleData.__proto__ =  SingleDataModel.prototype;
    });
}

function componentDataUpdate(state, action: ComponentDataUpdateAction){
    let contentComponentDatas = state[action.pageDataId];
    contentComponentDatas[action.componentData.sign] = action.componentData;
    setComponentDataModel(contentComponentDatas[action.componentData.sign]);

    return state;
}

function pageDataReceive(state, action: any){
    let newState = {...state};

    let contentComponentDatas = {};
    action.data.contentComponentDatas.forEach((element: any) => {
        contentComponentDatas[element.sign] = element;
        setComponentDataModel(contentComponentDatas[element.sign]);
    });

    newState[action.data.pageData.id] = contentComponentDatas;

    return newState;
}

export default function reducer(state = {}, action){
    if(action.type == ComponentDataUpdate){
        return componentDataUpdate(state, action);
    }

    if(action.type == PageDataReceive){
        return pageDataReceive(state, action);
    }

    return state;
}