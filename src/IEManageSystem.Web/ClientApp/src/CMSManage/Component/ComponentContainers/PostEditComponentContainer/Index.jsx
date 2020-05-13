import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import BaseContentLeafComponent from 'CMSManage/Component/Components/BaseContentLeafComponent'
import { componentDataUpdate, pageFetch, pageDataFetch } from 'CMSManage/IEReduxs/Actions'

import './Index.css'
import BaseComponentContainer from '../BaseComponentContainer'

import EditFrame from './EditFrame'

class PostEditComponentContainer extends BaseComponentContainer {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }

        // 如果内容组件没有数据对象，则申请一个数据对象
        if ((this.componentObject instanceof BaseContentLeafComponent) &&
            !this.props.contentComponentData) 
        {
            this.props.componentDataUpdate({
                id: 0,
                sign: this.props.pageComponent.sign,
                singleDatas: []
            });
        }

        this.submit = this.submit.bind(this);
    }

    submit(resource) {
        this.props.componentDataUpdate(resource);
        this.setState({ show: false });
    }

    createChildComponent() {
        return this.props.childPageComponents.map(item => (
            <Contain
                key={item.sign}
                pageComponent={item}
            >
            </Contain>)
        );
    }

    getTools() {
        let pageComponent = this.props.pageComponent;

        // 基本内容叶子组件才提供组件数据编辑
        // 需要有组件数据对象才提供数据编辑
        if (
            !(this.componentObject instanceof BaseContentLeafComponent) ||
            !this.props.contentComponentData
        ) 
        {
            return;
        }

        let tools = [];
        tools.push(
            <EditFrame
                key={"editFrame"}
                show={this.state.show}
                close={() => { this.setState({ show: false }) }}
                submit={this.submit}
                componentData={this.props.contentComponentData}
                componentObject={this.componentObject}
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

    execLogic(requestData){
        throw new Error("不能在编辑文章时执行逻辑");
    }
}

PostEditComponentContainer.propTypes = {
    pageComponent: PropTypes.object.isRequired,
    childPageComponents: PropTypes.array.isRequired,
    componentDataUpdate: PropTypes.func.isRequired,
    contentComponentData: PropTypes.object,
    page: PropTypes.object.isRequired,
    pageData: PropTypes.object.isRequired,
    pageFreshen: PropTypes.func.isRequired
}

PostEditComponentContainer.defaultProps = {
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    // 新增属性 parentSign
    let childPageComponents = state.page.pageComponents.filter(item => item.parentSign == ownProps.pageComponent.sign);
    let contentComponentData = state.pageData.contentComponentDatas.find(e => e.sign == ownProps.pageComponent.sign)

    return {
        childPageComponents: childPageComponents,
        contentComponentData: contentComponentData,
        page: state.page,
        pageData: state.pageData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        componentDataUpdate: (resource) => {
            dispatch(componentDataUpdate(resource));
        },
        pageFreshen: (pageName, pageDataName) => {
            return Promise.all([dispatch(pageFetch(pageName)), dispatch(pageDataFetch(pageName, pageDataName))]);
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PostEditComponentContainer)

export default Contain;