import React from "react";
import Resource from 'Resource/Resource'

export default class ResourceTable extends React.Component{
    constructor(props){
		super(props);

		this.describes=[
			{name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:false},
			{name:"name", text:"资源名称", isName:true, isShowOnList:true, isEditCanEdit:false},
			{name:"displayName", text:"资源显示名称", isShowOnList:true},
			{name:"description", text:"资源描述"},
			{
				name:"enabled", 
				text:"是否启用", 
				isShowOnList:true, 
				valueType:"radio", 
				valueTexts:[{text:"启用", value:true}, {text:"禁用", value:false}],
				col: 6,
			},
        ];
        
        this.resources = [
            { id:1, name:"HolleWorld", displayName:"Holle World", description:"麻雀需丑，五脏俱全", enabled: true },
            { id:2, name:"Explain", displayName:"说明", description:"这是一个测试表格", enabled: true },
            { id:3, name:"First", displayName:"第一篇文章", description:"这是第一篇文章", enabled: true },
            { id:4, name:"Sssssss", displayName:"随笔", description:"不知道写什么", enabled: true }
        ];

        this.submitBackcall = this.submitBackcall.bind(this);
    	this.addResource = this.addResource.bind(this);
    	this.updateResource = this.updateResource.bind(this);
    	this.deleteResource = this.deleteResource.bind(this);
    	this.freshenResources = this.freshenResources.bind(this);
	}
	
	componentDidMount(){
	}

	// 提交回调
	submitBackcall(data)
	{
	}

	// Resource组件添加资源通知
	addResource(resource){
	}

	// Resource组件更新资源通知
	updateResource(resource){
	}

	// Resource组件删除资源通知
	deleteResource(resource){
	}

	// Resource组件刷新资源通知
	freshenResources(pageIndex, pageSize, searchKey){
	}

    // 获取资源列表
	getResourceList(pageIndex, pageSize, searchKey){
	}

    // 获取资源数量
    getResourceNum(searchKey){
    }

	render(){
		return(
			<div className="col-md-12">
				<Resource
				title="资源管理"
                describes={this.describes}
				resources={this.resources}
				pageIndex={1}		// ++
				resourceNum={10}	// ++
				freshenResources={this.freshenResources}
				addResource={this.addResource}
				updateResource={this.updateResource}
				deleteResource={this.deleteResource}
				/>
			</div>
		);
	}
}