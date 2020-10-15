import React from 'react';
import {IocContainer} from 'ice-common';
import { IInteractiveComponentConfigBtnComponent } from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractiveComponentConfig'

import { Button, Tooltip, Radio, Modal, Tag } from 'antd';

import { ApiOutlined } from '@ant-design/icons';
import ComponentContext from 'BaseCMSManage/ComponentContext'

import {IETool} from 'ice-common'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import {
    EditComponentAction,
} from 'BaseCMSManage/IEReduxs/Actions'

class InteractiveComponentConfigBtnComponent extends IInteractiveComponentConfigBtnComponent {
    static contextType = ComponentContext;

    state = {
        show: false,
        clonePageComponent: IETool.deepCopy(this.props.pageComponent),
    }

    constructor(props) {
        super(props)
    }

    render() {
        let interactivConfigFeature = this.context.interactivConfigFeature;
        if (!interactivConfigFeature) {
            return <></>
        }

        let items = this.props.interactiveTypes.map(interactiveType => {
            return <div className='col-md-12 mb-3'>
                <Tag color="#55acee">{interactiveType.title}</Tag>
                <Radio.Group
                    value={interactiveType.getConfigFeatureItemName(this.state.clonePageComponent)}
                    onChange={(e) => {
                        interactiveType.setConfigFeatureItemName(this.state.clonePageComponent, e.target.value);
                        this.setState({});
                    }}
                >
                    <Radio value=''>不使用</Radio>
                    {
                        interactiveType.getInteractivConfigFeatureItems(interactivConfigFeature).map(configFeatureItem => {
                            return <Radio value={configFeatureItem.name}>{configFeatureItem.displayName}</Radio>
                        })
                    }
                </Radio.Group>
            </div>
        })

        return (
            <>
                <Tooltip
                    title={`指定交互信息`}
                >
                    <Button size='small' shape="round"
                        type={"default"}
                        icon={<ApiOutlined />}
                        onClick={() => {
                            this.setState({
                                show: true,
                                clonePageComponent: IETool.deepCopy(this.props.pageComponent)
                            })
                        }}
                    />
                </Tooltip>
                <Modal
                    title='请选择要使用的数据'
                    visible={this.state.show}
                    onOk={() => {
                        this.props.editComponent(new EditComponentAction(this.props.currentPageAndPost.page.name, this.props.currentPageAndPost.os, this.props.sign, this.state.clonePageComponent));
                        this.setState({ show: false })
                    }}
                    onCancel={() => {
                        this.setState({ show: false });
                    }}
                    okText='提交'
                    cancelText='取消'
                    width={1200}
                    zIndex={9999}
                >
                    <div className='d-flex flex-wrap'>
                        {items}
                    </div>
                </Modal>
            </>
        );
    }
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

IocContainer.registerSingleIntances(IInteractiveComponentConfigBtnComponent, CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(InteractiveComponentConfigBtnComponent));