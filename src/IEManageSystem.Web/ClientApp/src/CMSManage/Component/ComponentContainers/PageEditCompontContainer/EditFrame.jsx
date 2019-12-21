import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'Modal/Modal.jsx'

import Tab from 'Tab/Tab.jsx'


class EditFrame extends React.Component {
    // props.close()
    // props.show
    constructor(props) {
        super(props);

        this.state = {
            // 当前选择的选项卡的索引
            selectTab: null,
            pageComponent: { ...{}, ...this.props.pageComponent }
        }

        // 选项卡名称字段的名字
        this.nameField = "text";
        // 生成选项卡
        this.tabs = this.createTabs();
        
        this.fillPageComponentSettings(this.state.pageComponent.pageComponentSettings);
        
        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this);
    }

    // 生成选项卡列表
    createTabs(){
        let index = 0;
        // 选项卡配置
        let tabs = [{ index: index, text: "基本设置", name: "ieBaiscSetting" }];
        index++;

        // 如果有页叶子有配置
        if (this.props.pageLeafSettingConfig) {
            tabs.push({ index: index, text: "页面配置", name: "iePageLeafSetting" });
            index++;
        }

        // 根据组件的配置，配置选项卡
        this.props.componentSettingConfigs.forEach(element => {
            // 添加 选项卡 选项
            tabs.push({ index: index, text: element.displayName, name: element.name })
            // 根据 组件设置配置 添加 组件设置数据 到 组件数据 中
            if (this.state.pageComponent.pageComponentSettings.find(item => item.name == element.name) == null) {
                this.state.pageComponent.pageComponentSettings.push({
                    name: element.name,
                    displayName: element.displayName
                });
            }
            index++;
        });

        return tabs;
    }

    // 根据 组件设置配置 添加 组件设置数据 到 组件数据 中
    fillPageComponentSettings(pageComponentSettings){
        this.props.componentSettingConfigs.forEach(element => {
            // 根据 组件设置配置 添加 组件设置数据 到 组件数据 中
            if (pageComponentSettings.find(item => item.name == element.name) == null) {
                pageComponentSettings.push({
                    name: element.name,
                    displayName: element.displayName
                });
            }
        });
    }

    cancel() {
        this.props.close();
        this.setState({ pageComponent: { ...this.props.pageComponent } });
    }

    submit() {
        this.props.close();
        this.props.editComponent(this.state.pageComponent);
    }

    // 获取当前要显示的内容
    getContentComponent(){
        let ContentComponent;
        // 选择了基本配置
        if (this.state.selectTab == null || this.state.selectTab.name == "ieBaiscSetting") {
            ContentComponent = <this.props.basicSettingConfig
                data={this.state.pageComponent.pageComponentBaseSetting}
                setData={(d) => {
                    this.state.pageComponent.pageComponentBaseSetting = d;
                    this.setState({});
                }}
            />
        }
        // 选择了页叶子配置
        else if (this.state.selectTab.name == "iePageLeafSetting") {
            ContentComponent = <this.props.pageLeafSettingConfig
                data={this.state.pageComponent.targetPageId}
                setData={(value) => {
                    let targetPageId = parseInt(value);
                    if (isNaN(targetPageId)) {
                        return;
                    }
                    this.state.pageComponent.targetPageId = targetPageId;
                    this.setState({});
                }}
            />;
        }
        else {
            // 组件设置配置
            let componentSettingConfig = this.props.componentSettingConfigs.find(item => item.name == this.state.selectTab.name);
            // 组件设置数据
            let pageComponentSetting = this.state.pageComponent.pageComponentSettings.find(item => item.name == componentSettingConfig.name) || {}
            // 组件设置配置使用的组件
            ContentComponent = componentSettingConfig.settingComponentBuilder(
                pageComponentSetting,
                (d) => {
                    let data = this.state.pageComponent.pageComponentSettings.find(item => item.name == componentSettingConfig.name) || {}
                    data.field1 = d.field1
                    data.field2 = d.field2
                    data.field3 = d.field3
                    data.field4 = d.field4
                    data.field5 = d.field5
                    this.setState({});
                });
        }

        return ContentComponent;
    }

    render() {
        return (
            <Modal
                show={this.props.show}
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-info text-white">
                            <h4 className="modal-title">{this.props.title}编辑组件</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={this.cancel}>&times;</button>
                        </div>

                        <div className="modal-body jumbotron">
                            <Tab
                                tabs={this.tabs}
                                nameField={this.nameField}
                                selectIndex={this.state.selectTab == null ? 0 : this.state.selectTab.index}
                                selectOnclick={(data) => {
                                    this.setState({ selectTab: data })
                                }}
                            >
                                {this.getContentComponent()}
                            </Tab>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-info" onClick={this.submit}>提交</button>
                            <button type="button" className="btn btn-secondary" onClick={this.cancel}>关闭</button>
                        </div>

                    </div>
                </div>
            </Modal>
        );
    }
}

EditFrame.propTypes = {
    basicSettingConfig: PropTypes.func.isRequired,     // 基本配置（React组件）
    pageLeafSettingConfig: PropTypes.func.isRequired,     // 页叶子配置（React组件）
    pageComponent: PropTypes.object.isRequired,
    componentSettingConfigs: PropTypes.array.isRequired,
    editComponent: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default EditFrame