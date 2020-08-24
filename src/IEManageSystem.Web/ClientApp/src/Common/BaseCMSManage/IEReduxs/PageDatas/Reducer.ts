import {
    PageDataReceive,
} from '../Actions'
import {
    FetchAction
} from 'Core/IEReduxs/Actions'
import PageDataModel from '../../Models/PageDatas/PageDataModel'
import TagModel from '../../Models/PageDatas/TagModel'

function setPageDataModel(PageDataData: any){
    PageDataData.__proto__ =  PageDataModel.prototype;
    PageDataData.tags.forEach(tag => {
        tag.__proto__ =  TagModel.prototype;
    });
}

function pageDataReceive(state, action: FetchAction){
    let newState = {...state};
    newState[action.data.pageData.id] = action.data.pageData;
    setPageDataModel(newState[action.data.pageData.id]);

    return newState;
}

export default function reducer(state = {}, action){
    if(action.type == PageDataReceive){
        return pageDataReceive(state, action);
    }

    return state;
}