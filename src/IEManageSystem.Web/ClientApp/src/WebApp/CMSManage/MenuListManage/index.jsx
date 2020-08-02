import React from 'react'
import { NavLink } from 'react-router-dom';
import Resource from 'Common/Resource/Resource.jsx';
import { ieReduxFetch } from 'Core/IEReduxFetch';

import { EditOutlined } from '@ant-design/icons'

// props.resource
function EditMenu(props) {
	return (
		<NavLink className="ant-btn ant-btn-sm"
			to={`/ManageHome/CMSManage/Menu/${props.resource.name}`}
		>
			<EditOutlined />
			<span>{" 编辑菜单"}</span>
		</NavLink>);
}

class MenuListManage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menus: []
		}

		this.deleteResource = this.deleteResource.bind(this);
		this.addResource = this.addResource.bind(this);
		this.updateResource = this.updateResource.bind(this);
		this.freshenResources = this.freshenResources.bind(this);
	}

	componentDidMount() {
	}

	getDescribes() {
		return [
			{ name: "id", isId: true, isAddShow: false, isEditShow: false, isLookupShow: false },
			{ name: "name", text: "菜单名称", isName: true, isShowOnList: true },
			{ name: "displayName", text: "显示名称", isShowOnList: true },
            { name: "pageName", text: "关联页面", isShowOnList: true },
            { name: "pageDataName", text: "关联文章", isShowOnList: true }
		];
	}

	// Resource组件删除资源通知
	deleteResource(resource) {
		let postData = {
			id: resource.id
		};

		ieReduxFetch("/api/MenuManage/RemoveMenu", postData)
			.then(value => {
				this.setState(value);
				this.getResourceList(this.state.pageIndex, this.state.pageSize, this.state.searchKey);
			});
	}

	// Resource组件添加资源通知
	addResource(resource) {
		resource.menuType = "CompositeMenu"
		let postData = {
			menu: resource
		};

		ieReduxFetch("/api/MenuManage/AddMenu", postData)
			.then(value => {
				this.setState(value);
				this.getResourceList(this.state.pageIndex, this.state.pageSize, this.state.searchKey);
			});
	}

	// Resource组件更新资源通知
	updateResource(resource) {
		let postData = resource;

		ieReduxFetch("/api/MenuManage/UpdateMenu", postData)
			.then(value => {
				this.setState(value);
				this.getResourceList(this.state.pageIndex, this.state.pageSize, this.state.searchKey);
			});
	}

	// Resource组件刷新资源通知
	freshenResources(pageIndex, pageSize, searchKey) {
		this.getResourceList();
	}

	// 获取资源列表
	getResourceList(pageIndex, pageSize, searchKey) {
		let postData = {
		};

		ieReduxFetch("/api/Menu/GetMenus", postData)
			.then(value => {
				this.setState({menus: value.menus});
			});
	}

	render() {
		let customizeOperateBtns = [];
		customizeOperateBtns.push(EditMenu);

		return (
			<div className="col-md-12 bg-white pt-3 pb-3">
				<Resource
					title="页面管理"
					describes={this.getDescribes()}
					resources={this.state.menus}	// ++
					freshenResources={this.freshenResources}
					deleteResource={this.deleteResource}
					addResource={this.addResource}
					updateResource={this.updateResource}
                    customizeOperateBtns={customizeOperateBtns}
                    hidePadding={true}
				/>
			</div>
		);
	}
}

export default MenuListManage;