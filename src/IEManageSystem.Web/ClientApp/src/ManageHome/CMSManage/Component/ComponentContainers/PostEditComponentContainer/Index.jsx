import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import ContainerComponentObject from 'CMSManage/Component/Components/BaseContainerComponent'
import PageLeafComponentObject from 'CMSManage/Component/Components/BasePageLeafComponent'

import './Index.css'
import BaseComponentContainer from '../BaseComponentContainer'

import EditFrame from './EditFrame'

class PostEditComponentContainer extends BaseComponentContainer {
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

        let childrens = this.props.childPageComponents.map(item => (
            <Contain
                pageComponent={item}
                componentDataUpdate={this.props.componentDataUpdate}
            >
            </Contain>)
        );

        // componentObject.Component （指定的组件类类型）
        return this.componentObject.Component({
            componentData:this.getComponentData(),
            pageComponentSettings:this.getPageComponentSettings() || [],
            targetPageId:pageComponent.targetPageId
        }, childrens)
    }

    getTools()
    {
        let pageComponent = this.props.pageComponent;

        // 容器组件和页叶子组件不提供组件数据
        if(this.componentObject instanceof ContainerComponentObject ||
            this.componentObject instanceof PageLeafComponentObject){
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
                config={this.componentObject.ComponentDataConfigs}
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

PostEditComponentContainer.propTypes = {
    pageComponent: PropTypes.object.isRequired,
    childPageComponents: PropTypes.array.isRequired,
    componentDataUpdate: PropTypes.func.isRequired,
    componentDatas: PropTypes.array
}

PostEditComponentContainer.defaultProps = {
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
)(PostEditComponentContainer)

export default Contain;