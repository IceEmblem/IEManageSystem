import React from 'react';
import { Select, Tag } from 'antd';

const { Option } = Select;

export default class FormSelect extends React.Component {
    // props.name
    // props.values
    // props.isEdit
    // props.selectValue
    // props.onChange(name, selectValue)
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(selectValue) {
        this.props.onChange(this.props.name, selectValue)
    }

    render() {
        return (
            <div className="d-flex align-items-center">
                <Tag className="text-right" style={{width:"80px", marginLeft: "12px"}} color="#55acee">{this.props.title}</Tag>
                <Select className="flex-grow-1 flex-shrink-1" value={this.props.selectValue} disabled={!this.props.isEdit} onChange={this.onChange}>
                    {this.props.values.map(item => (<Option value={item.value}>{item.text}</Option>))}
                </Select>
            </div>
        )
    }
}