import React from 'react';
import PropTypes from 'prop-types';
import ContentComponentDataModel from 'CMSManage/Models/ComponentDataModel'

import Tab from 'Tab/Tab.jsx'

import { Modal, Button } from 'antd';

// props.submit
// props.close    fun
class EditFrame extends React.Component {
    constructor(props) {
        super(props);

        this.tabs = [{ index: 0, text: "基本设置" }];
        this.nameField = "text";
        this.selectIndex = 0;

        // 新建一个副本，供取消时使用
        this.state = {
            contentComponentDataModel: new ContentComponentDataModel(this.props.componentData)
        };

        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    submit() {
        this.props.submit(this.state.contentComponentDataModel);
        this.props.close();
    }

    cancel() {
        this.setState({
            contentComponentDataModel: new ContentComponentDataModel(this.props.componentData)
        });
        this.props.close();
    }

    render() {
        return (
            <Modal
                title={`${this.props.title} 组件数据编辑`}
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
                        selectIndex={this.selectIndex}
                        selectOnclick={() => { }}
                    >
                        <this.props.componentObject.ComponentDataConfig
                            data={this.state.contentComponentDataModel}
                            setData={(value) => this.setState({ contentComponentDataModel: value })}
                            pageComponentSettings={this.props.pageComponent.pageComponentSettings}
                        />
                    </Tab>
                </div>
            </Modal>
        );
    }
}

EditFrame.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    componentData: PropTypes.object,
    componentObject: PropTypes.object.isRequired,
    pageComponent: PropTypes.object.isRequired,
}

export default EditFrame