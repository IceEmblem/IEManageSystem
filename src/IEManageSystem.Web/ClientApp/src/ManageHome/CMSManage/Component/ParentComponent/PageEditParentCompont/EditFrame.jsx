import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'Modal/Modal.jsx'

import Tab from 'Tab/Tab.jsx'


class EditFrame extends React.Component {
    // props.close()
    // props.show
    constructor(props) {
        super(props);

        this.tabs = [{ index: 0, text: "基本设置" }];
        this.nameField = "text";

        this.state = {
            selectIndex: 0,
            pageComponent: { ...{}, ...this.props.pageComponent }
        }

        if(!this.state.pageComponent.pageComponentSettings){
            this.state.pageComponent.pageComponentSettings = []
        }

        let index = 1
        this.props.pageComponentSettingConfigs.forEach(element => {
            this.tabs.push({ index: index, text: element.displayName, name: element.name })
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
                pageComponentSetting={this.state.pageComponent}
                setPageComponentSetting={(d) => {
                    this.setState({pageComponent: d})
                }}
            />
        }
        else{
            // 设置对象
            let objectConfig = this.props.pageComponentSettingConfigs[this.state.selectIndex - 1];
            // 设置数据
            let pageComponentSetting = this.state.pageComponent.pageComponentSettings.find(item=>item.name == objectConfig.name) || {}
            // 设置使用组件
            let Component = objectConfig.component;
            ContentComponent = <Component 
                pageComponentSetting={pageComponentSetting}
                setPageComponentSetting={(d) => {
                    let data = this.state.pageComponent.pageComponentSettings.find(item=>item.name == objectConfig.name) || {}
                    data.field1 = d.field1
                    data.field2 = d.field2
                    data.field3 = d.field3
                    data.field4 = d.field4
                    data.field5 = d.field5
                    this.setState({});
                }}
            />
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
    pageComponentSettingConfigs: PropTypes.array.isRequired,
    editComponent: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default EditFrame