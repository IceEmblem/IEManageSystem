import React from 'react';
import ReactDOM from 'react-dom';

export default class FormCheck extends React.Component
{
	// props.name
	// props.values
	// props.isEdit
	// props.selectValues
	// props.onChange(name, selectValues)
	constructor(props){
		super(props);

		this.state = {
			selectValues: props.selectValues || []
		};

		this.onChange = this.onChange.bind(this);
	}

	componentDidMount(){
    	$(':input:not(.labelauty)').labelauty();
	}

	componentWillReceiveProps(nextProps){
		this.state.selectValues = nextProps.selectValues || [];
	}

	componentDidUpdate(){
		$(':input:not(.labelauty)').labelauty();
	}

	onChange(event, index)
	{
		if(event.target.checked){
			this.state.selectValues.push(event.target.value);
			this.setState({selectValues: this.state.selectValues}, ()=>this.props.onChange(this.props.name, this.state.selectValues));
		}
		else{
			let i = this.state.selectValues.indexOf(this.props.values[index].value);
			this.state.selectValues.splice(i, 1);
			this.setState({selectValues: this.state.selectValues}, ()=>this.props.onChange(this.props.name, this.state.selectValues));
		}
	}

	render(){
		let checkboxLis = this.props.values.map((item, index)=>{
			let selectValues = this.state.selectValues;
			if(selectValues.indexOf(item.value) >= 0 || selectValues.indexOf(item.value.toString()) >= 0){
				return <li key={index}><input type="checkbox" name={this.props.name} data-labelauty={ item.text } value={item.value} checked={true} onChange={(event)=>this.onChange(event, index)} 
							readonly={ this.props.isEdit ? null:"readonly" }
						/></li>;
			}
			else{
				return <li key={index}><input type="checkbox" name={this.props.name} data-labelauty={ item.text } value={item.value} checked={false} onChange={(event)=>this.onChange(event, index)} 
							readonly={ this.props.isEdit ? null:"readonly" }
						/></li>;
			}
		});

		return(<ul>
			{checkboxLis}
		</ul>);
	}
}