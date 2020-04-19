import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'Modal/Modal.jsx'

import IETool from 'ToolLibrary/IETool';
import Tab from 'Tab/Tab.jsx'


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

    // 生成选项卡列表
    createTabs() {
        let index = 0;

        let tabs = [];

        // 根据组件的配置，配置选项卡
        this.props.componentObject.getComponentSettingConfigs().forEach(element => {
            // 添加 选项卡 选项
            tabs.push({ index: index, text: element.displayName, name: element.name })
            index++;
        });

        return tabs;
    }

    cancel() {
        this.props.close();
        this.setState({
            selectTab: this.tabs.length > 0 ? this.tabs[0] : null, 
            pageComponent: IETool.deepCopy(this.props.pageComponent) 
        });
    }

    submit() {
        this.props.close();
        this.props.editComponent(this.state.pageComponent);
    }

    // 获取当前要显示的内容
    getContentComponent() {
        if(!this.state.selectTab){
            return undefined;
        }

        // 组件设置配置
        let componentSettingConfig = this.props.componentObject.getComponentSettingConfigs().find(item => item.name == this.state.selectTab.name);
        
        // // 组件设置配置使用的组件
        // return componentSettingConfig.bulidConfigComponent(
        //     componentSettingConfig.getSettingForPageComponent(this.state.pageComponent),
        //     (d) => {
        //         componentSettingConfig.setSettingOfPageComponent(this.state.pageComponent, d);
        //         this.setState({});
        //     });

        // 组件设置配置使用的组件
        return componentSettingConfig.bulidConfigComponent(this.state.pageComponent);
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
    componentObject: PropTypes.object.isRequired,
    pageComponent: PropTypes.object.isRequired,
    editComponent: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default EditFrame