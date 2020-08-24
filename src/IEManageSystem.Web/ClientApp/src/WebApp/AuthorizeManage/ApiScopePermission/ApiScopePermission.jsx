import React from 'react';
import ResourceChildList from 'Common/ResourceChildList/ResourceChildList.jsx';
import { ieReduxFetch } from 'Core/IEReduxFetch';

const scopePermissionType = {
	manage: "manage",
	query: "query",
}

export default class ApiScopePermission extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			apiScopes: [],
			permissions: [],
			apiScopePermissions: [],
			previewResource: {},
			tabValue: ""
		}

		this.addResource = this.addResource.bind(this);
		this.updateResource = this.updateResource.bind(this);
		this.deleteResource = this.deleteResource.bind(this);
		this.freshenResources = this.freshenResources.bind(this);

		this.tabs = [{ value: scopePermissionType.manage, text: "管理域" }, { value: scopePermissionType.query, text: "查询域" }];
	}

	componentDidMount() {
		ieReduxFetch("/api/ApiScopeManage/GetApiScopes", {}).then(value => {
			this.setState({ apiScopes: value.apiScopes });
		});

		ieReduxFetch("/api/PermissionManage/GetPermissions", {
			pageIndex: 1,
			pageSize: 9999,
			searchKey: ""
		}).then(value => {
			this.setState({ permissions: value.permissions });
		});
	}

	getDescribes() {
		return [
			{ name: "id", isId: true, isAddShow: false, isEditShow: false, isLookupShow: true },
			{ name: "name", text: "权限名称", isName: true, isShowOnList: true, isEditShow: false, isAddShow: false },
			{ name: "displayName", text: "显示名称", isShowOnList: true, isEditShow: false, isAddShow: false },
			{
				name: "permissionId", text: "请选择权限", valueType: "radio",
				valueTexts: this.state.permissions.map(item => ({
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
			permissionId: resource.permissionId,
			apiScopeId: previewResource.id,
		};

		ieReduxFetch(tabValue == scopePermissionType.manage ? "/api/ApiScopeManage/AddManagePermission" : "/api/ApiScopeManage/AddQueryPermission", postData)
		.then(value => {
			this.setState(value);
			this.getResourceList(previewResource, tabValue);
		});
	}

	// Resource组件更新资源通知
	updateResource(previewResource, resource, tabValue) {
	}

	// Resource组件删除资源通知
	deleteResource(previewResource, resource, tabValue) {
		let postData = {
			permissionId: resource.id,
			apiScopeId: previewResource.id,
		};

		ieReduxFetch(tabValue == scopePermissionType.manage ? "/api/ApiScopeManage/RemoveManagePermission" : "/api/ApiScopeManage/RemoveQueryPermission", postData)
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

		ieReduxFetch(tabValue == scopePermissionType.manage ? "/api/ApiScopeManage/GetManagePermissions" : "/api/ApiScopeManage/GetQueryPermissions", postData)
		.then(value => {
			this.setState({apiScopePermissions: value.permissions});
		});
	}

	render() {
		return (
			<ResourceChildList
				freshenResources={this.freshenResources}
				previewTitle="功能域名称"
				previewResourcesTextName="displayName"
				tabs={this.tabs}
				previewResources={this.state.apiScopes} 		// ++
				resourceTitle="权限"
				describes={this.getDescribes()}
				resources={this.state.apiScopePermissions}			// ++
				addResource={this.addResource}
				updateResource={this.updateResource}
				deleteResource={this.deleteResource}
				hideEdit={true}
				hidePadding={true}
			/>
		);
	}
}