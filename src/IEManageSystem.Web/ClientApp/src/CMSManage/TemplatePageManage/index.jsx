import React from 'react'
import Resource from 'Resource/Resource.jsx';
import TemplateList from 'CMSManage/Component/Components/TemplateList'
import { NavLink } from 'react-router-dom'

import { Button, Modal } from 'antd'
import { ZoomInOutlined, FormOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { ResourceDescribeValueType } from 'ResourceForm/ResourceDescribeValueType'
import { ieReduxFetch } from 'Core/IEReduxFetch';

const pageType = {
    StaticPage: "StaticPage",
    ContentPage: "ContentPage"
}

export default class TemplatePageManage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // 已注册的页面
            registerPages: []
        }

        this.freshenResources = this.freshenResources.bind(this);
        this.template = TemplateList.find(e => e.name == props.match.params.templateName);
        this.pages = this.template.templatePages.map(item => item.page);

        this.getPagesList = this.getPagesList.bind(this);
        this.getPagesList();
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

    freshenResources(pageIndex, pageSize, searchKey) {
    }

    // 获取资源列表
    getPagesList() {
        let postData = {
            pageIndex: 1,
            pageSize: 10000,
            searchKey: ""
        };

        ieReduxFetch("/api/PageQuery/GetPages", postData)
            .then(value => {
                this.setState({ registerPages: value.pages });
            });
    }

    registerPage(pageName){
        let templatePage = this.template.templatePages.find(e=>e.page.name == pageName);

        let postData = {
            name: pageName,
            pageComponents: templatePage.page.pageComponents,
            defaultComponentDatas: templatePage.defaultComponentDatas
        }

        ieReduxFetch("/api/PageManage/UpdatePageComponent", postData)
        .then(value => {
            this.getPagesList();
        });
    }

    render() {
        let RegisterTemplatePage = (props) => (
            <Button
                size="small"
                icon={<FormOutlined />}
                type="primary"
                onClick={() => {
                    if(this.state.registerPages.some(item => item.name == props.resource.name)){
                        Modal.confirm({
                            title: `注册 ${props.resource.name}`,
                            icon: <ExclamationCircleOutlined />,
                            content: "该页面已存在，如果重新注册将导致旧的组件数据丢失，是否重新注册",
                            okText: '注册',
                            cancelText: '取消',
                            onOk: ()=>{
                                this.registerPage(props.resource.name);
                            }
                        })
                    }
                    else{
                        this.registerPage(props.resource.name);
                    }
                }}
            >
                <span>{this.state.registerPages.some(item => item.name == props.resource.name) ? " 重新注册" : " 注册页面"}</span>
            </Button>);

        let LookupTemplatePage = (props) => {
            return (
                <NavLink className="ant-btn ant-btn-sm mr-1"
                    to={`/ManageHome/CMSManage/TemplatePageShow/${this.template.name}/${props.resource.name}`}
                >
                    <ZoomInOutlined />
                    <span>{" 查看页面"}</span>
                </NavLink>);
        }

        return (<div className="col-md-12 bg-white pt-3 pb-3">
            <Resource
                title="模板页面管理"
                describes={this.getDescribes()}
                resources={this.pages}	// ++
                freshenResources={this.freshenResources}
                customizeOperateBtns={[LookupTemplatePage, RegisterTemplatePage]}
                hideAdd={true}
                hideEdit={true}
                hideDelete={true}
                hidePadding={true}
            />
        </div>);
    }
}