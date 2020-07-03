import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import ContainerComponentObject from 'CMSManage/Component/Components/BaseComponents/BaseContainerComponent'
import BaseContentLeafComponentObject from 'CMSManage/Component/Components/BaseComponents/BaseContentLeafComponent'
import { pageFetch, pageDataFetch, pageRemoveComponent, pageEditComponent, defaultComponentDataUpdate } from 'CMSManage/IEReduxs/Actions'

import './index.css'

import PageEditFrame from '../PageEditFrame'
import PostEditFrame from '../PostEditFrame'

import BaseComponentContainer from '../BaseComponentContainer'

import { Button, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, AppstoreAddOutlined, FormOutlined } from '@ant-design/icons';

class PageEditCompontContainer extends BaseComponentContainer {
    constructor(props) {
        super(props);

        this.state = {
            openEdit: false,
            showPostEdit: false
        }
    }

    createChildComponent() {
        return this.props.childPageComponents.map(item => (
            <Contain
                key={item.sign}
                pageComponent={item}
                addChildComponent={this.props.addChildComponent}
            >
            </Contain>)
        );
    }

    getTools() {
        // PageLeafBaseSetting
        let tools = [];

        tools.push(<PageEditFrame
            key={"EditFrame"}
            title={this.componentDescribe.displayName}
            componentObject={this.componentObject}
            pageComponent={this.props.pageComponent}
            editComponent={this.props.editComponent}
            show={this.state.openEdit}
            close={() => { this.setState({ openEdit: false }) }}
        ></PageEditFrame>);

        tools.push(
            <div key={"EditFrameBtn"} className="editableparentcom-btns">
                <Tooltip title={`删除 ${this.componentDescribe.displayName}`} overlayStyle={{ zIndex: 10000 }}>
                    <Button type="primary" shape="round" danger icon={<DeleteOutlined />}
                        onClick={
                            () => { this.props.removeComponent(this.props.pageComponent) }
                        }
                    />
                </Tooltip>
                <Tooltip title={`编辑 ${this.componentDescribe.displayName}`} overlayStyle={{ zIndex: 10000 }}>
                    <Button type="primary" shape="round" icon={<EditOutlined />}
                        onClick={
                            () => { this.setState({ openEdit: true }) }
                        }
                    />
                </Tooltip>
                {
                    (this.componentObject instanceof ContainerComponentObject) &&
                    <Tooltip title="添加" overlayStyle={{ zIndex: 10000 }}>
                        <Button type="default" shape="round" icon={<AppstoreAddOutlined />}
                            onClick={
                                () => { this.props.addChildComponent(this.props.pageComponent) }
                            }
                        />
                    </Tooltip>
                }
                {
                    ((this.componentObject instanceof BaseContentLeafComponentObject)) &&
                    <Tooltip title="编辑默认数据">
                        <Button type="primary" shape="round" icon={<FormOutlined />}
                            onClick={
                                () => { this.setState({ showPostEdit: true }) }
                            }
                        />
                    </Tooltip>
                }
            </div>
        );

        // 如果组件不是内容组件
        if (!(this.componentObject instanceof BaseContentLeafComponentObject)) {
            return tools;
        }

        tools.push(
            <PostEditFrame
                key={"PostEditFrame"}
                title={this.componentDescribe.displayName}
                show={this.state.showPostEdit}
                close={() => { this.setState({ showPostEdit: false }) }}
                submit={this.props.defaultComponentDataUpdate}
                componentData={this.getContentComponentData()}
                componentObject={this.componentObject}
            ></PostEditFrame>);

        return tools;
    }

    execLogic(requestData) {
        throw new Error("不能在编辑页面时执行逻辑");
    }
}

PageEditCompontContainer.propTypes = {
    addChildComponent: PropTypes.func.isRequired,
    pageComponent: PropTypes.object.isRequired,
    defaultComponentDataUpdate: PropTypes.func.isRequired,
    childPageComponents: PropTypes.array.isRequired,
    removeComponent: PropTypes.func.isRequired,
    editComponent: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
    pageData: PropTypes.object.isRequired,
    pageFreshen: PropTypes.func.isRequired
}

PageEditCompontContainer.defaultProps = {
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    // 新增属性 parentSign
    let childPageComponents = ownProps.pageComponent.pageComponentCollection.pageComponents;
    let defaultComponentData = state.defaultComponentDatas.find(item => item.sign == ownProps.pageComponent.sign);

    return {
        defaultComponentData: defaultComponentData,
        childPageComponents: childPageComponents,
        page: state.page,
        pageData: state.pageData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeComponent: (pageComponent) => {
            dispatch(pageRemoveComponent(pageComponent));
        },
        editComponent: (sign, pageComponent) => {
            dispatch(pageEditComponent(sign, pageComponent));
        },
        defaultComponentDataUpdate: (componentData) => {
            dispatch(defaultComponentDataUpdate(componentData));
        },
        pageFreshen: (pageName, pageDataName) => {
            return Promise.all([dispatch(pageFetch(pageName)), dispatch(pageDataFetch(pageName, pageDataName))]);
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageEditCompontContainer)

export default Contain;