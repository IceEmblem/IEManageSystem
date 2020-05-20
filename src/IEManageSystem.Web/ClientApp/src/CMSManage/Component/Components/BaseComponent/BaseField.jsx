import React from 'react';
import PropTypes from 'prop-types';

import { Input, Tag } from 'antd';

export default class BaseField extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <label>{this.props.text}</label>
                <div className="input-group mb-3">
                    <Input
                        value={this.props.fieldValue}
                        placeholder={`请输入${this.props.text}`}
                        onChange={
                            (event) => {
                                this.props.setFieldValue(event.target.value);
                            }
                        }
                        suffix={<Tag color="#55acee">{this.props.text}</Tag>}
                    />
                </div>
            </div>
        )
    }
}

BaseField.propTypes = {
    text: PropTypes.string.isRequired,
    fieldValue: PropTypes.string,
    // setFieldValue(value: string);
    setFieldValue: PropTypes.func.isRequired,
}