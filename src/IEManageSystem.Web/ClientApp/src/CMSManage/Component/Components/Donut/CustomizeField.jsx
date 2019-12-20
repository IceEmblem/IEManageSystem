import React from "react";
import {BaseCustomizeField} from '../BaseComponent'

class CustomizeField extends BaseCustomizeField {
    constructor(props) {
        super(props)
    }

    render() {
        // fieldValue = {
        //     type: "",
        //     value: ""
        // };
        return (
            <div>
                <label>{this.props.text}</label>
                <div>
                    <div className="input-group mb-3 col-md-6 float-left">
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
                    <div className="input-group mb-3 col-md-6 float-left">
                        <input value={this.fieldValue.value} type="text" className="form-control" placeholder={`请输入占比（0~100）`}
                            onChange={
                                (event) => {
                                    this.fieldValue.value = event.target.value;
                                    this.setState({});
                                }
                            }
                            onBlur={()=>{this.setFieldValue()}}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">占比</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomizeField
