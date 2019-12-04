import React from 'react';
import Resource from 'Resource/Resource.jsx';
import Tab from 'Tab/Tab.jsx';

import "./MenuPermission.css";
import { ApiScopeNodeType } from "Core/ApiScopeAuthority/ApiScopeNodeType.js";
import { ieReduxFetch } from 'Core/IEReduxFetch';
import {connect} from 'react-redux'

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
			if (this.selectMenu.accessScope[item].scopeNodeType == ApiScopeNodeType.manage) {
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

	_createMenusIteration(menu) {
		let lis = Array();

		let menuItems = menu.menuItems;
		for (let item in menuItems) {
			let icon = <span className={
				"oi padding-right-10 " +
				(menuItems[item].icon == undefined ? "oi-tags leftmenu-icon-hide" : menuItems[item].icon)
			} title="icon name" aria-hidden="true">
			</span>
			let text = <span>{" " + menuItems[item].text}</span>;

			let navLink = null;
			let childMenus = null;
			if (menuItems[item].menuItems != undefined && menuItems[item].menuItems.length > 0) {
				navLink =
					<a href="javascript:void(0)" className="text-white" onClick={
						event => {
							// 隐藏所有子菜单
							let lis = $(event.target).parents("ul").eq(0).children("li");
							lis.children("div").hide(500);
							lis.children("a").find("span.oi-chevron-right").removeClass("rotate90");

							let div = $(event.target).parents("li").eq(0).children("div");
							if (div.css("display") == "none") {
								div.show(500);
								$(event.target).find("span.oi-chevron-right").addClass("rotate90");
							}
							else {
								div.hide(500);
								$(event.target).find("span.oi-chevron-right").removeClass("rotate90");
							}
						}
					}>
						{icon}
						{text}
						<span className="oi oi-chevron-right ml-auto" title="icon name" aria-hidden="true"></span>
					</a>;

				childMenus = this._createMenusIteration(menuItems[item]);
			}
			else {
				navLink =
					<a href="javascript:void(0)" className="text-white" onClick={() => this._menuOnClick(menuItems[item])}>
						{icon}
						{text}
					</a>;
			}

			let li =
				<li key={item} className="leftmenu_css_li">
					{navLink}
					<div className="w-100 hide">
						{childMenus}
					</div>
				</li>;

			lis.push(li);
		}

		return <ul className="list-group">
			{lis}
		</ul>;
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
		let ul = this._createMenusIteration({ menuItems: this.props.topLevelMenus });

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
					{ul}
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

const Contain = connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(MenuPermission)

export default Contain;