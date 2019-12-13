import React from 'react';
import PropTypes from 'prop-types';

export default class BaseField extends React.Component {
    render() {
        return (
            <div>
                <label>{this.props.text}</label>
                <div className="input-group mb-3">
                    <input value={this.props.fieldValue} type="text" className="form-control" placeholder={`请输入${this.props.text}`}
                        onChange={
                            (event) => {
                                this.props.setFieldValue(event.target.value);
                            }
                        }
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">{this.props.text}</span>
                    </div>
                </div>
            </div>
        )
    }
}

BaseField.propTypes = {
    text: PropTypes.string.isRequired,
    fieldValue: PropTypes.string,
    // setFieldValue(value: string);
    setFieldValue: PropTypes.func.isRequired
}