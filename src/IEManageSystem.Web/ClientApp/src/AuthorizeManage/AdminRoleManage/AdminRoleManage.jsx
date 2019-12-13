import React from 'react';
import ResourceChildList from 'ResourceChildList/ResourceChildList.jsx';
import { ieReduxFetch } from 'Core/IEReduxFetch';

export default class AdminRoleManage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			admins: [],
			roles: [],
			adminRoles: [],
			previewResource: {}, 
			tabValue: ""
		}

		this.addResource = this.addResource.bind(this);
		this.deleteResource = this.deleteResource.bind(this);
		this.freshenResources = this.freshenResources.bind(this);

		this.tabs = [{ value: "value", text: "管理员角色" }];
	}

	componentDidMount() {
		ieReduxFetch("/api/RoleManage/GetRoles", {
			pageIndex: 1,
			pageSize: 9999,
			searchKey: ""
		}).then(value => {
			this.setState({ roles: value.roles });
		});

		ieReduxFetch("/api/AdminManage/GetAdmins", {
			pageIndex: 1,
			pageSize: 9999,
			searchKey: ""
		}).then(value => {
			value.admins.forEach((item) => {
				item.userName = item.account.userName;
			});
			this.setState({admins: value.admins});
		});
	}

	getDescribes() {
		return [
			{ name: "id", isId: true, isAddShow: false, isEditShow: false, isLookupShow: true },
			{ name: "name", text: "角色名称", isName: true, isShowOnList: true, isEditShow: false, isAddShow: false },
			{ name: "displayName", text: "角色显示名称", isShowOnList: true, isEditShow: false, isAddShow: false },
			{ name: "describe", text: "角色描述", isShowOnList: true, isEditShow: false, isAddShow: false },
			{
				name: "selectId", text: "请选择角色", valueType: "radio",
				valueTexts: this.state.roles.map(
					item => ({
						value: item.id,
						text: item.displayName,
					})),
				isLookupShow: false
			},
		];
	}

	// Resource组件添加资源通知
	addResource(previewResource, resource, tabValue) {
		let postData = {
			roleId: resource.selectId,
			adminId: previewResource.id,
		};

		ieReduxFetch("/api/AdminManage/AddRole", postData)
		.then(value => {
			this.setState(value);
			this.getResourceList(previewResource, tabValue);
		});
	}

	// Resource组件删除资源通知
	deleteResource(previewResource, resource, tabValue) {
		let postData = {
			roleId: resource.id,
			adminId: previewResource.id,
		};

		ieReduxFetch("/api/AdminManage/RemoveRole", postData)
		.then(value => {
			this.setState(value);
			this.getResourceList(previewResource, tabValue);
		});
	}

	// 组件刷新资源通知
	freshenResources(previewResource, tabValue) {
		this.getResourceList(previewResource, tabValue);
		this.setState({previewResource, tabValue});
	}

	// 获取资源列表
	getResourceList(previewResource, tabValue) {
		let postData = {
			id: previewResource.id
		};

		ieReduxFetch("/api/AdminManage/GetAdminRoles", postData)
		.then(value => {
			this.setState({adminRoles: value.roles});
		});
	}

	render() {
		return (
			<ResourceChildList
				freshenResources={this.freshenResources}
				previewTitle="管理员名称"
				previewResourcesTextName="name"
				tabs={this.tabs}
				previewResources={this.state.admins} 		// ++
				resourceTitle="角色"
				describes={this.getDescribes()}				// M
				resources={this.state.adminRoles}			// ++
				addResource={this.addResource}
				updateResource={this.updateResource}
				deleteResource={this.deleteResource}
				hideEdit={true}
				hidePadding={true}
			/>
		);
	}
}