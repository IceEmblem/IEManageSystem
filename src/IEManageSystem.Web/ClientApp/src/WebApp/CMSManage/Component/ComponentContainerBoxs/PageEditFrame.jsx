import React from 'react';
import PropTypes from 'prop-types';

import Tab from 'Common/Tab/Tab.jsx'

import { Modal, notification, message } from 'antd';
import {IETool} from 'ice-common'

class EditFrame extends React.Component {
    // props.close()
    // props.show
    constructor(props) {
        super(props);

        // 选项卡名称字段的名字
        this.nameField = "text";
        // 生成选项卡
        this.tabs = this.createTabs();

        this.state = {
            // 当前选择的选项卡的索引
            selectTab: this.tabs.length > 0 ? this.tabs[0] : null,
            pageComponent: IETool.deepCopy(this.props.pageComponent)
        }

        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ pageComponent: IETool.deepCopy(nextProps.pageComponent) });
    }

    // 生成选项卡列表
    createTabs() {
        let index = 0;

        let tabs = [];

        // 根据组件的配置，配置选项卡
        this.props.componentDescribe.componentObject.getComponentSettingConfigs().forEach(element => {
            // 添加 选项卡 选项
            tabs.push({ index: index, text: element.displayName, name: element.name })
            index++;
        });

        return tabs;
    }

    cancel() {
        this.props.close();
        this.setState({
            selectTab: this.tabs.length > 0 ? this.tabs[0] : null
        });
    }

    submit() {
        try {
            this.props.editComponent(this.state.pageComponent);
            this.props.close();
        }
        catch (e) {
            Modal.error({
                title: '提交失败',
                content: e.message,
                zIndex: 9999
            });
        }
    }

    // 获取当前要显示的内容
    getContentComponent() {
        if (!this.state.selectTab) {
            return undefined;
        }

        // 组件设置配置
        let componentSettingConfig = this.props.componentDescribe.componentObject.getComponentSettingConfigs().find(item => item.name == this.state.selectTab.name);

        // 组件设置配置使用的组件
        return componentSettingConfig.bulidConfigComponent(this.state.pageComponent,
            (pageComponent) => {
                this.setState({ pageComponent: pageComponent });
            });
    }

    render() {
        return (
            <Modal
                title={`${this.props.componentDescribe.displayName} 组件编辑`}
                visible={this.props.show}
                onOk={this.submit}
                onCancel={this.cancel}
                width={1000}
                bodyStyle={{ backgroundColor: "#f8f9fa" }}
                zIndex={9999}
                okText="提交"
                cancelText="取消"
            >
                <div className="bg-white p-2">
                    <Tab
                        tabs={this.tabs}
                        nameField={this.nameField}
                        selectOnclick={(data) => {
                            this.setState({ selectTab: data })
                        }}
                    >
                        {this.getContentComponent()}
                    </Tab>
                </div>
            </Modal>
        );
    }
}

EditFrame.propTypes = {
    componentDescribe: PropTypes.object.isRequired,
    pageComponent: PropTypes.object.isRequired,
    editComponent: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default EditFrame