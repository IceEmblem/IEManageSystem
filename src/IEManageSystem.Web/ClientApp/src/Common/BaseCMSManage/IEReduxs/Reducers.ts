import {
    SetActiveComponent,
    PageDataReceive,
} from './Actions'
import {
    FetchAction
} from 'Core/IEReduxs/Actions'
import pageReducer from './Pages/Reducer';
import pageComponentReducer from './PageComponents/Reducer';
import defaultComponentDataReducer from './DefaultComponentDatas/Reducer';
import pageDataReducer from './PageDatas/Reducer';
import contentComponentDataReducer from './ContentComponentDatas/Reducer';
import menuReducer from './Menus/Reducer'

function activePageComponentSign(state: "", action: any) {
    if (action.type == SetActiveComponent) {
        return action.activePageComponentSign
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
            pageComponents: pageComponentReducer(state.pageComponents, action),
            defaultComponentDatas: defaultComponentDataReducer(state.defaultComponentDatas, action),
            pageDatas: pageDataReducer(state.pageDatas, action),
            pageDataNameToIds: pageDataNameToIds(state.pageDataNameToIds, action),
            contentComponentDatas: contentComponentDataReducer(state.contentComponentDatas, action),
            activePageComponentSign: activePageComponentSign(state.activePageComponentSign, action),
            menus: menuReducer(state.menus, action),
        })
}