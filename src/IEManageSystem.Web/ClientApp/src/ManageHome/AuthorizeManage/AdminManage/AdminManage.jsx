import React from 'react';
import Resource from 'Resource/Resource.jsx';
import { ieReduxFetch } from 'Core/IEReduxFetch';

class AdminManage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			admins: [],
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
			{ name: "id", isId: true, isAddShow: false, isEditShow: false, isLookupShow: false },
			{ name: "userName", text: "用户名", isName: true, isShowOnList: true, isEditCanEdit: false },
			{ name: "password", text: "密码" },
			{ name: "emailAddress", text: "邮箱地址", isShowOnList: true },
			{ name: "name", text: "昵称", isShowOnList: true },
			{ name: "phone", text: "手机号", isShowOnList: true },
		];
	}

	// Resource组件添加资源通知
	addResource(resource) {
		let postData = resource;

		ieReduxFetch("/api/AdminManage/CreateAdmin", postData)
		.then(value => {
			this.setState(value);
			this.getResourceList(this.state.pageIndex, this.state.pageSize, this.state.searchKey);
		});
	}

	// Resource组件更新资源通知
	updateResource(resource) {
		let postData = resource;

		ieReduxFetch("/api/AdminManage/UpdateAdmin", postData)
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

		ieReduxFetch("/api/AdminManage/DeleteAdmin", postData)
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

		ieReduxFetch("/api/AdminManage/GetAdmins", postData)
		.then(value => {
			value.admins.forEach((item) => {
				item.userName = item.account.userName;
			});
			this.setState(value);
		});
	}

	render() {
		return (
			<div className="col-md-12">
				<Resource
					title="管理员管理"
					describes={this.getDescribes()}
					resources={this.state.admins}	// ++
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

export default AdminManage