import React from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

export default class FormCheck extends React.Component {
	// props.name
	// props.values
	// props.isEdit
	// props.selectValues
	// props.onChange(name, selectValues)
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
	}

	onChange(selectValues) {
		this.props.onChange(this.props.name, selectValues)
	}

	render() {
		return (<CheckboxGroup
			disabled={this.props.isEdit}
			options={this.props.values}
			value={this.props.selectValues}
			onChange={this.onChange}
		/>);
	}
}