import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import ComponentDataModel from 'BaseCMSManage/Models/ComponentDataModel'
import * as BaseComponentContainer from '../BaseComponent/ComponentContainer'

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let defaultComponentData = state.defaultComponentDatas[ownProps.pageId][ownProps.sign];
    let contentComponentData = undefined;

    if (ownProps.pageDataId) {
        contentComponentData = state.contentComponentDatas[ownProps.pageDataId][ownProps.sign]
    }

    return {
        ...BaseComponentContainer.mapStateToProps(state, ownProps),
        componentData: contentComponentData || defaultComponentData || ComponentDataModel.CreateDefaultComponentData(ownProps.sign)
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    BaseComponentContainer.mapDispatchToProps,
    BaseComponentContainer.mergeProps
)

export default Contain;