import React from 'react';
import { ieReduxFetch } from 'Core/IEReduxFetch'
import {IocContainer} from 'ice-common';
import {IPageLeafSettingConfig} from 'BaseCMSManage/Components/BaseComponents/BasePageLeafComponent/PageLeafComponentSettingConfig'

import { Select, Input, InputNumber, Tag } from 'antd';

class PageLeafSettingConfig extends IPageLeafSettingConfig {
    constructor(props) {
        super(props)

        this.state = {
            pages: []
        }
    }

    componentDidMount() {
        ieReduxFetch("/api/PageQuery/GetPages", {
            pageIndex: 1,
            pageSize: 9999,
            pageType: "ContentPage"
        }).then(value => {
            this.setState({ pages: value.pages });
        })
    }

    render() {
        let pageList = this.state.pages.map(item => <Select.Option key={item.id} value={item.name}>{item.displayName}</Select.Option>);

        return (
            <div className="w-100 d-flex flex-wrap">
                <div className="col-md-6 mb-3">
                    <label htmlFor="sel1">指定文章类型:</label>
                    <div className="input-group mb-3">
                        <Select
                            showSearch
                            value={this.props.data.pageLeafSetting.pageName}
                            onChange={(value) => {
                                this.props.data.pageLeafSetting.pageName = value;
                                this.props.setData(this.props.data)
                                this.setState({});
                            }}
                            className="w-100"
                            dropdownStyle={{ zIndex: 10000 }}
                        >
                            <Select.Option key={0} value="">全部</Select.Option>
                            {pageList}
                        </Select>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <label>页大小</label>
                    <div className="input-group mb-3">
                        <InputNumber
                            placeholder="页大小"
                            value={this.props.data.pageLeafSetting.pageSize}
                            onChange={
                                (value) => {
                                    this.props.data.pageLeafSetting.pageSize = value || 0;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Tag color="#55acee">页大小</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 float-left">
                    <label>搜索关键字：</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="搜索关键字"
                            value={this.props.data.pageLeafSetting.searchKey}
                            onChange={
                                (event) => {
                                    this.props.data.pageLeafSetting.searchKey = event.target.value;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Tag color="#55acee">搜索关键字</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <label>过滤数</label>
                    <div className="input-group mb-3">
                        <InputNumber
                            placeholder="过滤数"
                            value={this.props.data.pageLeafSetting.top}
                            onChange={
                                (value) => {
                                    this.props.data.pageLeafSetting.top = value || 0;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Tag color="#55acee">过滤数</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="sel1">文章排序:</label>
                    <div className="input-group mb-3">
                        <Select
                            showSearch
                            value={this.props.data.pageLeafSetting.orderby}
                            onChange={(value) => {
                                this.props.data.pageLeafSetting.orderby = value;
                                this.props.setData(this.props.data)
                            }}
                            className="w-100"
                            dropdownStyle={{ zIndex: 10000 }}
                        >
                            <Select.Option key={0} value="Date">发表时间</Select.Option>
                            <Select.Option key={1} value="Click">点击量</Select.Option>
                            <Select.Option key={2} value="Score">评分</Select.Option>
                        </Select>
                    </div>
                </div>
            </div>
        );
    }
}

IocContainer.registerSingleIntances(IPageLeafSettingConfig, PageLeafSettingConfig);