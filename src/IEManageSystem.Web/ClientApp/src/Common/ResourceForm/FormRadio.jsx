import React from 'react';
import ReactDOM from 'react-dom';

export default class FormRadio extends React.Component
{
	// props.name
	// props.values
	// props.isEdit
	// props.selectValue  [{text:"", value:""}]
	// props.onChange(name, selectValue)
	constructor(props){
		super(props);

		this.state = {
			selectValue: props.selectValue
		};

		this.onChange = this.onChange.bind(this);
	}

	componentDidMount(){
    	$(':input:not(.labelauty)').labelauty();
	}

	componentWillReceiveProps(nextProps){
		this.state.selectValue = nextProps.selectValue;
	}

	componentDidUpdate(){
		$(':input:not(.labelauty)').labelauty();
	}

	onChange(event)
	{
		this.setState({selectValue: event.target.value}, ()=>{
			this.props.onChange(this.props.name, this.state.selectValue);
		});
	}

	render(){
		let radioLis = this.props.values.map((item, index)=>{
			if(item.value === this.state.selectValue || item.value.toString() === this.state.selectValue){
				return <li key={index}><input type="radio" name={this.props.name} data-labelauty={ item.text } value={item.value} checked={true} onChange={this.onChange} 
							readonly={ this.props.isEdit ? null:"readonly" }
						/></li>;
			}
			else{
				return <li key={index}><input type="radio" name={this.props.name} data-labelauty={ item.text } value={item.value} checked={false} onChange={this.onChange} 
							readonly={ this.props.isEdit ? null:"readonly" }
						/></li>;
			}
		});

		return(<ul>
			{radioLis}
		</ul>);
	}
}