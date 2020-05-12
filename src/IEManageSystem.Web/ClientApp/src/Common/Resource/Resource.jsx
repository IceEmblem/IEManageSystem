import 'labelauty';
import 'labelautycss';

import React from 'react';
import ResourceDescribe from './ResourceDescribe.js';
import ResourceList from './ResourceList.jsx';
import Paging from './Paging.jsx';
import ResourceDelete from './ResourceDelete.jsx';
import ResourceForm from 'ResourceForm/ResourceForm.jsx';

require("./Resource.css");

var operationState = {
	none: "none",
	add: "add",
	delete: "delete",
	edit: "edit",
	lookup: "lookup"
}


export default class Resource extends React.Component {
	// props.title  标题
	// props.describes  资源描述
	// props.resources  资源
	// props.pageIndex	页索引
	// props.pageSize	每一页资源数量
	// props.resourceNum	总资源数量
	// props.freshenResources()  刷新数据接口
	// props.addResource()  添加数据接口
	// props.updateResource()  更新数据接口
	// props.deleteResource()  删除数据接口
	// props.customizeOperateBtns	自定义操作按钮组件
	// props.customizeBottomOperateBtns	自定义底部操作按钮组件
	// props.hideAdd = false
	// props.hideEdit = false
	// props.hideDelete = false
	// props.hidePadding = false
	constructor(props) {
		super(props);

		this.pageSize = this.props.pageSize || 10;
		this.searchKey = "";

		this.state =
			{
				curResource: {},
				operationState: operationState.none,
				fromModalShow: false,
				deleteModalShow: false
			};

		this._pageIndexChange = this._pageIndexChange.bind(this);
		this._resourceOperationClick = this._resourceOperationClick.bind(this);
		this._resourceUpdate = this._resourceUpdate.bind(this);
		this._searchClick = this._searchClick.bind(this);
	}

	componentDidMount(){
		this.props.freshenResources(1, this.pageSize, this.searchKey);
	}

	getResourceNum(){
		let pageNum = parseInt(this.props.resourceNum / this.pageSize);
		if ((this.props.resourceNum % this.pageSize) > 0) {
			pageNum++;
		}

		return pageNum;
	}

	// 搜索单击
	_searchClick(searchKey) {
		this.searchKey = searchKey;
		this.props.freshenResources(this.props.pageIndex || 1, this.pageSize, this.searchKey);
	}

	// 页索引改变
	_pageIndexChange(pageIndex) {
		this.props.freshenResources(pageIndex, this.pageSize, this.searchKey);
	}

	// 操作按钮点击
	_resourceOperationClick(operation, resource) 
	{
		if(operation == operationState.delete){
			this.setState({ 
				operationState: operation, 
				deleteModalShow: true, 
				curResource: resource || {}
			});
		}
		else{
			this.setState({ 
				operationState: operation, 
				fromModalShow: true, 
				curResource: resource || {}
			});
		}
	}

	// 更新资源
	_resourceUpdate(operation, resource) {
		if (operation == operationState.add) {
			this.props.addResource(resource);
		}
		else if (operation == operationState.edit) {
			this.props.updateResource(resource);
		}
		else if (operation == operationState.delete) {
			this.props.deleteResource(resource);
		}
		this.setState({fromModalShow: false});
	}

	render() {
		let resourceDescribe = new ResourceDescribe(this.props.describes);

		let resourceList = <ResourceList
			title={this.props.title}
			resources={this.props.resources}
			describes={resourceDescribe.getDescribesOfList()}
			searchClick={this._searchClick}
			resourceEditClick={resource => this._resourceOperationClick(operationState.edit, resource)}
			resourceDeleteClick={resource => this._resourceOperationClick(operationState.delete, resource)}
			resourceLookupClick={resource => this._resourceOperationClick(operationState.lookup, resource)}
			hideEdit={this.props.hideEdit}
			hideDelete={this.props.hideDelete}
			customizeOperateBtns={this.props.customizeOperateBtns}
		/>;

		let paging = <Paging
			resourceAddClick={() => this._resourceOperationClick(operationState.add)}
			hideAdd={this.props.hideAdd}
			hidePadding={this.props.hidePadding}
			pageNum={this.getResourceNum()}
			pageIndex={this.props.pageIndex}
			pageIndexChange={this._pageIndexChange}
			customizeBottomOperateBtns={this.props.customizeBottomOperateBtns} />;

		let describes;
		let isHideSubmit = false;
		if(this.state.operationState == operationState.add){
			describes = resourceDescribe.getDescribesOfAdd();
		}
		else if(this.state.operationState == operationState.edit){
			describes = resourceDescribe.getDescribesOfEdit();
		}
		else if(this.state.operationState == operationState.lookup){
			describes = resourceDescribe.getDescribesOfLookup();
			isHideSubmit = true;
		}

		return (
			<div className="w-100 h-100 d-flex flex-column pb-3">
				{resourceList}
				{paging}
				<ResourceForm
						title={this.props.title}
						describes={describes}
						resource={this.state.curResource}
						resourceUpdate={resource => this._resourceUpdate(this.state.operationState, resource)}
						show={this.state.fromModalShow}
						isHideSubmit={isHideSubmit}
						close={()=>{this.setState({fromModalShow:false})}} />
				<ResourceDelete
						title={this.props.title}
						nameDescribe={resourceDescribe.nameDescribes}
						resource={this.state.curResource}
						resourceUpdate={resource => this._resourceUpdate(operationState.delete, resource)}
						show={this.state.deleteModalShow}
						close={()=>{this.setState({deleteModalShow:false})}} />
			</div>
		);
	}
}