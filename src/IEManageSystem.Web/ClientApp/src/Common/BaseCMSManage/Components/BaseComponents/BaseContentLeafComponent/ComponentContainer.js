import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import ComponentDataModel from 'BaseCMSManage/Models/ComponentDataModel'

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageId = ownProps.currentPageAndPost.pageId;
    let pageDataId = ownProps.currentPageAndPost.pageDataId;

    let defaultComponentData = state.defaultComponentDatas[pageId][ownProps.sign];
    let contentComponentData = undefined;

    if (pageDataId) {
        contentComponentData = state.contentComponentDatas[pageDataId][ownProps.sign]
    }

    return {
        componentData: contentComponentData || defaultComponentData || ComponentDataModel.CreateDefaultComponentData(ownProps.sign)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
)

export default Contain;