import {PageReceive} from '../Actions'
import {FetchAction} from 'Core/IEReduxs/Actions'
import PageModel from '../../Models/Pages/PageModel'

function setPageModel(pageData: any){
    pageData.__proto__ =  PageModel.prototype;
}

// 页面接收 case reducer
function pageReceive(state, action: FetchAction){
    let newPages = {...state};
    newPages[action.data.page.name] = action.data.page;
    setPageModel(newPages[action.data.page.name]);
    
    return newPages;
}

export default function reducer(state = {}, action) {
    // 页面接收
    if (action.type == PageReceive) {
        return pageReceive(state, action);
    }

    return state;
}