import React from 'react';
import Resource from 'Resource/Resource.jsx';
import Tab from 'Tab/Tab.jsx';

import "./MenuPermission.css";
import { ieReduxFetch } from 'Core/IEReduxFetch';
import RootRedux from 'Core/IEReduxs/RootRedux'

import IESideNav from 'IESideNav';

class MenuPermission extends React.Component {
	constructor(props) {
		super(props);

		this.apiScopes = [];

		this.selectMenu = {};

		this.selectMenuPermissions = [];

		this.describes = [
			{ name: "id", isId: true, isAddShow: false, isEditShow: false, isLookupShow: false },
			{ name: "name", text: "权限名称", isName: true, isShowOnList: true, isEditCanEdit: false },
			{ name: "displayName", text: "权限显示名称", isShowOnList: true },
		];

		this.resourceChild = null;

		this._menuOnClick = this._menuOnClick.bind(this);

		this._getApiScopes();
	}


	// 获取资源列表
	_getResourceList() {
		this.selectMenuPermissions = [];

		if (this.selectMenu.accessScope == undefined) {
			this.setState({});
			return;
		}

		for (let item in this.selectMenu.accessScope) {
			let url = "";
			if (this.selectMenu.accessScope[item].isManageScope()) {
				url = "/api/ApiScopeManage/GetManagePermissionsByName"
			}
			else {
				url = "/api/ApiScopeManage/GetQueryPermissionsByName"
			}

			let scopeName = this.selectMenu.accessScope[item].scopeName;
			let postData = {
				name: scopeName
			}

			ieReduxFetch(url, postData).then(value => {
				this.selectMenuPermissions.push({
					scopeName: scopeName,
					permissions: value.permissions
				});
				this.setState({});
			});
		}
	}

	// 获取api域
	_getApiScopes() {
		ieReduxFetch("/api/ApiScopeManage/GetApiScopes", {}).then(value => {
			this.apiScopes = value.apiScopes;
		});
	}

	_menuOnClick(selectMenu) {
		this.selectMenu = selectMenu;

		this._getResourceList();
	}

	_getScopeDisplayName(scopeName) {
		for (let item in this.apiScopes) {
			if (this.apiScopes[item].name == scopeName) {
				return this.apiScopes[item].displayName;
			}
		}

		return null;
	}

	render() {
		let resources = [];
		for (let item in this.selectMenuPermissions) {
			let scopeName = this.selectMenuPermissions[item].scopeName;
			let scopeDisplayName = this._getScopeDisplayName(scopeName);

			let permissions = this.selectMenuPermissions[item].permissions;
			let resource = <Resource
				key={scopeName}
				title={scopeDisplayName + "域权限"}
				describes={this.describes}
				resources={permissions}
				freshenResources={() => { }}
				addResource={() => { }}
				updateResource={() => { }}
				deleteResource={() => { }}
				hideAdd={true}
				hideEdit={true}
				hideDelete={true}
				hidePadding={true} />;

			resources.push(resource);
			if (this.selectMenuPermissions.length - 1 - item > 0) {
				resources.push(
					<div className="d-flex justify-content-center padding-bottom-10">
						<span className="oi oi-medical-cross padding-bottom-10" title="icon name" aria-hidden="true"></span>
					</div>);
			}
		}

		return (
			<div className="w-100 h-100 menupermission">
				<div className="menupermission-left">
					<IESideNav 
						mainMenu={{ menuItems: this.props.topLevelMenus }}
						sideMenuSelect={this._menuOnClick}
					/>
				</div>
				<div className="menupermission-right">
					<Tab tabs={[{ value: "value", text: "菜单需求功能域" }]}
						nameField="text"
						selectIndex={1}
						selectOnclick={(tab, index) => {
						}}
					>
						{resources}
					</Tab>
				</div>
			</div>);
	}
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        topLevelMenus: state.topLevelMenus
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Contain = RootRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(MenuPermission)

export default Contain;