import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import Resource from 'Resource/Resource.jsx';
import { ieReduxFetch } from 'Core/IEReduxFetch';
import { ResourceDescribeValueType } from 'ResourceForm/ResourceDescribeValueType'
import CustomizeOperateBtnList from './CustomizeOperateBtnList'

import { Select } from 'antd'
import { EditOutlined } from '@ant-design/icons'

const { Option } = Select;

class PageData extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pageDatas: [],
			resourceNum: 0,
			pageIndex: 1,
			pageSize: 10,
			searchKey: "",
			selectPageName: this.props.match.params.pageName || "",
			isLoad: false,
			queryPages: [],
			managePages: []
		}

		this.deleteResource = this.deleteResource.bind(this);
		this.addResource = this.addResource.bind(this)
		this.updateResource = this.updateResource.bind(this);
		this.freshenResources = this.freshenResources.bind(this);
	}

	componentDidMount() {
		Promise.all([
			ieReduxFetch("/api/PageDataQuery/GetPagesOfUserCanAccessPost", { queryOrManage: false })
				.then(value => {
					this.setState({ queryPages: value.pages });
				}),
			ieReduxFetch("/api/PageDataQuery/GetPagesOfUserCanAccessPost", { queryOrManage: true })
				.then(value => {
					this.setState({ managePages: value.pages });
				})
		]).then((results) => {
			this.setState({ isLoad: true });
		});
	}

	getDescribes() {
		return [
			{ name: "id", isId: true, isAddShow: false, isEditShow: false, isLookupShow: false },
			{ name: "name", text: "文章名称", isName: true, isShowOnList: true },
			{ name: "title", text: "文章标题", isShowOnList: true },
			{ name: "describe", text: "简短描述", isShowOnList: true },
			{
				name: "content", text: "文章内容", isShowOnList: false, valueType: ResourceDescribeValueType.richText,
			},
			{
				name: "pageName", text: "文章类型", isShowOnList: false, isLookupShow: false,
				valueType: ResourceDescribeValueType.select,
				valueTexts: this.state.queryPages.map(item => ({ text: item.displayName, value: item.name })),
				isEditCanEdit: false
			},
			{
				name: "pageNameLookup", text: "文章类型", isShowOnList: true, isAddShow: false, isEditShow: false, isLookupShow: true,
				valueType: ResourceDescribeValueType.select,
				valueTexts: this.state.queryPages.map(item => ({ text: item.displayName, value: item.name })),
				isEditCanEdit: false
			},
			{
				name: "imageList", text: "图片", isShowOnList: false, valueType: ResourceDescribeValueType.textGroup, col: 8
			},
			{
				name: "tagList", text: "标签", isShowOnList: true, valueType: ResourceDescribeValueType.textGroup, col: 4
			},
			{
				name: "creationTime", text: "发表时间", isShowOnList: true, isAddShow: false, isEditShow: false, valueType: ResourceDescribeValueType.dateTime,
			}
		];
	}

	// Resource组件删除资源通知
	deleteResource(resource) {
		let postData = {
			name: resource.name,
			pageName: resource.pageName
		};

		ieReduxFetch("/api/PageDataManage/DeletePageData", postData)
			.then(value => {
				this.setState(value);
				this.getResourceList(this.state.pageIndex, this.state.pageSize, this.state.searchKey);
			});
	}

	// Resource组件添加资源通知
	addResource(resource) {
		this.resourceToPageData(resource);

		let postData = {
			...resource, ...{
				pageName: resource.pageName
			}
		};

		ieReduxFetch("/api/PageDataManage/AddPageData", postData)
			.then(value => {
				this.setState(value);
				this.getResourceList(this.state.pageIndex, this.state.pageSize, this.state.searchKey);
			});
	}

	// Resource组件更新资源通知
	updateResource(resource) {
		this.resourceToPageData(resource);
		let postData = {
			...resource, ...{
				pageName: resource.pageName
			}
		};

		ieReduxFetch("/api/PageDataManage/UpdatePageData", postData)
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
			searchKey: searchKey,
			pageName: this.state.selectPageName
		};

		ieReduxFetch("/api/PageDataQuery/GetPageDatas", postData)
			.then(value => {
				this.setState({
					resourceNum: value.resourceNum,
					pageIndex: value.pageIndex,
					pageSize: pageSize,
					searchKey: value.searchKey,
					pageDatas: value.pageDatas.map(item => {
						this.pageDataToResource(item);

						return item;
					})
				});
			});
	}

	// 将接收的文章数据转为Resource组件可编辑的数据
	pageDataToResource(pageData) {
		let page = this.state.managePages.find(e => e.id == pageData.pageId);
		pageData.pageName = page ? page.name : null;

		let pageLookup = this.state.queryPages.find(e => e.id == pageData.pageId);
		pageData.pageNameLookup = pageLookup ? pageLookup.name : null;

		pageData.tagList = [];
		if (pageData.tags) {
			pageData.tagList = pageData.tags.map(item=>item.name);
		}

		pageData.imageList = [];
		if (pageData.images) {
			pageData.imageList = pageData.images.split('|');
		}
	}

	// 将Resource组件的数据转为文章数据
	resourceToPageData(resource) {
		resource.tags = [];
		if(resource.tagList){
			for(let index = 0; index < resource.tagList.length; index++){
				resource.tags.push({
					name: resource.tagList[index],
					displayName: resource.tagList[index]
				});
			}
		}

		resource.images = "";
		if(resource.imageList){
			for(let index = 0; index < resource.imageList.length; index++){
				if (index == resource.imageList.length - 1) {
					resource.images = resource.images + resource.imageList[index];
				}
				else {
					resource.images = resource.images + resource.imageList[index] + "|";
				}
			}
		}
	}

	render() {
		if (!this.state.isLoad) {
			return (<div></div>);
		}

		let customizeOperateBtns = [(props) => (<CustomizeOperateBtnList {...props} />)];

		let resources;
		if (this.state.selectPageName && this.state.selectPageName.trim() != "") {
			resources = this.state.pageDatas.filter(item => item.pageNameLookup == this.state.selectPageName);
		}
		else {
			resources = this.state.pageDatas;
		}

		return (
			<div className="col-md-12 bg-white pt-3 pb-3">
				<div className="mb-3">
					<span className="font-weight-bold mr-3">文章类型</span>
					<Select value={this.state.selectPageName} style={{ width: 200 }} onChange={(value) => { this.setState({ selectPageName: value }) }}>
						<Option value="">全部</Option>
						{this.state.queryPages.map(item => (<Option value={item.name}>{item.displayName}</Option>))}
					</Select>
				</div>
				<Resource
					title="文章"
					describes={this.getDescribes()}
					resources={resources}	// ++
					pageIndex={this.state.pageIndex}		// ++
					resourceNum={this.state.resourceNum}	// ++
					freshenResources={this.freshenResources}
					deleteResource={this.deleteResource}
					addResource={this.addResource}
					updateResource={this.updateResource}
					customizeOperateBtns={customizeOperateBtns}
					// customizeBottomOperateBtns={customizeBottomOperateBtns}
					hideAdd={this.state.managePages.length == 0}
					hideEdit={true}
					hideDelete={true}
					hideLookup={true}
					width={1200}
				/>
			</div>
		);
	}
}

PageData.propsTypes = {
	pageName: PropTypes.string.isRequired,
}

export default PageData;