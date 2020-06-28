import React from 'react';

import { Input, Tag, Button } from 'antd';
import { DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons'

export default class TextGroup extends React.Component {
	// 
	// props.name
	// props.values
	// props.title
	// props.isEdit
	// props.onChange(name, values)
	constructor(props) {
		super(props);

		this.state = {
			values: this.props.values || []
		};

		this.AddClick = this.AddClick.bind(this);
		this.DeleteClick = this.DeleteClick.bind(this);
		this.OnChange = this.OnChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.state.values = nextProps.values || [];
	}

	AddClick() {
		this.setState(
			(preState) => {
				preState.values.push("");
				return ({ values: preState.values });
			}
		)
	}

	DeleteClick(index) {
		this.setState(
			(preState) => {
				preState.values.splice(index, 1);
				return ({ values: preState.values });
			}
		)
	}

	OnChange(index, value) {
		this.setState(
			(preState) => {
				preState.values[index] = value;
				return ({ values: preState.values });
			},
			() => this.props.onChange(this.props.name, this.state.values)
		)
	}

	render() {
		let list = this.state.values.map(
			(item, index) =>
				<div className="d-flex mb-2">
					<Input
						disabled={!this.props.isEdit}
						value={item}
						onChange={(event) => this.OnChange(index, event.target.value)}
					/>
					{
						this.props.isEdit &&
						<Button icon={<DeleteOutlined />} type="danger" onClick={() => this.DeleteClick(index)}>删除</Button>
					}
				</div>);

		return (
			<div className="">
				<h5 class="font-weight-bold">{this.props.title}</h5>
				<div className="=">
					{list}
					{
						this.props.isEdit &&
						<Button icon={<PlusSquareOutlined />} type="primary" className="btn btn-success btn-sm" onClick={this.AddClick}>添加</Button>
					}
				</div>
			</div>);
	}
}