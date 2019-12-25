import React from 'react';
import ReactDOM from 'react-dom';
import './Preview.css';

export default class Preview extends React.Component
{
    // props.title
    // props.previewResources
    // props.textName
    // props.previewOnClick()
    // props.operationName
	constructor(props){
        super(props);
        
        this.state = {
            selectPreviewResource: null
        }
	}
	
	render()
    {
        let lis = [];
        for(let item in this.props.previewResources){
            let li = <li className={`list-group-item d-flex justify-content-between ${this.state.selectPreviewResource == this.props.previewResources[item] ? "preview-selected" : ""}`} key={item}>
                            <span className="mt-auto mb-auto">{this.props.previewResources[item][this.props.textName]}</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"
                                    onClick={()=>{
                                        this.props.previewOnClick(this.props.previewResources[item]);
                                        this.setState({selectPreviewResource: this.props.previewResources[item]});
                                    }}
                                ><span className="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>{this.props.operationName}</button>
                            </span>
                    </li>

            lis.push(li);
        }

		return (
		    <div className="preview shadow h-100">
                <h6 className="d-flex">
                    <span className="oi oi-list" title="icon name" aria-hidden="true"></span>
                    <span className="padding-left-10">{this.props.title}</span>
                </h6>
                <h6 id="previewSearch" className="preview-search">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary btn-sm text-white" type="submit">
                                <span className="oi oi-magnifying-glass" title="icon name" aria-hidden="true"></span>
                            </button> 
                        </div>
                    </div>
                </h6>
                <div className="">
                    <ul className="list-group">
                        {lis}
                    </ul>
                </div>
            </div>
		);
	}
}