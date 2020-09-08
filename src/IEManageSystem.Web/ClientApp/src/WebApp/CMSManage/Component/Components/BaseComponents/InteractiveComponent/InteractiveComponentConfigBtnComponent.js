import React from 'react';
import IocContainer from 'Core/IocContainer';
import { IInteractiveComponentConfigBtnComponent, InteractiveType } from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractiveComponentConfig'
import { InteractiveComponentConfigName } from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/ComponentComponentContainer'

import { Button, Tooltip, Radio, Modal, Tag } from 'antd';

import { ApiOutlined } from '@ant-design/icons';
import ComponentContext from 'BaseCMSManage/ComponentContext'
import InteractivConfigFeature from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractivConfigFeature'

import IETool from 'Core/ToolLibrary/IETool'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import {
    EditComponentAction,
} from 'BaseCMSManage/IEReduxs/Actions'

class InteractiveComponentConfigBtnComponent extends IInteractiveComponentConfigBtnComponent {
    state = {
        show: false,
        clonePageComponent: IETool.deepCopy(this.props.pageComponent),
    }

    constructor(props) {
        super(props)
    }

    render() {
        let interactivConfigFeature = ComponentContext.current.get(InteractivConfigFeature);
        if (!interactivConfigFeature) {
            return <></>
        }

        let pageComponentSettingData = this.state.clonePageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData();
        let texts = undefined;
        if (this.props.interactiveTypes.some(e => e == InteractiveType.text)) {
            texts = <div className='col-md-12 mb-3'>
                <Tag color="#55acee">使用的文本</Tag>
                <Radio.Group
                    value={pageComponentSettingData.field1}
                    onChange={(e) => {
                        pageComponentSettingData.field1 = e.target.value;
                        this.setState({});
                    }}
                >
                    <Radio value=''>不使用</Radio>
                    {
                        interactivConfigFeature.getTexts().map(item => {
                            return <Radio value={item.name}>{item.displayName}</Radio>
                        })
                    }
                </Radio.Group>
            </div>
        }

        let clicks = undefined;
        if (this.props.interactiveTypes.some(e => e == InteractiveType.click)) {
            clicks =
                <div className='col-md-12'>
                    <Tag color="#55acee">使用的点击</Tag>
                    <Radio.Group
                        value={pageComponentSettingData.field2}
                        onChange={(e) => {
                            pageComponentSettingData.field2 = e.target.value;
                            this.setState({});
                        }}
                    >
                        <Radio value=''>不使用</Radio>
                        {
                            interactivConfigFeature.getClicks().map(item => {
                                return <Radio value={item.name}>{item.displayName}</Radio>
                            })
                        }
                    </Radio.Group>
                </div>
        }

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
                        this.props.editComponent(new EditComponentAction(this.props.pageId, this.props.os, this.props.sign, this.state.clonePageComponent));
                        this.setState({ show: false })
                    }}
                    onCancel={() => {
                        this.setState({ show: false });
                    }}
                    okText='提交'
                    cancelText='取消'
                    width={1200}
                >
                    <div className='d-flex flex-wrap'>
                        {texts}
                        {clicks}
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageComponent = state.pageComponents[ownProps.pageId][ownProps.os][ownProps.sign];

    return {
        pageComponent: pageComponent,
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