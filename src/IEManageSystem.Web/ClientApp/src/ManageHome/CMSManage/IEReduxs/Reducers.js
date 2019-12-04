import {
    PageAddComponent, 
    PageRemoveComponent, 
    PageEditComponent,
    PagesReceive,
    PageComponentReceive,
    PageDatasReceive,
    ComponentDatasReceive,
    ComponentDataUpdateReceive,
    ComponentDataUpdate} from './Actions'

function pageComponents(state = [], action){
    switch(action.type){
        case PageAddComponent:
            return [...state, action.pageComponent]
        case PageRemoveComponent:
            return state.filter(item => item.sign != action.pageComponent.sign);
        case PageEditComponent:
            let newState = state.map(item => {
                if(item.sign == action.pageComponent.sign){
                    return action.pageComponent;
                }
                return item;
            })
            return newState
        case PageComponentReceive:
            return action.data.pageComponents
        default:
            return state;
    }
}

// 页面Reducer
function page(state = {
    pages:[],
    resourceNum:0,
    pageIndex: 1,
    pagesDidInvalidate: true
}, action)
{
    switch(action.type){
        case PagesReceive:
            return {...state, ...{
                pages:action.data.pages,
                resourceNum: action.data.resourceNum,
                pageIndex: action.data.pageIndex,
                pagesDidInvalidate: false
            }};
        default:
            return state;
    }
}

function pageData(state = {
    pageDatas:[],
    resourceNum: 0,
    pageIndex: 1,
    pageDatasDidInvalidate: false
}, action){
    switch(action.type)
    {
        case PageDatasReceive:
            return {...state, ...{
                pageDatas: action.data.pageDatas,
                resourceNum: action.data.resourceNum,
                pageIndex: action.data.pageIndex,
                pageDatasDidInvalidate: false
            }}
        default:
            return state;
    }
}

function componentData(state = {
    componentDatas:[],
    componentDatasDidInvalidate: false
}, action){
    switch(action.type)
    {
        case ComponentDatasReceive:
            return {...state, ...{
                componentDatas: action.data.componentDatas,
                componentDatasDidInvalidate: false
            }}
        case ComponentDataUpdateReceive:
            return {...state, ...{
                componentDatasDidInvalidate: true
            }}
        case ComponentDataUpdate:
            let index = state.componentDatas.findIndex(e=>e.sign == action.resource.sign);
            if(index == -1){
                state.componentDatas.push(action.resource);
            }
            else{
                state.componentDatas[index] = action.resource;
            }
            
            return {...state, ...{
                componentDatas: state.componentDatas
            }}
        default:
            return state;
    }
}

export function reducer(state = {
}, action)
{
    return Object.assign({}, state, 
    {
        page:page(state.page, action),
        pageComponents: pageComponents(state.pageComponents, action),
        pageData:pageData(state.pageData, action),
        componentData: componentData(state.componentData, action)
    })
}