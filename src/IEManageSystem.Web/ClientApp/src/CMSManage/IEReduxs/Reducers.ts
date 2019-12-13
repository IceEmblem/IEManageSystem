import {
    PageAddComponent,
    PageRemoveComponent,
    PageEditComponent,
    PageReceive,
    PageDataReceive,
    ComponentDataUpdate
} from './Actions'

function page(
    state: PageModel = {
        id:0,
        name:"initPage",
        displayName:"初始化页面",
        description:"",
        pageType:"StaticPage",
        pageComponents:[]
    }, 
    action: any) 
{
    if (action.type == PageAddComponent) {
        state.pageComponents.push(action.pageComponent);
        return {...state};
    }

    if (action.type == PageRemoveComponent) {
        state.pageComponents = state.pageComponents.filter(item => item.sign != action.pageComponent.sign);
        return {...state};
    }

    if (action.type == PageEditComponent) {
        state.pageComponents = state.pageComponents.map(item => {
            if (item.sign == action.pageComponent.sign) {
                return action.pageComponent;
            }
            return item;
        })
        return {...state};
    }

    if (action.type == PageReceive) {
        return action.data.page;
    }

    return state;
}

function pageData(
    state: PageDataModel = {
        id:0,
        name:"initPage",
        title:"",
        contentComponentDatas:[]
    }, 
    action: any) 
{
    if (action.type == ComponentDataUpdate) {
        let index = state.contentComponentDatas.findIndex(e => e.sign == action.resource.sign);
        if (index == -1) {
            state.contentComponentDatas.push(action.resource);
        }
        else {
            state.contentComponentDatas[index] = action.resource;
        }

        return {...state};
    }

    if(action.type == PageDataReceive){
        return action.data.pageData;
    }

    return state;
}

export function reducer(state: any = {
}, action: any) {
    return Object.assign({}, state,
        {
            page: page(state.page, action),
            pageData: pageData(state.pageData, action)
        })
}