import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import { ieReduxFetch } from 'Core/IEReduxFetch'
import { pageFetch, pageDataFetch } from 'BaseCMSManage/IEReduxs/Actions'

export const mapStateToProps = (state, ownProps) => {
    return {
        pageComponent: ownProps.currentPageAndPost.pageComponents[ownProps.sign],
        page: ownProps.currentPageAndPost.page,
        pageData: ownProps.currentPageAndPost.pageData,
    }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchPageFreshen: (pageName, pageDataName) => {
            let promises = [dispatch(pageFetch(pageName, true))];
            if (pageDataName && pageDataName != "") {
                promises.push(dispatch(pageDataFetch(pageName, pageDataName)));
            }
            return Promise.all(promises);
        }
    }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        pageFreshen: () => {
            let pageName = stateProps.page.name;
            let pageDataName = stateProps.pageData ? stateProps.pageData.name : undefined;
            return  dispatchProps.dispatchPageFreshen(pageName, pageDataName);
        },
        execLogic: (requestData) => {
            let postData = {
                logicName: stateProps.pageComponent.name,
                pageName: stateProps.page.name,
                pageComponentSign: stateProps.pageComponent.sign,
                pageDataName: stateProps.pageData ? stateProps.pageData.name : undefined,
                // 有些组件没有组件数据
                contentComponentDataSign: stateProps.contentComponentData ? stateProps.contentComponentData.sign : "",
                request: requestData
            };
    
            return ieReduxFetch("/api/LogicExec/ExecLogic", postData);
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
    mergeProps
)

export default Contain;