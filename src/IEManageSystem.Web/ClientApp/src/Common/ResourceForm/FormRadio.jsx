import React from 'react';
import { Radio } from 'antd';

export default class FormRadio extends React.Component
{
	// props.name
	// props.values
	// props.isEdit
	// props.selectValue  [{text:"", value:""}]
	// props.onChange(name, selectValue)
	constructor(props){
		super(props);

		this.onChange = this.onChange.bind(this);
	}

	onChange(event)
	{
		this.props.onChange(this.props.name, event.target.value);
	}

	render(){

		return (
			<Radio.Group disabled={!this.props.isEdit} onChange={this.onChange} value={this.props.selectValue}>
				{this.props.values.map((item)=><Radio value={item.value}>{item.text}</Radio>)}
			</Radio.Group>
		  );
	}
}