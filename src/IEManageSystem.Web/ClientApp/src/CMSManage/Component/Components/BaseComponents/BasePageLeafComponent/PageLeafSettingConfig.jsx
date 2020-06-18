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
        ieReduxFetch("/api/PageQuery/GetPages", {})
            .then(value => {
                this.setState({ pages: value.pages });
            })
    }

    render() {
        let pageList = this.state.pages.map(item => <Select.Option key={item.id} value={item.name}>{item.displayName}</Select.Option>);

        // 如果当前没有选择页面且有页面，则默认选择第一个页面
        if (!this.props.data &&
            this.state.pages.length > 0) {
            this.props.data.pageName = this.state.pages[0].name;
            this.props.setData(this.props.data)
        }

        return (
            <div className="w-100">
                <div className="col-md-12 mb-3">
                    <label htmlFor="sel1">指定页面:</label>
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
                            {pageList}
                        </Select>
                    </div>
                </div>
                <div className="col-md-12 mb-3">
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
                <div className="col-md-12 mb-3">
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
                <div className="col-md-12 mb-3">
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
            </div>
        );
    }
}