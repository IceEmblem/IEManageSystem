import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'

import BaseParentComponent from '../BaseParentComponent.jsx'

import ComponentFactory from '../../Components/ComponentFactory'

class FrontParentCompont extends BaseParentComponent {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    createChildrenComponent() 
    {
        let pageComponent = this.props.pageComponent;

        let componentDescribe = new ComponentFactory().getComponentDescribeForName(pageComponent.name);

        let childrens = this.props.childPageComponents.map(item => (
            <Contain
                pageComponent={item}
            >
            </Contain>)
        );

        return (
            <componentDescribe.componentObject.Component
                componentData={this.getComponentData()}
                pageComponentSettings={this.getPageComponentSettings() || []}
                targetPageId={pageComponent.targetPageId}
            >{childrens}</componentDescribe.componentObject.Component>)
    }
}

FrontParentCompont.propTypes = {
    pageComponent: PropTypes.object.isRequired,
    childPageComponents: PropTypes.array.isRequired,
    componentDatas: PropTypes.array
}

FrontParentCompont.defaultProps = {
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    // 新增属性 parentSign
    let childPageComponents = state.pageComponents.filter(item => item.parentSign == ownProps.pageComponent.sign);

    return {
        childPageComponents: childPageComponents,
        componentDatas: state.componentData.componentDatas
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(FrontParentCompont)

export default Contain;