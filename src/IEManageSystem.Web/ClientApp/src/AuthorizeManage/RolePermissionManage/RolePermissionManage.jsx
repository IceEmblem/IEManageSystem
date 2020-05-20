import React from 'react';
import ResourceChildList from 'ResourceChildList/ResourceChildList.jsx';
import { ieReduxFetch } from 'Core/IEReduxFetch';

export default class RolePermissionManage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roles: [],
            permissions: [],
            rolePermissions: [],
            previewResource: {},
            tabValue: ""
        }

        this.addResource = this.addResource.bind(this);
        this.updateResource = this.updateResource.bind(this);
        this.deleteResource = this.deleteResource.bind(this);
        this.freshenResources = this.freshenResources.bind(this);

        this.tabs = [{ value: "value", text: "角色权限" }];
    }

    componentDidMount() {
        ieReduxFetch("/api/RoleManage/GetRoles", {
            pageIndex: 1,
            pageSize: 9999,
            searchKey: ""
        }).then(value => {
            this.setState({ roles: value.roles });
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
            { name: "id", isId: true, isAddShow: false, isEditShow: false, isLookupShow: false },
            { name: "name", text: "权限名称", isAddShow: false, isEditShow: false, isName: true, isShowOnList: true, isEditCanEdit: false },
            { name: "displayName", text: "显示名称", isAddShow: false, isEditShow: false, isShowOnList: true },
            {
                name: "selectId", text: "请选择权限", valueType: "radio",
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
            permissionId: resource.selectId,
            roleId: previewResource.id,
        };

        ieReduxFetch("/api/RoleManage/AddPermission", postData)
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
            roleId: previewResource.id,
        };

        ieReduxFetch("/api/RoleManage/RemovePermission", postData)
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

        ieReduxFetch("/api/RoleManage/GetPermissions", postData)
		.then(value => {
			this.setState({rolePermissions: value.permissions});
		});
    }

    render() {
        return (
            <ResourceChildList
                freshenResources={this.freshenResources}
                previewTitle="角色名称"
                previewResourcesTextName="displayName"
                tabs={this.tabs}
                previewResources={this.state.roles} 		// ++
                resourceTitle="权限"
                describes={this.getDescribes()}
                resources={this.state.rolePermissions}			// ++
                addResource={this.addResource}
                updateResource={this.updateResource}
                deleteResource={this.deleteResource}
                hideEdit={true}
                hidePadding={true}
            />
        );
    }
}