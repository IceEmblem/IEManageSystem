import CmsRedux from '../../../../IEReduxs/CmsRedux'
import { pageFetch, pageDataFetch } from 'CMSManage/IEReduxs/Actions'
import ComponentContainer from '../BaseComponent/ComponentContainer';

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageComponent = state.pageComponents[ownProps.pageId][ownProps.sign];
    let defaultComponentData = state.defaultComponentDatas[ownProps.pageId][ownProps.sign];
    let contentComponentData = undefined;

    if(ownProps.pageDataId){
        contentComponentData = state.contentComponentDatas[ownProps.pageDataId][ownProps.sign]
    }

    return {
        pageComponent: pageComponent,
        defaultComponentData: defaultComponentData,
        contentComponentData: contentComponentData,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
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

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ComponentContainer)

export default Contain;