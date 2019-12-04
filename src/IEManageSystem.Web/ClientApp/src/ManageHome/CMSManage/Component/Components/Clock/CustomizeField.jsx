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
        //     value: ""
        // };
        let fieldValue = this.getFieldValue();

        return (
            <div>
                <label>{this.props.text}</label>
                <div>
                    <div className="input-group mb-3 col-md-6 float-left">
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
                    <div className="input-group mb-3 col-md-6 float-left">
                        <input value={fieldValue.value} type="text" className="form-control" placeholder={`请输入占比（1~24）`}
                            onChange={
                                (event) => {
                                    fieldValue.value = event.target.value;
                                    this.setFieldValue(fieldValue);
                                }
                            }
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

CustomizeField.propTypes = {
    text: PropTypes.string.isRequired,
    fieldValue: PropTypes.string,
    setFieldValue: PropTypes.func.isRequired
}

export default CustomizeField