import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'

import BaseComponentContainer from '../BaseComponentContainer.jsx'

class FrontCompontContainer extends BaseComponentContainer {
    constructor(props) {
        super(props);
    }

    createChildComponent(){
        return this.props.childPageComponents.map(item => (
            <Contain
                pageComponent={item}
            >
            </Contain>)
        );
    }
}

FrontCompontContainer.propTypes = {
    pageComponent: PropTypes.object.isRequired,
    childPageComponents: PropTypes.array.isRequired,
    contentComponentData: PropTypes.object
}

FrontCompontContainer.defaultProps = {
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    // 新增属性 parentSign
    let childPageComponents = state.page.pageComponents.filter(item => item.parentSign == ownProps.pageComponent.sign);
    let contentComponentData = state.pageData.contentComponentDatas.find(e=>e.sign == ownProps.pageComponent.sign)

    return {
        childPageComponents: childPageComponents,
        contentComponentData: contentComponentData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(FrontCompontContainer)

export default Contain;