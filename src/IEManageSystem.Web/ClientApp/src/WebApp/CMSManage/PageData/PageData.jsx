import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { ieReduxFetch } from 'Core/IEReduxFetch';

import { Select, List, Space, Avatar, Empty, Upload, Button, Input, Modal, Tag, message, Popconfirm } from 'antd'
import { EditOutlined, StarOutlined, LoginOutlined, DeleteOutlined, TagsOutlined, FireOutlined, FieldTimeOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons'

import PageDataModel from 'BaseCMSManage/Models/PageDatas/PageDataModel'
import TagModel from 'BaseCMSManage/Models/PageDatas/TagModel'

import {Theme} from 'ice-common'
import {IETool} from 'ice-common'
import defaultAvatar from 'images/default_avatar.png'

import IEBraftEditor from 'Common/IEBraftEditor'
// import ImgCrop from 'antd-img-crop';

const { Option } = Select;
const { Search, TextArea } = Input;

const ImageList = (props) => {
	let postImages = props.post.imageList;
	let imgList = [...postImages];
	if (imgList.length > 2) {
		imgList = [imgList[0], imgList[1]];
	}

	return (
		<div style={{ width: 350 }}>
			<Upload
				action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
				listType="picture-card"
				fileList={
					imgList.map(item => {
						return {
							uid: '-1',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
							name: 'xx.png',   // 文件名
							status: 'done', // 状态有：uploading done error removed，被 beforeUpload 拦截的文件没有 status 属性
							url: item,
						}
					})
				}
				beforeUpload={(file) => {
					IETool.imageToBase64String(file, (base64) => {
						props.uploadImage(base64, file.name, props.post);
					});

					return false;
				}}
				onChange={({ file: fileData }) => {
					if (fileData.status == "removed") {
						props.deleteImage(fileData.url, props.post);
					}
				}}
			>
				上传 {postImages.length > 2 && `(+${props.post.imageList.length - 2})`}
			</Upload>
		</div>
	);
};

// 文章编辑弹出框
class PostModal extends React.Component {
	state = {
		post: IETool.deepCopy(this.props.post),
		visible: false,
	}

	summit = () => {
		if (!this.state.post.name) {
			message.error('必须填写文章名称');
			return;
		}

		if (!this.state.post.title) {
			message.error('必须填写文章标题');
			return;
		}

		if (!this.state.post.pageName) {
			message.error('必须选择文章类型');
			return;
		}

		this.props.summit(this.state.post)
		this.setState({ visible: false });
	}

	onCancel = () => {
		this.setState({ visible: false });
	}

	onShowBtnClick = () => {
		if (this.state.visible) {
			this.setState({ visible: false });
		}
		else {
			this.setState({ visible: true, post: IETool.deepCopy(this.props.post) });
		}
	}

	render() {
		let ShowButton = this.props.showButton;
		let curPage = this.props.pages.find(e => e.name == this.state.post.pageName) || {};

		return <>
			<ShowButton onClick={this.onShowBtnClick} />
			<Modal
				title={this.props.title}
				visible={this.state.visible}
				onOk={this.summit}
				onCancel={this.onCancel}
				width={1200}
			>
				<div>
					<div className='d-flex mb-3'>
						<div className='col-md-4'>
							<Input
								prefix={<Tag color={Theme.primary} >文章名称</Tag>} placeholder="输入文章名称"
								value={this.state.post.name}
								onChange={e => {
									this.state.post.name = e.target.value;
									this.setState({});
								}}
							/>
						</div>
						<div className='col-md-4'>
							<Input
								prefix={<Tag color={Theme.primary} >文章标题</Tag>} placeholder="输入文章标题"
								value={this.state.post.title}
								onChange={e => {
									this.state.post.title = e.target.value;
									this.setState({});
								}}
							/>
						</div>
						<div className='col-md-4'>
							<Select
								placeholder='文章类型'
								style={{ width: '100%' }}
								value={this.state.post.pageName}
								onChange={(value) => {
									this.state.post.pageName = value;
									this.setState({});
								}}
							>
								{this.props.pages.map(item => (<Option value={item.name}>{item.displayName}</Option>))}
							</Select>
						</div>
					</div>
					<div className='col-md-12 mb-3'>
						<TextArea
							placeholder='文章简短描述'
							value={this.state.post.describe}
							onChange={(e) => {
								this.state.post.describe = e.target.value;
								this.setState({});
							}}
						/>
					</div>
					<div className='col-md-12 mb-3'>
						<IEBraftEditor
							value={this.state.post.content}
							onSave={(value) => {
								this.state.post.content = value;
								this.setState({});
							}}
						/>
					</div>
					<div className='col-md-12 mb-3 d-flex flex-wrap'>
						<div className='w-100 mb-3'>
							<Button type='primary'
								onClick={() => {
									this.state.post.tags.push(new TagModel());
									this.setState({});
								}}
							>添加标签</Button>
						</div>
						{
							this.state.post.tags.map(item => (
								<div className='d-flex mb-3 pr-3 w-50'>
									<div className='mr-1'>
										<Input
											prefix={<Tag color={Theme.primary} >标签名称</Tag>} placeholder="输入标签名称"
											value={item.name}
											onChange={e => {
												item.name = e.target.value;
												this.setState({});
											}}
										/>
									</div>
									<div className='mr-1'>
										<Input
											prefix={<Tag color={Theme.primary} >显示名称</Tag>} placeholder="输入显示名称"
											value={item.displayName}
											onChange={e => {
												item.displayName = e.target.value;
												this.setState({});
											}}
										/>
									</div>
									<Button icon={<DeleteOutlined />}
										danger
										type='primary'
										onClick={() => {
											let index = this.state.post.tags.findIndex(e => e == item);
											this.state.post.tags.splice(index, 1);
											this.setState({});
										}}
									></Button>
								</div>
							))
						}
					</div>
					{
						curPage.field1Name &&
						<div className='col-md-12 mb-3'>
							<Input
								prefix={<Tag color={Theme.primary} >{curPage.field1Name}</Tag>} placeholder="输入自定义字段"
								value={this.state.post.field1}
								onChange={e => {
									this.state.post.field1 = e.target.value;
									this.setState({});
								}}
							/>
						</div>
					}
					{
						curPage.field2Name &&
						<div className='col-md-12 mb-3'>
							<Input
								prefix={<Tag color={Theme.primary} >{curPage.field2Name}</Tag>} placeholder="输入自定义字段"
								value={this.state.post.field2}
								onChange={e => {
									this.state.post.field2 = e.target.value;
									this.setState({});
								}}
							/>
						</div>
					}
					{
						curPage.field3Name &&
						<div className='col-md-12 mb-3'>
							<Input
								prefix={<Tag color={Theme.primary} >{curPage.field3Name}</Tag>} placeholder="输入自定义字段"
								value={this.state.post.field3}
								onChange={e => {
									this.state.post.field3 = e.target.value;
									this.setState({});
								}}
							/>
						</div>
					}
					{
						curPage.field4Name &&
						<div className='col-md-12 mb-3'>
							<Input
								prefix={<Tag color={Theme.primary} >{curPage.field4Name}</Tag>} placeholder="输入自定义字段"
								value={this.state.post.field4}
								onChange={e => {
									this.state.post.field4 = e.target.value;
									this.setState({});
								}}
							/>
						</div>
					}
					{
						curPage.field5Name &&
						<div className='col-md-12 mb-3'>
							<Input
								prefix={<Tag color={Theme.primary} >{curPage.field5Name}</Tag>} placeholder="输入自定义字段"
								value={this.state.post.field5}
								onChange={e => {
									this.state.post.field5 = e.target.value;
									this.setState({});
								}}
							/>
						</div>
					}

				</div>
			</Modal>
		</>
	}
}

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
			// 能够查看文章的页面
			queryPages: [],
			// 能够管理文章的页面
			managePages: [],
			// 能够访问的页面（就是上面这两个页面的和）
			visitPages: []
		}
	}

	componentDidMount() {
		this.getPostList();
		this.getCanManagePages();
		this.getCanQueryPages();
	}

	getPostList() {
		let postData = {
			pageIndex: this.state.pageIndex,
			pageSize: this.state.pageSize,
			searchKey: this.state.searchKey,
			pageName: this.state.selectPageName
		};

		ieReduxFetch("/api/PageDataQuery/GetPageDatas", postData)
			.then(value => {
				let posts = value.pageDatas.map(item => {
					item.__proto__ = PageDataModel.prototype;
					item.tags.forEach(tag => {
						tag.__proto__ = TagModel.prototype;
					});

					return item;
				})

				this.setState({
					resourceNum: value.resourceNum,
					pageIndex: value.pageIndex,
					searchKey: value.searchKey,
					pageDatas: posts
				});
			});
	}

	getCanQueryPages() {
		ieReduxFetch("/api/PageDataQuery/GetPagesOfUserCanAccessPost", { queryOrManage: false })
			.then(value => {
				this.setState({ queryPages: value.pages }, () => {
					this.mergeManagePagesAndQueryPages();
				});
			});
	}

	getCanManagePages() {
		ieReduxFetch("/api/PageDataQuery/GetPagesOfUserCanAccessPost", { queryOrManage: true })
			.then(value => {
				this.setState({ managePages: value.pages }, () => {
					this.mergeManagePagesAndQueryPages();
				});
			})
	}

	mergeManagePagesAndQueryPages() {
		let visitPages = [...this.state.managePages];

		this.state.queryPages.forEach(item => {
			if (visitPages.some(e => e.id == item.id)) {
				return;
			}

			visitPages.push(item);
		});

		this.setState({ visitPages: visitPages });
	}

	// 删除文章
	deletePost(post) {
		let page = this.state.managePages.find(e => e.name == post.pageName)

		let postData = {
			name: post.name,
			pageName: page.name
		};

		return ieReduxFetch("/api/PageDataManage/DeletePageData", postData)
			.then(value => {
				this.getPostList();
			});
	}

	// 添加文章
	addPost(post) {
		let page = this.state.managePages.find(e => e.name == post.pageName)

		let postData = {
			...post, ...{
				pageName: page.name
			}
		};

		return ieReduxFetch("/api/PageDataManage/AddPageData", postData)
			.then(value => {
				this.getPostList();
			});
	}

	// 更新文章
	updatePost(post) {
		let page = this.state.managePages.find(e => e.name == post.pageName)

		let postData = {
			...post, ...{
				pageName: page.name
			}
		};


		return ieReduxFetch("/api/PageDataManage/UpdatePageData", postData)
			.then(value => {
				this.getPostList();
			});
	}

	// 上传文件
	uploadImage = (base64, fileName, post) => {
		let picWebPath = `/Posts/${post.id}/${fileName}`;
		let postData = {
			picWebPath: picWebPath,
			base64Image: base64
		};

		return ieReduxFetch("/api/PictureManage/SavePicture", postData)
			.then(value => {
				post.addImage(`/Picture${picWebPath}`);
				return this.updatePost(post);
			})
			.then(() => {
				return this.getPostList();
			});
	}

	// 删除文件
	deleteImage = (imagePath, post) => {
		let postData = {
			picWebPath: imagePath.replace('/Picture', ""),
		};

		return ieReduxFetch("/api/PictureManage/DeletePicture", postData)
			.then(value => {
				post.deleteImage(imagePath);
				return this.updatePost(post);
			})
			.then(() => {
				return this.getPostList();
			});
	}

	createListItem(post) {
		let isCanEdit = this.state.managePages.some(e => e.name == post.pageName);
		let editBtns = [];
		if (isCanEdit) {
			editBtns = [
				<PostModal
					title="编辑文章"
					post={post}
					pages={this.state.managePages}
					summit={(post) => this.updatePost(post)}
					showButton={(props) => (
						<Button size='small' icon={<EditOutlined />} type='primary' onClick={props.onClick} >基本编辑</Button>
					)}
				/>,
				<Button size='small' icon={<LoginOutlined />} type='primary'
					onClick={() => {
						let page = this.state.visitPages.find(e => e.name == post.pageName);
						this.props.history.push(`/ManageHome/CMSManage/PostEdit/${page.name}/${post.name}`);
					}}
				></Button>,
				<Popconfirm
					title="删除文章？"
					onConfirm={() => {
						this.deletePost(post);
					}}
					okText="确定"
					cancelText="取消"
				>
					<Button size='small' danger icon={<DeleteOutlined />} type='primary' ></Button>
				</Popconfirm>,
			];
		}

		return <List.Item
			key={post.id}
			actions={[
				...editBtns,
				<Button size='small' icon={<EyeOutlined />} type='primary'
					onClick={() => {
						let page = this.state.visitPages.find(e => e.name == post.pageName);
						this.props.history.push(`/Page/${page.name}/${post.name}`);
					}}
				></Button>,
				<Space><FireOutlined />{post.click}</Space>,
				<Space><StarOutlined />{post.score}</Space>,
				<Space><TagsOutlined />{post.tags.map(e => e.displayName).join('|')}</Space>,
				<Space><FieldTimeOutlined />{post.lastUpdater && new Date(post.lastUpdater.time).toLocaleTimeString()}</Space>,

			]}
			extra={
				<ImageList
					post={post}
					uploadImage={this.uploadImage}
					deleteImage={this.deleteImage}
				/>
			}
		>
			<List.Item.Meta
				avatar={<div className='d-flex flex-column align-items-center' style={{ width: 100 }}>
					<Avatar size='large' src={post.creator ? (post.creator.headSculpture || defaultAvatar) : defaultAvatar} />
					<span className='mt-3'>{post.creator && post.creator.name}</span>
				</div>}
				title={<Link to={`/Page/${post.pageName}/${post.name}`}>{post.title}</Link>}
				description={post.describe}
			/>
		</List.Item>
	}

	render() {
		return (
			<div className="col-md-12 bg-white pt-3 pb-3">
				<div className="mb-3 d-flex justify-content-between">
					<div>
						<span className="mr-3">文章类型</span>
						<Select
							style={{ width: 200 }}
							value={this.state.selectPageName}
							onChange={(value) => { this.setState({ selectPageName: value }, () => this.getPostList()) }}
						>
							<Option value="">全部</Option>
							{this.state.visitPages.map(item => (<Option value={item.name}>{item.displayName}</Option>))}
						</Select>
					</div>
					<div className=''>
						<Search style={{ width: 250 }} placeholder="input search text" onSearch={value => this.setState({ searchKey: value }, () => this.getPostList())} enterButton />
						<PostModal
							title="添加文章"
							post={PageDataModel.CreatePageDataModel()}
							pages={this.state.managePages}
							summit={(post) => this.addPost(post)}
							showButton={(props) => (
								<Button className='ml-3' icon={<PlusCircleOutlined />} type='primary'
									onClick={props.onClick}
								>添加文章</Button>
							)}
						/>
					</div>
				</div>
				<List
					itemLayout="vertical"
					size="large"
					pagination={{
						onChange: pageIndex => {
							this.setState({ pageIndex: pageIndex }, () => this.getPostList());
						},
						defaultCurrent: this.state.pageIndex,
						defaultPageSize: this.state.pageSize,
						total: this.state.resourceNum,
					}}
					dataSource={this.state.pageDatas}
					renderItem={post => this.createListItem(post)}
				/>
			</div>
		);
	}
}

PageData.propsTypes = {
	pageName: PropTypes.string.isRequired,
}

export default withRouter(PageData);