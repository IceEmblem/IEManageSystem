import React from 'react';
import PropTypes from 'prop-types';

import Tab from 'Common/Tab/Tab.jsx'

import { Modal, Button } from 'antd';
import IETool from 'Core/ToolLibrary/IETool'

// props.submit
// props.close    fun
class EditFrame extends React.Component {
    constructor(props) {
        super(props);

        this.tabs = [{ index: 0, text: "基本设置" }];
        this.nameField = "text";

        // 新建一个副本，供取消时使用
        this.state = {
            componentData: IETool.deepCopy(this.props.componentData)
        };

        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ componentData: IETool.deepCopy(nextProps.componentData) });
    }

    submit() {
        this.props.submit(this.state.componentData);
        this.props.close();
    }

    cancel() {
        this.props.close();
    }

    render() {
        return (
            <Modal
                title={`${this.props.componentDescribe.displayName} 组件数据编辑`}
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
                        selectOnclick={() => { }}
                    >
                        {
                            this.props.componentDescribe.componentObject.ComponentDataConfig &&
                            <this.props.componentDescribe.componentObject.ComponentDataConfig
                                data={this.state.componentData}
                                setData={(value) => this.setState({ componentData: value })}
                                pageComponentSettings={this.props.pageComponent.pageComponentSettings}
                            />
                        }
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
    pageComponent: PropTypes.object.isRequired,
    componentDescribe: PropTypes.object.isRequired,
}

export default EditFrame