import React from "react";
import {BaseCustomizeField} from '../BaseComponent'

class CustomizeField extends BaseCustomizeField {
    constructor(props) {
        super(props)
    }

    render() {
        // fieldValue = {
        //     type: "",
        //     value1: "",
        //     value2: ""
        // };

        return (
            <div>
                <label>{this.props.text}</label>
                <div>
                    <div className="input-group mb-3 col-md-4 float-left">
                        <input value={this.fieldValue.type} type="text" className="form-control" placeholder={`请输入类型`}
                            onChange={
                                (event) => {
                                    this.fieldValue.type = event.target.value;
                                    this.setState({});
                                }
                            }
                            onBlur={()=>{this.setFieldValue()}}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">类型</span>
                        </div>
                    </div>
                    <div className="input-group mb-3 col-md-4 float-left">
                        <input value={this.fieldValue.value1} type="text" className="form-control" placeholder={`请输入值`}
                            onChange={
                                (event) => {
                                    this.fieldValue.value1 = event.target.value;
                                    this.setState({});
                                }
                            }
                            onBlur={()=>{this.setFieldValue()}}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">柱1</span>
                        </div>
                    </div>
                    <div className="input-group mb-3 col-md-4 float-left">
                        <input value={this.fieldValue.value2} type="text" className="form-control" placeholder={`请输入值`}
                            onChange={
                                (event) => {
                                    this.fieldValue.value2 = event.target.value;
                                    this.setState({});
                                }
                            }
                            onBlur={()=>{this.setFieldValue()}}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">柱2</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomizeField
