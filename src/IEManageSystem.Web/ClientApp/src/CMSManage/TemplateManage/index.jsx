import React from 'react'
import Resource from 'Resource/Resource.jsx';
import TemplateList from 'CMSManage/Component/Components/TemplateList'
import {NavLink} from 'react-router-dom'
import {ZoomInOutlined} from '@ant-design/icons'

// props.resource
function LookupTemplatePages(props) {
	return (
		<NavLink className="ant-btn ant-btn-sm mr-1"
			to={`/ManageHome/CMSManage/TemplatePageManage/${props.resource.name}`}
		>
			<ZoomInOutlined />
			<span>{" 查看模板页面"}</span>
		</NavLink>);
}

export default class TemplateManage extends React.Component {
    constructor(props) {
        super(props);

        this.freshenResources = this.freshenResources.bind(this);
    }

    getDescribes() {
        return [
            { name: "name", text: "代码名称", isId: true, isName: true, isShowOnList: true },
            { name: "displayName", text: "展示名称", isShowOnList: true },
            { name: "describe", text: "描述", isShowOnList: true },
            { name: "company", text: "公司名称", isShowOnList: true }
        ];
    }

    freshenResources(pageIndex, pageSize, searchKey) {
    }

    render() {
        return (<div className="col-md-12 bg-white pt-3 pb-3">
            <Resource
                title="模板管理"
                describes={this.getDescribes()}
                resources={TemplateList}	// ++
                freshenResources={this.freshenResources}
                customizeOperateBtns={[LookupTemplatePages]}
                hideAdd={true}
                hideEdit={true}
                hideDelete={true}
                hidePadding={true}
            />
        </div>);
    }
}