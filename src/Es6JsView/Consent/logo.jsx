import React from 'react';
import ReactDOM from 'react-dom';

export default class Logo extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(<div className="col-md-4 float-left">
                        <div className="logo">
                            <div className="w-75">
                                <img src="/images/logo.png" alt="" className="w-100" />
                            </div>
                        </div>
                    </div>);
	}
}