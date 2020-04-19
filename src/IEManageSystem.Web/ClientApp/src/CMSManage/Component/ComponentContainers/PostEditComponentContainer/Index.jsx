import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import BaseContentLeafComponent from 'CMSManage/Component/Components/BaseContentLeafComponent'
import { componentDataUpdate } from 'CMSManage/IEReduxs/Actions'

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

    createChildComponent(){
        return this.props.childPageComponents.map(item => (
            <Contain
                key={item.sign}
                pageComponent={item}
            >
            </Contain>)
        );
    }

    getTools()
    {
        let pageComponent = this.props.pageComponent;

        // 基本内容叶子组件才提供组件数据编辑
        if(!(this.componentObject instanceof BaseContentLeafComponent)){
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
                componentData={this.props.contentComponentData}
                componentObject={this.componentObject}
                componentDataConfig={this.componentObject.ComponentDataConfig}
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
    contentComponentData: PropTypes.object
}

PostEditComponentContainer.defaultProps = {
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
        componentDataUpdate: (resource) => {
            dispatch(componentDataUpdate(resource));
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PostEditComponentContainer)

export default Contain;