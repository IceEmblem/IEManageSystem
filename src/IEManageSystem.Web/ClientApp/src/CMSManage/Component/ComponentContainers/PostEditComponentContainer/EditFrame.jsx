import React from 'react';
import PropTypes from 'prop-types';
import ContentComponentDataModel from 'CMSManage/Models/PageDatas/ContentComponentDataModel'

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

        // 新建一个副本，供取消时使用
        this.state = {
            contentComponentDataModel: new ContentComponentDataModel(this.props.componentData)
        };

        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    submit() {
        this.props.submit(this.state.contentComponentDataModel);
    }
    
    cancel(){
        this.setState({
            ContentComponentDataModel: new ContentComponentDataModel(this.props.componentData)
        });
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
                                <this.props.componentObject.ComponentDataConfig 
                                    data={this.state.contentComponentDataModel}
                                    setData={(value)=>this.setState({contentComponentDataModel: value})}
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
    componentData: PropTypes.object,
    componentObject: PropTypes.object.isRequired
}

export default EditFrame