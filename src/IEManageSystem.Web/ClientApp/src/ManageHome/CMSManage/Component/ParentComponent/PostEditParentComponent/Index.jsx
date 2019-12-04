import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import {BaseContainerComponent} from 'CMSManage/Component/Components/BaseContainerComponent'
import {BasePageLeafComponent} from 'CMSManage/Component/Components/BasePageLeafComponent'

import './Index.css'
import BaseParentComponent from '../BaseParentComponent.jsx'

import ComponentFactory from '../../Components/ComponentFactory'

import EditFrame from './EditFrame.jsx'

class PostEditParentComponent extends BaseParentComponent {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }

        this.submit = this.submit.bind(this);
    }

    submit(resource){
        this.props.componentDataUpdate(resource);
        this.setState({show: false});
    }

    createChildrenComponent() 
    {
        let pageComponent = this.props.pageComponent;

        let componentDescribe = new ComponentFactory().getComponentDescribeForName(pageComponent.name);
        let childrens = this.props.childPageComponents.map(item => (
            <Contain
                pageComponent={item}
                componentDataUpdate={this.props.componentDataUpdate}
            >
            </Contain>)
        );

        // componentDescribe.componentObject.Component （指定的组件类类型）
        return (
            <componentDescribe.componentObject.Component
                componentData={this.getComponentData()}
                pageComponentSettings={this.getPageComponentSettings() || []}
                targetPageId={pageComponent.targetPageId}
            >{childrens}</componentDescribe.componentObject.Component>)
    }

    getTools()
    {
        let pageComponent = this.props.pageComponent;
        let componentDescribe = new ComponentFactory().getComponentDescribeForName(pageComponent.name);
        
        // 容器组件和页叶子组件不提供组件数据
        if(componentDescribe.componentObject.Component.prototype instanceof BaseContainerComponent ||
            componentDescribe.componentObject.Component.prototype instanceof BasePageLeafComponent){
            return;
        }

        let tools = [];
        tools.push(
            <EditFrame
                key={"editFrame"}
                show={this.state.show}
                close={()=>{this.setState({show: false})}}
                submit={this.submit}
                pageComponent={pageComponent}
                componentData={this.getComponentData()}
                config={componentDescribe.componentObject.ComponentDataConfigs}
            ></EditFrame>);
        tools.push(
            <div className="parentcomponent-btns"
                key={"editFrameBtn"}
            >
                    <button type="button" className="btn btn-info btn-sm"
                        onClick={
                            () => { this.setState({ show: true }) }
                        }
                    >
                        <span className="oi oi-pencil" title="icon name" aria-hidden="true"></span>
                    </button>
                </div>
        );

        return tools;
    }
}

PostEditParentComponent.propTypes = {
    pageComponent: PropTypes.object.isRequired,
    childPageComponents: PropTypes.array.isRequired,
    componentDataUpdate: PropTypes.func.isRequired,
    componentDatas: PropTypes.array
}

PostEditParentComponent.defaultProps = {
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
)(PostEditParentComponent)

export default Contain;