import React from 'react';
import ReactDOM from 'react-dom';

export default class Text extends React.Component
{
    // props.title
    // props.value
    // props.isEdit
    // props.onChange(value)
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"input-group mb-3"}>
                <div className="input-group-prepend w-20">
                    <span className="input-group-text w-100 justify-content-end border-right-0 bg-muted">{this.props.title}</span>
                </div>
                <input type="text" className="form-control"
                    placeholder={"请输入" + this.props.title}
                    readonly={this.props.isEdit ? null : "readonly"}
                    value={this.props.value == null ? "" : this.props.value}
                    onChange={event => { this.props.onChange(event.target.value) }} />
            </div>);
    }
}