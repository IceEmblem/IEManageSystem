import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import BaseContentLeafComponent from 'CMSManage/Component/Components/BaseComponents/BaseContentLeafComponent'
import { componentDataUpdate, pageFetch, pageDataFetch } from 'CMSManage/IEReduxs/Actions'

import './index.css'
import BaseComponentContainer from '../BaseComponentContainer'

import PostEditFrame from '../PostEditFrame'

import { Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

class PostEditComponentContainer extends BaseComponentContainer {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
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

        let tools = [];
        tools.push(
            <PostEditFrame
                key={"editFrame"}
                title={this.componentDescribe.displayName}
                show={this.state.show}
                close={() => { this.setState({ show: false }) }}
                submit={this.props.componentDataUpdate}
                componentData={this.getContentComponentData()}
                componentObject={this.componentObject}
            ></PostEditFrame>);
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
    let childPageComponents = ownProps.pageComponent.pageComponentCollection.pageComponents;
    let contentComponentData = state.contentComponentDatas.find(e => e.sign == ownProps.pageComponent.sign);
    let defaultComponentData = state.defaultComponentDatas.find(item => item.sign == ownProps.pageComponent.sign);

    return {
        defaultComponentData: defaultComponentData,
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