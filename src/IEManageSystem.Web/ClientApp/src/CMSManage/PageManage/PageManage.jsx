import React from 'react'
import { NavLink } from 'react-router-dom';
import Resource from 'Resource/Resource.jsx';
import { ResourceDescribeValueType } from 'ResourceForm/ResourceDescribeValueType'
import { ieReduxFetch } from 'Core/IEReduxFetch';

import { EditOutlined } from '@ant-design/icons'

const pageType = {
	StaticPage: "StaticPage",
	ContentPage: "ContentPage"
}

// props.resource
function EditComponent(props) {
	return (
		<NavLink className="ant-btn ant-btn-sm mr-1"
			to={`/ManageHome/CMSManage/PageEdit/${props.resource.name}`}
		>
			<EditOutlined />
			<span>{" 编辑页面"}</span>
		</NavLink>);
}

function EditPageData(props) {
	let data = props.resource.pageType == pageType.ContentPage ?
		{
			url: `/ManageHome/CMSManage/PageData/${props.resource.name}`,
			text: " 管理文章"
		} :
		{
			url: `/ManageHome/CMSManage/PostEdit/${props.resource.name}`,
			text: " 编辑文章"
		}

	return (
		<NavLink className="ant-btn ant-btn-sm"
			to={`${data.url}`}
		>
			<EditOutlined />
			<span>{` ${data.text}`}</span>
		</NavLink>);
}

class PageManage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pages: [],
			resourceNum: 0,
			pageIndex: 1,
			pageSize: 10,
			searchKey: ""
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
			{ name: "name", text: "页面名称", isName: true, isShowOnList: true },
			{ name: "displayName", text: "显示名称", isShowOnList: true },
			{ name: "description", text: "页面描述", isShowOnList: true },
			{
				name: "pageType", text: "页面类型", isShowOnList: true,
				valueType: ResourceDescribeValueType.radio,
				valueTexts: [{ value: pageType.StaticPage, text: "单篇页面" }, { value: pageType.ContentPage, text: "文章页面" }],
				isEditCanEdit: false
			}
		];
	}

	// Resource组件删除资源通知
	deleteResource(resource) {
		let postData = {
			name: resource.name
		};

		ieReduxFetch("/api/PageManage/DeletePage", postData)
			.then(value => {
				this.setState(value);
				this.getResourceList(this.state.pageIndex, this.state.pageSize, this.state.searchKey);
			});
	}

	// Resource组件添加资源通知
	addResource(resource) {
		let url;
		if(!resource.pageType){
			return;
		}

		if (resource.pageType == pageType.ContentPage) {
			url = "/api/PageManage/AddContentPage";
		}
		else if (resource.pageType == pageType.StaticPage) {
			url = "/api/PageManage/AddStaticPage";
		}

		let postData = resource;

		ieReduxFetch(url, postData)
			.then(value => {
				this.setState(value);
				this.getResourceList(this.state.pageIndex, this.state.pageSize, this.state.searchKey);
			});
	}

	// Resource组件更新资源通知
	updateResource(resource) {
		let postData = resource;

		ieReduxFetch("/api/PageManage/UpdatePage", postData)
			.then(value => {
				this.setState(value);
				this.getResourceList(this.state.pageIndex, this.state.pageSize, this.state.searchKey);
			});
	}

	// Resource组件刷新资源通知
	freshenResources(pageIndex, pageSize, searchKey) {
		this.getResourceList(pageIndex, pageSize, searchKey);
		this.setState({ pageIndex, pageSize, searchKey });
	}

	// 获取资源列表
	getResourceList(pageIndex, pageSize, searchKey) {
		let postData = {
			pageIndex: pageIndex,
			pageSize: pageSize,
			searchKey: searchKey
		};

		ieReduxFetch("/api/PageQuery/GetPages", postData)
			.then(value => {
				this.setState(value);
			});
	}

	render() {
		let customizeOperateBtns = [];
		customizeOperateBtns.push(EditComponent);
		customizeOperateBtns.push(EditPageData);

		return (
			<div className="col-md-12 bg-white pt-3 pb-3">
				<Resource
					title="页面管理"
					describes={this.getDescribes()}
					resources={this.state.pages}	// ++
					pageIndex={this.state.pageIndex}		// ++
					resourceNum={this.state.resourceNum}	// ++
					freshenResources={this.freshenResources}
					deleteResource={this.deleteResource}
					addResource={this.addResource}
					updateResource={this.updateResource}
					customizeOperateBtns={customizeOperateBtns}
				/>
			</div>
		);
	}
}

export default PageManage;