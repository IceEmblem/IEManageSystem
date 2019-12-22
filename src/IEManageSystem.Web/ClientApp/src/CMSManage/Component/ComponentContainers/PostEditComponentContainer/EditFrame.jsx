import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'Modal/Modal.jsx'

import Tab from 'Tab/Tab.jsx'

// props.submit
// props.close    fun
class EditFrame extends React.Component {
    constructor(props) {
        super(props);

        this.tabs = [{ index: 0, text: "基本设置" }];
        this.nameField = "text";
        this.selectIndex = 0;

        this.state = {};
        this.init(this.props);

        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }

    init(props){
        let componentData = props.componentData;
        if (componentData == null || !componentData) {
            componentData = {}
        }

        this.setState({
            field1: componentData.field1,
            field2: componentData.field2,
            field3: componentData.field3,
            field4: componentData.field4,
            field5: componentData.field5,
        });
    }

    submit() {
        this.props.submit({
            sign: this.props.pageComponent.sign,
            field1: this.state.field1,
            field2: this.state.field2,
            field3: this.state.field3,
            field4: this.state.field4,
            field5: this.state.field5,
        });
    }
    
    cancel(){
        this.init(this.props);
        this.props.close();
    }

    render() {
        return (
            <Modal
                show={this.props.show}
            >
                <div className="modal-dialog" style={{maxWidth: "80rem"}}>
                    <div className="modal-content">
                        <div className="modal-header bg-info text-white">
                            <h4 className="modal-title">编辑数据</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={this.props.close}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <Tab
                                tabs={this.tabs}
                                nameField={this.nameField}
                                selectIndex={this.selectIndex}
                                selectOnclick={() => { }}
                            >
                                <this.props.componentDataConfig 
                                    data={this.state}
                                    setData={(value)=>this.setState(value)}
                                />
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
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    pageComponent: PropTypes.object.isRequired,
    componentData: PropTypes.object,
    componentDataConfig: PropTypes.object.isRequired
}

export default EditFrame