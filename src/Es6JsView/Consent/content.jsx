import React from 'react';
import ReactDOM from 'react-dom';
import Authority from './authority.jsx';
import Logo from './logo.jsx';

export default class Content extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="col-md-8">   
				<Authority />
				<Logo />
            </div>
        );
	}
}