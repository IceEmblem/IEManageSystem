import React from 'react';
import PropTypes from 'prop-types'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import { Button, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, AppstoreAddOutlined, FormOutlined } from '@ant-design/icons';

import {
    RemoveComponentAction,
    EditComponentAction,
    DefaultComponentDataUpdateAction,
} from 'BaseCMSManage/IEReduxs/Actions'

import PageEditFrame from 'CMSManage/Component/ComponentContainerBoxs/PageEditFrame'
import PostEditFrame from 'CMSManage/Component/ComponentContainerBoxs/PostEditFrame'

import ComponentFactory from 'BaseCMSManage/Components/ComponentFactory'
import ComponentDataModel from 'BaseCMSManage/Models/ComponentDataModel'

class ToolBtns extends React.Component {
    state = {
        openEdit: false,
        showPostEdit: false
    }

    componentDescribe = undefined;

    constructor(props) {
        super(props);

        if (this.props.pageComponent) {
            this.componentDescribe = ComponentFactory.getComponentDescribeForName(this.props.pageComponent.name);
        }
    }

    render() {
        if (!this.props.pageComponent) {
            return <></>;
        }

        return (
            <div 
                className={`editableparentcom-btns editableparentcom-btns-transform`} 
                style={this.props.style}
            >
                <PageEditFrame
                    componentDescribe={this.componentDescribe}
                    pageComponent={this.props.pageComponent}
                    editComponent={(pageComponent) => {
                        this.props.editComponent(new EditComponentAction(this.props.pageId, this.props.pageComponent.os, this.props.sign, pageComponent))
                    }}
                    show={this.state.openEdit}
                    close={() => { this.setState({ openEdit: false }) }}
                ></PageEditFrame>
                <Tooltip
                    title={`删除 ${this.componentDescribe.displayName}，组件标识：${this.props.sign}`}
                    overlayStyle={{ zIndex: 10000 }}
                >
                    <Button size='small' type="primary" shape="round" danger icon={<DeleteOutlined />}
                        onClick={() => { 
                            this.props.removeComponent(new RemoveComponentAction(this.props.pageId, this.props.pageComponent.os, this.props.sign)) 
                        }}
                    />
                </Tooltip>
                <Tooltip
                    title={`编辑 ${this.componentDescribe.displayName}，组件标识：${this.props.sign}`}
                    overlayStyle={{ zIndex: 10000 }}
                >
                    <Button size='small' type="primary" shape="round" icon={<EditOutlined />}
                        onClick={() => { this.setState({ openEdit: true }) }}
                    />
                </Tooltip>
                {
                    this.componentDescribe.isExistChildComponent() &&
                    <Tooltip title={`添加 ${this.componentDescribe.displayName}，组件标识：${this.props.sign}`} overlayStyle={{ zIndex: 10000 }}>
                        <Button size='small' type="default" shape="round" icon={<AppstoreAddOutlined />}
                            onClick={() => { this.props.addChildComponent(this.props.sign) }}
                        />
                    </Tooltip>
                }
                {
                    this.componentDescribe.isExistComponentData() &&
                    <>
                        <Tooltip title={`编辑默认数据 ${this.componentDescribe.displayName}，组件标识：${this.props.sign}`} overlayStyle={{ zIndex: 10000 }}>
                            <Button size='small' type="primary" shape="round" icon={<FormOutlined />}
                                onClick={() => { this.setState({ showPostEdit: true }) }}
                            />
                        </Tooltip>
                        <PostEditFrame
                            key={"PostEditFrame"}
                            show={this.state.showPostEdit}
                            close={() => { this.setState({ showPostEdit: false }) }}
                            submit={(data) => this.props.editDefaultComponentData(new DefaultComponentDataUpdateAction(this.props.pageId, this.props.sign, data))}
                            componentData={this.props.defaultComponentData || ComponentDataModel.CreateDefaultComponentData(this.props.sign)}
                            pageComponent={this.props.pageComponent}
                            componentDescribe={this.componentDescribe}
                        ></PostEditFrame>
                    </>
                }
            </div>)
    }
}

ToolBtns.propTypes = {
    // 如下属性由父组件传入
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number,
    os: PropTypes.string.isRequired,
    sign: PropTypes.string.isRequired,
    addChildComponent: PropTypes.func.isRequired,
    style: PropTypes.object,

    // redux state
    pageComponent: PropTypes.object.isRequired,
    defaultComponentData: PropTypes.object,

    // redux 
    removeComponent: PropTypes.func.isRequired,
    editComponent: PropTypes.func.isRequired,
    editDefaultComponentData: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
        pageComponent: state.pageComponents[ownProps.pageId][ownProps.os][ownProps.sign],
        defaultComponentData: state.defaultComponentDatas[ownProps.pageId][ownProps.sign],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeComponent: (removeComponentAction) => {
            dispatch(removeComponentAction);
        },
        editComponent: (editComponentAction) => {
            dispatch(editComponentAction);
        },
        editDefaultComponentData: (defaultComponentDataUpdateAction) => {
            dispatch(defaultComponentDataUpdateAction);
        },
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ToolBtns)

export default Contain;