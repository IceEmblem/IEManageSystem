import CmsRedux from '../../../../IEReduxs/CmsRedux'
import { ieReduxFetch } from 'Core/IEReduxFetch'
import { pageFetch, pageDataFetch } from 'CMSManage/IEReduxs/Actions'
import PageDataModel from '../../../../Models/PageDatas/PageDataModel'

const pageDataModel = PageDataModel.CreatePageDataModel();

export const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageComponent = state.pageComponents[ownProps.pageId][ownProps.sign];

    return {
        pageComponent: pageComponent,
        page: state.pages[ownProps.pageId],
        pageData: state.pageDatas[ownProps.pageDataId] || pageDataModel,
    }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageFreshen: (pageName, pageDataName) => {
            let promises = [dispatch(pageFetch(pageName))];
            if (pageDataName && pageDataName != "") {
                promises.push(dispatch(pageDataFetch(pageName, pageDataName)));
            }
            return Promise.all(promises);
        }
    }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        ... ownProps,
        pageFreshen: () => {
            let pageName = stateProps.page.name;
            let pageDataName = stateProps.pageData ? stateProps.pageData.name : undefined;
            return  dispatchProps.pageFreshen(pageName, pageDataName);
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