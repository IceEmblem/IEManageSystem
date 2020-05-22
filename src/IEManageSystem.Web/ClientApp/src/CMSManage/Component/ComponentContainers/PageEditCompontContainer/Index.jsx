import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import ContainerComponentObject from 'CMSManage/Component/Components/BaseContainerComponent'
import { pageFetch, pageDataFetch } from 'CMSManage/IEReduxs/Actions'

import './index.css'

import EditFrame from './EditFrame'

import { pageAddComponent, pageRemoveComponent, pageEditComponent } from 'CMSManage/IEReduxs/Actions'

import BaseComponentContainer from '../BaseComponentContainer'

import { Button, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, AppstoreAddOutlined } from '@ant-design/icons';

class PageEditCompontContainer extends BaseComponentContainer {
    constructor(props) {
        super(props);

        this.state = {
            openEdit: false
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
        // PageLeafBaseSetting
        let tools = [];

        let isShowAddBtn = false;
        if (this.componentObject instanceof ContainerComponentObject) {
            isShowAddBtn = true;
        }

        tools.push(<EditFrame
            key={"EditFrame"}
            title={this.componentDescribe.name}
            componentObject={this.componentObject}
            pageComponent={this.props.pageComponent}
            editComponent={this.props.editComponent}
            show={this.state.openEdit}
            close={() => { this.setState({ openEdit: false }) }}
        ></EditFrame>);
        tools.push(
            <div key={"EditFrameBtn"} className="editableparentcom-btns">
                <Tooltip title={`删除 ${this.componentDescribe.displayName}`} overlayStyle={{zIndex:10000}}>
                    <Button type="primary" shape="circle" danger icon={<DeleteOutlined />}
                        onClick={
                            () => { this.props.removeComponent(this.props.pageComponent) }
                        }
                    />
                </Tooltip>
                <Tooltip title={`编辑 ${this.componentDescribe.displayName}`} overlayStyle={{zIndex:10000}}>
                    <Button type="primary" shape="circle" icon={<EditOutlined />}
                        onClick={
                            () => { this.setState({ openEdit: true }) }
                        }
                    />
                </Tooltip>
                {
                    isShowAddBtn &&
                    <Tooltip title="添加" overlayStyle={{zIndex:10000}}>
                        <Button type="default" shape="circle" icon={<AppstoreAddOutlined />}
                            onClick={
                                () => { this.props.addChildComponent(this.props.pageComponent) }
                            }
                        />
                    </Tooltip>
                }
            </div>
        );

        return tools;
    }

    execLogic(requestData) {
        throw new Error("不能在编辑页面时执行逻辑");
    }
}

PageEditCompontContainer.propTypes = {
    addChildComponent: PropTypes.func.isRequired,
    pageComponent: PropTypes.object.isRequired,
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
    let childPageComponents = state.page.pageComponents.filter(item => item.parentSign == ownProps.pageComponent.sign);

    return {
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
        editComponent: (pageComponent) => {
            dispatch(pageEditComponent(pageComponent));
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