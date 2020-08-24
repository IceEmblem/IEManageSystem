import React from 'react';
import ReactDOM from 'react-dom';
import Resource from 'Common/Resource/Resource.jsx';
import Preview from 'Common/Preview/Preview.jsx';
import Tab from 'Common/Tab/Tab.jsx';

import "./ResourceChildList.css";

export default class ResourceChildList extends React.Component {
    // props.freshenResources(previewResource, tabValue)
    // props.previewTitle
    // props.previewResourcesTextName
    // props.tabs [{ value: "", text: "" }]
    // props.previewResources   ++
    // props.resourceTitle
    // props.describes
    // props.resources     ++
    // props.addResource()
    // props.updateResource()
    // props.deleteResource()
    // props.hideAdd = false
    // props.hideEdit = false
    // props.hideDelete = false
    // props.hidePadding = false
    constructor(props) {
        super(props);

        this.permissions = [];

        this.state = {
            previewResource: null,	// 当前选择的预览资源
            tabSelectIndex: 0
        }

        this.tabSelectIndex = 0;
    }

    // 刷新资源组件数据
    freshenResources() {
        if(this.state.previewResource == null){
            return;
        }
        this.props.freshenResources(this.state.previewResource, this.props.tabs[this.state.tabSelectIndex].value);
    }

    render() {
        return (
            <div className="w-100 h-100">
                <div className="left-preview float-left h-100 bg-white">
                    <Preview
                        title={this.props.previewTitle}
                        previewResources={this.props.previewResources}
                        textName={this.props.previewResourcesTextName}
                        previewOnClick={(previewResource) => this.setState({ previewResource: previewResource }, () => this.freshenResources())}
                        operationName="查看"
                    />
                </div>
                <div className="right-resource float-right h-100 bg-white">
                    <Tab tabs={this.props.tabs}
                        nameField="text"
                        selectIndex={this.state.tabSelectIndex}
                        selectOnclick={(tab, index) => {
                            this.setState({ tabSelectIndex: index }, () => this.freshenResources());
                        }}
                    >
                        <Resource
                            title={this.props.resourceTitle}
                            describes={this.props.describes}
                            resources={this.props.resources}
                            freshenResources={
                                (pageIndex, pageSize, searchKey) => this.freshenResources()
                            }
                            addResource={
                                (resource) => this.props.addResource(this.state.previewResource, resource, this.props.tabs[this.state.tabSelectIndex].value)
                            }
                            updateResource={
                                (resource) => this.props.updateResource(this.state.previewResource, resource, this.props.tabs[this.state.tabSelectIndex].value)
                            }
                            deleteResource={
                                (resource) => this.props.deleteResource(this.state.previewResource, resource, this.props.tabs[this.state.tabSelectIndex].value)
                            }
                            hideAdd={this.props.hideAdd}
                            hideEdit={this.props.hideEdit}
                            hideDelete={this.props.hideDelete}
                            hidePadding={this.props.hidePadding} />
                    </Tab>
                </div>
            </div>
        );
    }
}