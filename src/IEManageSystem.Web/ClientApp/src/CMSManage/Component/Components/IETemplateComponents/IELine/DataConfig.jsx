import React from 'react'
import PropTypes from 'prop-types'
import BaseConfig from 'CMSManage/Component/Components/BaseComponents/BaseComponent/BaseConfig'
import Data from './Data'
import Setting from './Setting'

import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { Input, Tag, Button, Select, InputNumber, Typography } from 'antd';

const { Title } = Typography;
const { Option } = Select;

export default class DataConfig extends BaseConfig {

    state = {
        x: "",
        y: "",
        line: "",
    }

    getPageComponentSetting() {
        return this.props.pageComponentSettings.find(e => e.name == "DefaultSetting");
    }

    render() {
        let data = new Data(this.props.data);
        let setting = new Setting(this.getPageComponentSetting());
        let lines = setting.getLines();
        let datas = data.getDatas();

        let items = lines.map((lineName, lineIndex) => {
            let curLineDatas = datas.filter(e => e.line == lineName);
            return <div className="mb-5 bg-light" key={lineName}>
                <Title level={4}>{lineName}</Title>
                {
                    curLineDatas.map((singleData, index) => (
                        <div key={index} className="d-flex mb-3">
                            <Input
                                placeholder="输入 x 轴的值"
                                className="ml-1 mr-1"
                                value={singleData.x}
                                onChange={(e) => {
                                    singleData.x = e.currentTarget.value;
                                    this.props.setData(data.componentData);
                                }}
                                prefix={<Tag color="#55acee">输入 x 轴的值</Tag>}
                            />
                            <InputNumber
                                style={{ minWidth: "250px" }}
                                placeholder="输入 y 轴的值"
                                className="ml-1 mr-1"
                                value={singleData.y}
                                onChange={(value) => {
                                    singleData.y = value;
                                    this.props.setData(data.componentData);
                                }}
                                prefix={<Tag color="#55acee">输入 y 轴的值</Tag>}
                            />
                            <Select style={{ width: 400 }}
                                value={singleData.line}
                                dropdownStyle={{ zIndex: 9999 }}
                                onChange={(value) => {
                                    singleData.line = value;
                                    this.props.setData(data.componentData);
                                }}>
                                {lines.map(line => (
                                    <Option value={line}>{line}</Option>
                                ))}
                            </Select>
                            <Button icon={<DeleteOutlined />} className="ml-1 mr-1" type="primary" danger
                                onClick={() => {
                                    data.deleteSingleData(singleData.sortIndex);
                                    this.setState({});
                                }}
                            >删除</Button>
                        </div>
                    ))
                }
            </div>
        })

        return (<div>
            <div className="d-flex mb-3">
                <Input
                    placeholder="输入 x 轴的值"
                    className="ml-1 mr-1"
                    value={this.state.x}
                    onChange={(e) => {
                        this.setState({ x: e.target.value });
                    }}
                    prefix={<Tag color="#55acee">输入 x 轴的值</Tag>}
                />
                <InputNumber
                    style={{ minWidth: "250px" }}
                    placeholder="输入 y 轴的值"
                    className="ml-1 mr-1"
                    value={this.state.y}
                    onChange={(value) => {
                        this.setState({ y: value });
                    }}
                    prefix={<Tag color="#55acee">输入 y 轴的值</Tag>}
                />
                <Select 
                    className="ml-1 mr-1"
                    style={{ width: 400 }}
                    value={this.state.line}
                    dropdownStyle={{ zIndex: 9999 }}
                    onChange={(value) => {
                        this.setState({ line: value });
                    }}>
                    {lines.map(line => (
                        <Option value={line}>{line}</Option>
                    ))}
                </Select>
                <Button
                    className="ml-1 mr-1"
                    disabled={!this.state.line || this.state.line == ""}
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={() => {
                        data.createSingleData(this.state.x, this.state.y, this.state.line);
                        this.setState({});
                    }}
                >添加数据</Button>
            </div>
            {items}
        </div>)
    }
}

DataConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}