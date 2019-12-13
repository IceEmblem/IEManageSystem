import React from "react";
import PropTypes from 'prop-types';

class CustomizeField extends React.Component {
    constructor(props) {
        super(props)
    }

    getFieldValue(){
        return this.props.fieldValue ? JSON.parse(this.props.fieldValue) : {};
    }

    setFieldValue(fieldValue) {
        this.props.setFieldValue(JSON.stringify(fieldValue));
    }

    render() {
        // fieldValue = {
        //     type: "",
        //     value1: "",
        //     value2: ""
        // };
        let fieldValue = this.getFieldValue();

        return (
            <div>
                <label>{this.props.text}</label>
                <div>
                    <div className="input-group mb-3 col-md-4 float-left">
                        <input value={fieldValue.type} type="text" className="form-control" placeholder={`请输入类型`}
                            onChange={
                                (event) => {
                                    fieldValue.type = event.target.value;
                                    this.setFieldValue(fieldValue);
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">类型</span>
                        </div>
                    </div>
                    <div className="input-group mb-3 col-md-4 float-left">
                        <input value={fieldValue.value1} type="text" className="form-control" placeholder={`请输入值`}
                            onChange={
                                (event) => {
                                    fieldValue.value1 = event.target.value;
                                    this.setFieldValue(fieldValue);
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">柱1</span>
                        </div>
                    </div>
                    <div className="input-group mb-3 col-md-4 float-left">
                        <input value={fieldValue.value2} type="text" className="form-control" placeholder={`请输入值`}
                            onChange={
                                (event) => {
                                    fieldValue.value2 = event.target.value;
                                    this.setFieldValue(fieldValue);
                                }
                            }
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

CustomizeField.propTypes = {
    text: PropTypes.string.isRequired,
    fieldValue: PropTypes.string,
    setFieldValue: PropTypes.func.isRequired
}

export default CustomizeField
