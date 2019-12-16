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
    // 添加组件
    if (action.type == PageAddComponent) {
        let maxSortIndex = 0;
        if(state.pageComponents.length > 0){
            maxSortIndex = state.pageComponents[state.pageComponents.length - 1].sortIndex;
        }
        action.pageComponent.sortIndex = maxSortIndex + 1;
        state.pageComponents.push(action.pageComponent);
        return {...state};
    }

    // 移除组件
    if (action.type == PageRemoveComponent) {
        state.pageComponents = state.pageComponents.filter(item => item.sign != action.pageComponent.sign);
        return {...state};
    }

    // 编辑组件
    if (action.type == PageEditComponent) {
        state.pageComponents = state.pageComponents.map(item => {
            if (item.sign == action.pageComponent.sign) {
                return action.pageComponent;
            }
            return item;
        });
        pageComponentSort(state.pageComponents);

        return {...state};
    }

    // 页面接收
    if (action.type == PageReceive) {
        // 对接收的组件按sortIndex进行排序
        pageComponentSort(action.data.page.pageComponents)

        return action.data.page;
    }

    return state;
}

// 插入排序
function pageComponentSort(arr: Array<PageComponentModel>) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex].sortIndex > current.sortIndex) {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
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