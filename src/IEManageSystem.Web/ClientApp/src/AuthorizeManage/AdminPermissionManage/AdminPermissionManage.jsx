import React from 'react';
import ResourceChildList from 'ResourceChildList/ResourceChildList.jsx';
import { ieReduxFetch } from 'Core/IEReduxFetch';

export default class AdminPermissionManage extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
			admins: [],
			adminPermissions: [],
			previewResource: {}, 
			tabValue: ""
		}

        this.addResource = this.addResource.bind(this);
        this.updateResource = this.updateResource.bind(this);
        this.deleteResource = this.deleteResource.bind(this);
        this.freshenResources = this.freshenResources.bind(this);

        this.tabs = [{ value: "AdminPermissionManage", text: "管理员权限" }];
    }

    componentDidMount() {
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
            { name: "id", isId: true, isAddShow: false, isEditShow: false, isLookupShow: false },
            { name: "name", text: "权限名称", isName: true, isShowOnList: true, isEditCanEdit: false },
            { name: "displayName", text: "显示名称", isShowOnList: true },
        ];
	}

    // Resource组件添加资源通知
    addResource(previewResource, resource, tabValue){
    }

    // Resource组件更新资源通知
    updateResource(previewResource, resource, tabValue){
    }

    // Resource组件删除资源通知
    deleteResource(previewResource, resource, tabValue){
    }

    // 组件刷新资源通知
    freshenResources(previewResource, tabValue)
    {
        this.getResourceList(previewResource, tabValue);
        this.setState({previewResource, tabValue});
    }

    // 获取资源列表
    getResourceList(previewResource, tabValue){
        let postData = {
            id: previewResource.id
        };

        ieReduxFetch("/api/AdminManage/GetPermissions", postData)
		.then(value => {
			this.setState({adminPermissions: value.permissions});
		});
    }

    render(){
        return(
            <ResourceChildList 
                freshenResources={this.freshenResources}
                previewTitle="管理员名称"
                previewResourcesTextName="name"
                tabs={this.tabs}
                previewResources={this.state.admins} 		// ++
                resourceTitle="权限"
                describes={this.getDescribes()}
                resources={this.state.adminPermissions}			// ++
                addResource={this.addResource}
                updateResource={this.updateResource}
                deleteResource={this.deleteResource}
                hideAdd={true}
                hideEdit={true}
                hideDelete={true}
                hidePadding={true}
            />
        );
    }
}