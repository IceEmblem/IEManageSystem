import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'Modal/Modal.jsx'

import Tab from 'Tab/Tab.jsx'


class EditFrame extends React.Component {
    // props.close()
    // props.show
    constructor(props) {
        super(props);

        // 选项卡配置
        this.tabs = [{ index: 0, text: "基本设置" }];
        // 选项卡名称字段的名字
        this.nameField = "text";

        this.state = {
            // 当前选择的选项卡的索引
            selectIndex: 0,
            pageComponent: { ...{}, ...this.props.pageComponent }
        }

        if(!this.state.pageComponent.pageComponentSettings){
            this.state.pageComponent.pageComponentSettings = []
        }

        // 根据组件的配置，配置选项卡
        let index = 1
        this.props.componentSettingConfigs.forEach(element => {
            // 添加 选项卡 选项
            this.tabs.push({ index: index, text: element.displayName, name: element.name })
            // 添加组件设置
            if(this.state.pageComponent.pageComponentSettings.find(item=>item.name == element.name) == null)
            {
                this.state.pageComponent.pageComponentSettings.push({
                    name: element.name,
                    displayName: element.displayName
                });
            }
            index++;
        });


        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this);
    }

    cancel(){
        this.props.close();
        this.setState({pageComponent: { ...this.props.pageComponent }});
    }

    submit() {
        this.props.close();
        this.props.editComponent(this.state.pageComponent);
    }

    render() {
        let ContentComponent
        if (this.state.selectIndex == 0) {
            ContentComponent = <this.props.baseSetting
                pageComponentSetting={this.state.pageComponent.pageComponentBaseSetting}
                setPageComponentSetting={(d) => {
                    this.state.pageComponent.pageComponentBaseSetting = d;
                    this.setState({});
                }}
                targetPageId={this.state.pageComponent.targetPageId}
                setTargetPageId={(value) => {
                    let targetPageId = parseInt(value);
                    if(isNaN(targetPageId)){
                        return;
                    }
                    this.state.pageComponent.targetPageId = targetPageId;
                    this.setState({});
                }}
            />
        }
        else{
            // 组件设置配置
            let componentSettingConfig = this.props.componentSettingConfigs[this.state.selectIndex - 1];
            // 组件设置数据
            let pageComponentSetting = this.state.pageComponent.pageComponentSettings.find(item=>item.name == componentSettingConfig.name) || {}
            // 组件设置配置使用的组件
            ContentComponent = componentSettingConfig.settingComponentBuilder(
                pageComponentSetting,
                (d) => {
                    let data = this.state.pageComponent.pageComponentSettings.find(item=>item.name == componentSettingConfig.name) || {}
                    data.field1 = d.field1
                    data.field2 = d.field2
                    data.field3 = d.field3
                    data.field4 = d.field4
                    data.field5 = d.field5
                    this.setState({});
                });
        }

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
                                selectIndex={this.state.selectIndex}
                                selectOnclick={(data) => {
                                    this.setState({ selectIndex: data.index })
                                }}
                            >
                                {ContentComponent}
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
    baseSetting: PropTypes.func.isRequired,     // 基本配置（React组件）
    pageComponent: PropTypes.object.isRequired,
    componentSettingConfigs: PropTypes.array.isRequired,
    editComponent: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default EditFrame