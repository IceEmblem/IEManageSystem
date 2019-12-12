import {
    PageAddComponent, 
    PageRemoveComponent, 
    PageEditComponent,
    PageComponentReceive,
    ComponentDatasReceive,
    ComponentDataUpdateReceive,
    ComponentDataUpdate} from './Actions'

function pageComponents(state:Array<PageComponentModel> = [], action:any){
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

function componentData(state = {
    componentDatas:new Array<ContentComponentDataModel>(),
    componentDatasDidInvalidate: false
}, action:any){
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

export function reducer(state:any = {
}, action:any)
{
    return Object.assign({}, state, 
    {
        pageComponents: pageComponents(state.pageComponents, action),
        componentData: componentData(state.componentData, action)
    })
}