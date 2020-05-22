import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import BaseContentLeafComponent from 'CMSManage/Component/Components/BaseComponents/BaseContentLeafComponent'
import { componentDataUpdate, pageFetch, pageDataFetch } from 'CMSManage/IEReduxs/Actions'

import './index.css'
import BaseComponentContainer from '../BaseComponentContainer'

import EditFrame from './EditFrame'

import { Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

class PostEditComponentContainer extends BaseComponentContainer {
    constructor(props) {
        super(props);

        this.state = {
            show: false
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
        if (!(this.componentObject instanceof BaseContentLeafComponent)) {
            return;
        }

        // 如果内容组件没有数据对象，则申请一个数据对象
        if (!this.props.contentComponentData) {
            this.props.componentDataUpdate({
                id: 0,
                sign: this.props.pageComponent.sign,
                singleDatas: []
            });
            return;
        }

        let tools = [];
        tools.push(
            <EditFrame
                key={"editFrame"}
                title={this.componentDescribe.name}
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
                <Tooltip title="编辑数据">
                    <Button type="primary" shape="circle" icon={<EditOutlined />}
                        onClick={
                            () => { this.setState({ show: true }) }
                        }
                    />
                </Tooltip>
            </div>
        );

        return tools;
    }

    execLogic(requestData) {
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