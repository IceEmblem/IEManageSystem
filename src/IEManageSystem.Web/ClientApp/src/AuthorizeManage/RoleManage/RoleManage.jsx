import React from 'react';
import Resource from 'Resource/Resource.jsx';
import { ieReduxFetch } from 'Core/IEReduxFetch';

class RoleManage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			roles: [],
			resourceNum: 0,
			pageIndex: 1,
			pageSize: 10,
			searchKey: ""
		}

		this.addResource = this.addResource.bind(this);
		this.updateResource = this.updateResource.bind(this);
		this.deleteResource = this.deleteResource.bind(this);
		this.freshenResources = this.freshenResources.bind(this);
	}

	componentDidMount() {
	}

	getDescribes() {
		return [
			{ name: "id", isId: true, isAddShow: false, isEditShow: false, isLookupShow: true },
			{ name: "name", text: "角色名称", isName: true, isShowOnList: true, isEditCanEdit: false },
			{ name: "displayName", text: "角色显示名称", isShowOnList: true },
			{ name: "describe", text: "角色描述", isShowOnList: true },
		];
	}

	// Resource组件添加资源通知
	addResource(resource) {
		let postData = resource;

		ieReduxFetch("/api/RoleManage/AddRole", postData)
		.then(value => {
			this.setState(value);
			this.getResourceList(this.state.pageIndex, this.state.pageSize, this.state.searchKey);
		});
	}

	// Resource组件更新资源通知
	updateResource(resource) {
		let postData = resource;

		ieReduxFetch("/api/RoleManage/UpdateRole", postData)
		.then(value => {
			this.setState(value);
			this.getResourceList(this.state.pageIndex, this.state.pageSize, this.state.searchKey);
		});
	}

	// Resource组件删除资源通知
	deleteResource(resource) {
		let postData = {
			id: resource.id
		};

		ieReduxFetch("/api/RoleManage/DeleteRole", postData)
		.then(value => {
			this.setState(value);
			this.getResourceList(this.state.pageIndex, this.state.pageSize, this.state.searchKey);
		});
	}

	// Resource组件刷新资源通知
	freshenResources(pageIndex, pageSize, searchKey) {
		this.getResourceList(pageIndex, pageSize, searchKey);
		this.setState({
			pageIndex, pageSize, searchKey
		});
	}

	// 获取资源列表
	getResourceList(pageIndex, pageSize, searchKey) {
		let postData = {
			pageIndex: pageIndex,
			pageSize: pageSize,
			searchKey: searchKey
		};

		ieReduxFetch("/api/RoleManage/GetRoles", postData)
		.then(value => {
			this.setState(value);
		});
	}

	render() {
		return (
			<div className="col-md-12 bg-white pt-3 pb-3">
				<Resource
					title="角色"
					describes={this.getDescribes()}
					resources={this.state.roles}	// ++
					pageIndex={this.state.pageIndex}		// ++
					resourceNum={this.state.resourceNum}	// ++
					freshenResources={this.freshenResources}
					addResource={this.addResource}
					updateResource={this.updateResource}
					deleteResource={this.deleteResource}
				/>
			</div>
		);
	}
}

export default RoleManage