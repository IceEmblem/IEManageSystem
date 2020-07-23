import {
    SetActiveComponent,
    PageReceive,
    PageDataReceive,
} from './Actions'
import {
    PageAddComponent
} from './PageComponents/Action';
import {
    FetchAction
} from '../../Core/IEReduxs/Actions'
import pageReducer from './Pages/Reducer';
import pageComponentReducer from './PageComponents/Reducer';
import defaultComponentDataReducer from './DefaultComponentDatas/Reducer';
import pageDataReducer from './PageDatas/Reducer';
import contentComponentDataReducer from './ContentComponentDatas/Reducer';

function activePageComponentSign(state: "", action: any) {
    if (action.type == SetActiveComponent) {
        return action.activePageComponentSign
    }

    // 添加组件
    if (action.type == PageAddComponent) {
        return action.pageComponent.sign;
    }

    return state;
}

function pageNameToIds(state:any = {}, action: any){
    if(action.type == PageReceive){
        let fetchAction = action as FetchAction;
        let newState = {...state};
        newState[fetchAction.data.page.name] = fetchAction.data.page.id;
        return newState;
    }

    return state;
}

function pageDataNameToIds(state:any = {}, action: any){
    if(action.type == PageDataReceive){
        let fetchAction = action as FetchAction;
        let newState = {...state};
        newState[fetchAction.data.pageData.name] = fetchAction.data.pageData.id;
        return newState;
    }

    return state;
}

export function reducer(state: any = {
}, action: any) {
    return Object.assign({}, state,
        {
            pages: pageReducer(state.pages, action),
            pageNameToIds: pageNameToIds(state.pageNameToIds, action),
            pageComponents: pageComponentReducer(state.pageComponents, action),
            defaultComponentDatas: defaultComponentDataReducer(state.defaultComponentDatas, action),
            pageDatas: pageDataReducer(state.pageDatas, action),
            pageDataNameToIds: pageDataNameToIds(state.pageDataNameToIds, action),
            contentComponentDatas: contentComponentDataReducer(state.contentComponentDatas, action),
            activePageComponentSign: activePageComponentSign(state.activePageComponentSign, action),
        })
}