import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import Resource from 'Resource/Resource.jsx';
import { ieReduxFetch } from 'Core/IEReduxFetch';

class PageData extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pageDatas: [],
			resourceNum: 0,
			pageIndex: 1,
			pageSize: 10,
			searchKey: ""
		}

		this.deleteResource = this.deleteResource.bind(this);
		this.addResource = this.addResource.bind(this)
		this.updateResource = this.updateResource.bind(this);
		this.freshenResources = this.freshenResources.bind(this);
	}

	componentDidMount() {
	}

	getDescribes() {
		return [
			{ name: "id", isId: true, isAddShow: false, isEditShow: false, isLookupShow: false },
			{ name: "name", text: "文章名称", isName: true, isShowOnList: true },
			{ name: "title", text: "标题", isShowOnList: true }
		];
	}

	// Resource组件删除资源通知
	deleteResource(resource) {
		let postData = {
			name: resource.name,
			pageName: this.props.match.params.pageName
		};

		ieReduxFetch("/api/PageManage/DeletePageData", postData)
			.then(value => {
				this.setState(value);
				this.getResourceList(this.state.pageIndex, this.state.pageSize, this.state.searchKey);
			});
	}

	// Resource组件添加资源通知
	addResource(resource) {
		let postData = {
			...resource, ...{
				pageName: this.props.match.params.pageName
			}
		};

		ieReduxFetch("/api/PageManage/AddPageData", postData)
			.then(value => {
				this.setState(value);
				this.getResourceList(this.state.pageIndex, this.state.pageSize, this.state.searchKey);
			});
	}

	// Resource组件更新资源通知
	updateResource(resource) {
		let postData = {
			...resource, ...{
				pageName: this.props.match.params.pageName
			}
		};

		ieReduxFetch("/api/PageManage/UpdatePageData", postData)
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
			pageName: this.props.match.params.pageName
		};

		ieReduxFetch("/api/PageQuery/GetPageDatas", postData)
			.then(value => {
				this.setState(value);
			});
	}

	render() {
		let customizeOperateBtns = [];
		customizeOperateBtns.push((props) => {
			return (
				<NavLink className="btn btn-outline-secondary"
					to={`/ManageHome/CMSManage/PostEdit/${this.props.match.params.pageName}/${props.resource.name}`}
				>
					<span className="oi oi-pencil" title="icon name" aria-hidden="true"></span>{" 编辑文章"}
				</NavLink>);
		});
		customizeOperateBtns.push((props) => {
			return (
				<NavLink className="btn btn-outline-secondary"
					to={`/ManageHome/CMSManage/PostEdit/${this.props.match.params.pageName}/${props.resource.name}`}
				>
					<span className="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>{" 浏览"}
				</NavLink>);
		});

		let customizeBottomOperateBtns = [];

		return (
			<div className="col-md-12">
				<Resource
					title="文章管理"
					describes={this.getDescribes()}
					resources={this.state.pageDatas}	// ++
					pageIndex={this.state.pageIndex}		// ++
					resourceNum={this.state.resourceNum}	// ++
					freshenResources={this.freshenResources}
					deleteResource={this.deleteResource}
					addResource={this.addResource}
					updateResource={this.updateResource}
					customizeOperateBtns={customizeOperateBtns}
					customizeBottomOperateBtns={customizeBottomOperateBtns}
				/>
			</div>
		);
	}
}

PageData.propsTypes = {
	// pageName: PropTypes.number.isRequired,
}

export default PageData;