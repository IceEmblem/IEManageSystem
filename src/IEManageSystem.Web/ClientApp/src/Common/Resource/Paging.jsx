import React from 'react';
import { Pagination, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

export default class Paging extends React.Component
{
	// props.hideAdd
	// props.hidePadding
	// props.customizeBottomOperateBtns
	// props.total		资源总数
	// props.pageSize	每页条数
	// props.pageIndex
	// props.pageIndexChange : (pageIndex)=>void
	// props.resourceAddClick	:	(event)=>void
	constructor(props){
		super(props);
	}
	
	render(){
		return (
            <div className="data-paging mt-auto d-flex justify-content-between w-100">
                {
					this.props.hidePadding != true &&
					<Pagination defaultCurrent={this.props.pageIndex} defaultPageSize={this.props.pageSize} total={this.props.total} 
						onChange={(pageIndex, pageSize)=>{ this.props.pageIndexChange(pageIndex); }}
					/>
                }
				{this.props.hideAdd != true && <Button icon={<PlusCircleOutlined />} onClick={this.props.resourceAddClick} type="primary">添加</Button>}
				{this.props.customizeBottomOperateBtns}
            </div>
		);
	}
}