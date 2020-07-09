import React from 'react';
import BaseConfig from '../BaseComponent/BaseConfig';
import { ieReduxFetch } from 'Core/IEReduxFetch'

import { Select, Input, InputNumber, Tag } from 'antd';

export default class PageLeafSettingConfig extends BaseConfig {
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
                            onChange={(value) => {
                                this.props.data.pageName = value;
                                this.props.setData(this.props.data)
                                this.setState({});
                            }}
                            value={this.props.data.pageName}
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
                            value={this.props.data.pageSize}
                            onChange={
                                (value) => {
                                    this.props.data.pageSize = value || 0;
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
                            value={this.props.data.searchKey}
                            onChange={
                                (event) => {
                                    this.props.data.searchKey = event.target.value;
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
                            value={this.props.data.top}
                            onChange={
                                (value) => {
                                    this.props.data.top = value || 0;
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
                            onChange={(value) => {
                                this.props.data.orderby = value;
                                this.props.setData(this.props.data)
                                this.setState({});
                            }}
                            value={this.props.data.orderby}
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