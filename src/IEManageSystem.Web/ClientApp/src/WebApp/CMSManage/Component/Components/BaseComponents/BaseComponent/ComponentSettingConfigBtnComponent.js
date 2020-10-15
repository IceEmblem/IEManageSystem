import React from 'react'
import PropTypes from 'prop-types'
import { IComponentSettingConfigBtnComponent } from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponentSettingConfig'
import { Button, Tooltip, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import {
    EditComponentAction,
} from 'BaseCMSManage/IEReduxs/Actions'
import {IocContainer} from 'ice-common';
import {IETool} from 'ice-common'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

class ComponentSettingConfigBtnComponent extends IComponentSettingConfigBtnComponent {
    state = {
        visible: false,
        clonePageComponent: IETool.deepCopy(this.props.pageComponent),
    }

    render() {
        return <>
            <Tooltip
                title={`编辑 ${this.props.displayName}`}
            >
                <Button size='small' shape="round"
                    type={"primary"}
                    icon={<EditOutlined />}
                    onClick={() => {
                        this.setState({ 
                            visible: true, 
                            clonePageComponent: IETool.deepCopy(this.props.pageComponent)
                        })
                    }}
                />
            </Tooltip>
            <Modal
                title={`编辑 ${this.props.displayName}`}
                visible={this.state.visible}
                onOk={()=>{
                    this.props.editComponent(new EditComponentAction(this.props.currentPageAndPost.page.name, this.props.pageComponent.os, this.props.sign, this.state.clonePageComponent));
                    this.setState({visible: false});
                }}
                onCancel={()=>{
                    this.setState({visible: false});
                }}
                width={1200}
                zIndex={9999}
                okText='提交'
                cancelText='取消'
            >
                <this.props.ConfigComponent 
                    data={this.state.clonePageComponent}
                    setData={(data)=>{
                        this.setState({clonePageComponent: data});
                    }}
                />
            </Modal>
        </>
    }
}

ComponentSettingConfigBtnComponent.propTypes = {
    sign: PropTypes.string.isRequired,
    ConfigComponent: PropTypes.func.isRequired,
    currentPageAndPost: PropTypes.object.isRequired,

    pageComponent: PropTypes.object.isRequired,
    editComponent: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        pageComponent: ownProps.currentPageAndPost.pageComponents[ownProps.sign],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        editComponent: (editComponentAction) => {
            dispatch(editComponentAction);
        }
    }
}

IocContainer.registerSingleIntances(IComponentSettingConfigBtnComponent, CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ComponentSettingConfigBtnComponent));