import React from 'react'
import PropTypes from 'prop-types'
import Data from 'IETemplateComponents/IELine/Data'
import Setting from 'IETemplateComponents/IELine/Setting'
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { Input, Tag, Button, Select, InputNumber, Typography } from 'antd';

const { Title } = Typography;
const { Option } = Select;

class ListItem extends React.Component {
    render() {
        return <div key={this.props.singleData.sortIndex} className="d-flex mb-3">
            <Input
                placeholder="输入 x 轴的值"
                className="ml-1 mr-1"
                value={this.props.singleData.x}
                onChange={(e) => {
                    this.props.singleData.x = e.currentTarget.value;
                    this.setState({});
                }}
                prefix={<Tag color="#55acee">输入 x 轴的值</Tag>}
            />
            <InputNumber
                style={{ minWidth: "250px" }}
                placeholder="输入 y 轴的值"
                className="ml-1 mr-1"
                value={this.props.singleData.y}
                onChange={(value) => {
                    this.props.singleData.y = value;
                    this.setState({});
                }}
                prefix={<Tag color="#55acee">输入 y 轴的值</Tag>}
            />
            <Select style={{ width: 400 }}
                value={this.props.singleData.line}
                dropdownStyle={{ zIndex: 9999 }}
                onChange={(value) => {
                    this.props.singleData.line = value;
                    this.setState({});
                }}>
                {
                    this.props.lines.map(line => (
                        <Option value={line}>{line}</Option>
                    ))
                }
            </Select>
            <Button icon={<DeleteOutlined />} className="ml-1 mr-1" type="primary" danger
                onClick={() => {
                    this.props.deleteSingleData()
                }}
            >删除</Button>
        </div>
    }
}

class GroupItem extends React.Component {
    render() {
        return (
            <div className="mb-5 bg-light" key={this.props.line}>
                <Title level={4}>{this.props.line}</Title>
                {
                    this.props.lineDatas.map((singleData) => (
                        <ListItem
                            singleData={singleData}
                            lines={this.props.lines}
                            deleteSingleData={() => { this.props.deleteSingleData(singleData) }}
                        />
                    ))
                }
            </div>
        );
    }
}

class DataConfig extends React.Component {

    state = {
        x: "",
        y: "",
        line: "",
    }

    constructor(props) {
        super(props);
    }

    getPageComponentSetting() {
        return this.props.pageComponentSettings.find(e => e.name == "DefaultSetting");
    }

    render() {
        let data = new Data(this.props.data);
        let setting = new Setting(this.getPageComponentSetting());
        let lines = setting.getLines();
        let datas = data.getDatas();

        let items = lines.map((lineName) => {
            let curLineDatas = datas.filter(e => e.line == lineName);
            return <GroupItem
                line={lineName}
                lines={lines}
                lineDatas={curLineDatas}
                deleteSingleData={(singleData) => { 
                    data.deleteSingleData(singleData.sortIndex); 
                    this.setState({});
                }}
            />
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

export default DataConfig;
