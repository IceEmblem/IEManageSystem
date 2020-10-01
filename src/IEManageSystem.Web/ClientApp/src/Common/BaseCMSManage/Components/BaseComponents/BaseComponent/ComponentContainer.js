import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import { ieReduxFetch } from 'Core/IEReduxFetch'
import { pageFetch, pageDataFetch } from 'BaseCMSManage/IEReduxs/Actions'
import PageDataModel from 'BaseCMSManage/Models/PageDatas/PageDataModel'

const pageDataModel = PageDataModel.CreatePageDataModel();

export const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageName = ownProps.currentPageAndPost.pageName;
    let pageDataId = ownProps.currentPageAndPost.pageDataId;
    let os = ownProps.currentPageAndPost.os;

    let pageComponent = state.pageComponents[pageName][os][ownProps.sign];

    return {
        pageComponent: pageComponent,
        page: state.pages[pageName],
        pageData: state.pageDatas[pageDataId] || pageDataModel,
    }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchPageFreshen: (pageName, pageDataName) => {
            let promises = [dispatch(pageFetch(pageName))];
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