import React from 'react';

export default class Paging extends React.Component
{
	// props.hideAdd
	// props.hidePadding
	// props.customizeBottomOperateBtns
	constructor(props){
		super(props);
	}
	
	render(){
		const minIndex = this.props.pageIndex - 4;
		const maxIndex = this.props.pageIndex + 4;
		
		let lis = new Array();
		lis.push(<li key={-9999} className="page-item shadow"><button onClick={()=>this.props.pageIndexChange(this.props.pageIndex - 1)} className={`btn btn-info`} disabled={this.props.pageIndex <= 1}>上一页</button></li>);

		for(let min = minIndex; min <= maxIndex && min <= this.props.pageNum; min++)
		{
			if(min > 0){
                let li = null;
                if(min == this.props.pageIndex){
                    li = <li key={min} className="page-item"><button onClick={()=>this.props.pageIndexChange(min)} className="btn btn-secondary" href="javascript:void(0)">{ min }</button></li>;
                }
				else{
                    li = <li className="page-item"><button onClick={()=>this.props.pageIndexChange(min)} className="btn btn-outline-secondary border border-0" href="javascript:void(0)">{ min }</button></li>;
                }

				lis.push(li);
			}
		}

		lis.push(<li key={9999} className="page-item shadow"><button onClick={()=>this.props.pageIndexChange(this.props.pageIndex + 1)} className={`btn btn-info`}  disabled={this.props.pageIndex >= this.props.pageNum}>下一页</button></li>);

		return (
            <div className="data-paging mt-auto d-flex justify-content-between w-100">
                {
                	this.props.hidePadding != true &&
                	<ul className="pagination pagination-md">
                        {lis}
                    </ul>
                }
				{this.props.hideAdd != true && <button type="button" className="btn btn-info shadow" onClick={this.props.resourceAddClick}>+添加</button>}
				{this.props.customizeBottomOperateBtns}
            </div>
		);
	}
}