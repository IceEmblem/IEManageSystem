import React from 'react';
import ReactDOM from 'react-dom';

export default class TextGroup extends React.Component
{
	// 
	// props.name
	// props.values
	// props.title
	// props.isEdit
	// props.onChange(name, values)
	constructor(props){
		super(props);

		this.state = {
			values: this.props.values || []
		};

		this.AddClick = this.AddClick.bind(this);
	    this.DeleteClick = this.DeleteClick.bind(this);
	    this.OnChange = this.OnChange.bind(this);
	}

	componentWillReceiveProps(nextProps){
		this.state.values = nextProps.values || [];
	}

	// 登录重定向添加单击
	AddClick(){
	    this.setState(
	      (preState)=>{
	        preState.values.push("");
	        return ({ values: preState.values });
	      }
	    )
	}

	// 登录重定向删除单击
	DeleteClick(index){
	    this.setState(
	      (preState)=>{
	        preState.values.splice(index, 1);
	        return ({ values: preState.values });
	      }
	    )
	}

	// 登录重定向表单输入
	OnChange(index, value)
	{
	    this.setState(
	      (preState)=>{
	        preState.values[index] = value;
	        return ({ values: preState.values });
	      },
	      ()=>this.props.onChange(this.props.name, this.state.values)
	    )
	}

	render(){
		let list = this.state.values.map(
      		(item, index)=>
      		<div className="d-flex margin-buttom10">
              <input name={this.props.name} type="text" className="form-control" value={item} 
              	readonly={ this.props.isEdit ? null:"readonly" }
                onChange={(event)=>this.OnChange(index, event.target.value)} />
              { 
              	this.props.isEdit && 
              	<button className="btn btn-danger btn-sm" onClick={()=>this.DeleteClick(index)}>删除</button>
              }
            </div>);

		return(
			<div className="card">
                <div className="card-header bg-secondary text-white">{this.props.title}</div>
                <div className="card-body">
                    {list}
                    { 
		              	this.props.isEdit && 
		              	<button className="btn btn-success btn-sm" onClick={this.AddClick}>+添加</button>
		            }
                </div> 
            </div>);
	}
}