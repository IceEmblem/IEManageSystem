import React from 'react';
import { Input, Tag } from 'antd';

export default class Text extends React.Component {
    // props.title
    // props.value
    // props.isEdit
    // props.onChange(value)
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"input-group"}>
                <Input placeholder={`输入${this.props.title}`} prefix={<Tag style={{width:"80px"}} className="text-right" color="#55acee">{this.props.title}</Tag>} 
                    disabled={!this.props.isEdit}
                    value={this.props.value == null ? "" : this.props.value}
                    onChange={event => { this.props.onChange(event.target.value) }}
                />
            </div>);
    }
}