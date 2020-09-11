import React from 'react'
import PropTypes from 'prop-types'
import { IComponentDataConfigBtnComponent } from 'BaseCMSManage/Components/BaseComponents/BaseContentLeafComponent/ComponentDataConfig'
import { Button, Tooltip, Modal } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import {
    DefaultComponentDataUpdateAction,
    ComponentDataUpdateAction,
} from 'BaseCMSManage/IEReduxs/Actions'
import IocContainer from 'Core/IocContainer'
import IETool from 'Core/ToolLibrary/IETool'
import ComponentDataModel from 'BaseCMSManage/Models/ComponentDataModel'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

class ComponentDataConfigBtnComponent extends IComponentDataConfigBtnComponent {
    state = {
        visible: false,
        cloneComponentData: IETool.deepCopy(this.props.contentComponentData),
    }

    constructor(props) {
        super(props);
    }

    render() {
        return <>
            <Tooltip
                title={`编辑组件数据`}
            >
                <Button size='small' shape="round"
                    // type={"primary"}
                    icon={<FileTextOutlined />}
                    onClick={() => {
                        this.setState({
                            visible: true,
                            cloneComponentData: IETool.deepCopy(this.props.contentComponentData)
                        })
                    }}
                />
            </Tooltip>
            <Modal
                title={`编辑组件数据`}
                visible={this.state.visible}
                onOk={() => {
                    if (!this.props.currentPageAndPost.pageDataId) {
                        this.props.editDefaultComponentData(new DefaultComponentDataUpdateAction(this.props.currentPageAndPost.pageId, this.props.sign, this.state.cloneComponentData))
                    }
                    else {
                        this.props.editComponentData(new ComponentDataUpdateAction(this.props.currentPageAndPost.pageDataId, this.state.cloneComponentData))
                    }
                    this.setState({ visible: false });
                }}
                onCancel={() => {
                    this.setState({ visible: false });
                }}
                width={1200}
                zIndex={9999}
                okText='提交'
                cancelText='取消'
            >
                <this.props.ConfigComponent
                    pageComponentSettings={this.props.pageComponent.pageComponentSettings}
                    data={this.state.cloneComponentData}
                    setData={(data) => {
                        this.setState({ cloneComponentData: data });
                    }}
                />
            </Modal>
        </>
    }
}

ComponentDataConfigBtnComponent.propTypes = {
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number,
    os: PropTypes.string.isRequired,
    sign: PropTypes.string.isRequired,

    pageComponent: PropTypes.object.isRequired,
    componentData: PropTypes.object.isRequired,
    editDefaultComponentData: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageId = ownProps.currentPageAndPost.pageId;
    let pageDataId = ownProps.currentPageAndPost.pageDataId;
    let os = ownProps.currentPageAndPost.os;

    let pageComponent = state.pageComponents[pageId][os][ownProps.sign];
    // 新增属性 parentSign
    let defaultComponentData = state.defaultComponentDatas[pageId][ownProps.sign];
    let contentComponentData = undefined;
    if (state.contentComponentDatas[pageDataId]) {
        contentComponentData = state.contentComponentDatas[pageDataId][ownProps.sign];
    }

    return {
        pageComponent: pageComponent,
        contentComponentData: contentComponentData || defaultComponentData || ComponentDataModel.CreateDefaultComponentData(ownProps.sign),
        currentPageAndPost: ownProps.currentPageAndPost,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        editDefaultComponentData: (editComponentAction) => {
            dispatch(editComponentAction);
        },
        editComponentData: (editComponentAction) => {
            dispatch(editComponentAction);
        }
    }
}

IocContainer.registerSingleIntances(IComponentDataConfigBtnComponent, CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ComponentDataConfigBtnComponent));