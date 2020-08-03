import React from 'react'
import PropTypes from 'prop-types'
import {BaseConfig} from 'CMSManage/Component/Components/BaseComponents/BaseComponent'
import IEButtonSetting from './IEButtonSetting'

import { Input, Tag, Radio } from 'antd';

export default class IEButtonSettingConfig extends BaseConfig {
    buttonSetting = null;

    constructor(props) {
        super(props);

        this.buttonSetting = new IEButtonSetting(props.data);
    }

    render() {
        this.buttonSetting.setSetting(this.props.data);

        return (<div>
            <Input
                className="mb-3"
                value={this.buttonSetting.text}
                onChange={(e) => {
                    this.buttonSetting.text = e.currentTarget.value;
                    this.props.setData(this.buttonSetting.setting);
                }}
                suffix={<Tag color="#55acee">按钮文本</Tag>}
            />
            <Input
                className="mb-3"
                value={this.buttonSetting.url}
                onChange={(e) => {
                    this.buttonSetting.url = e.currentTarget.value;
                    this.props.setData(this.buttonSetting.setting);
                }}
                suffix={<Tag color="#55acee">链接 Url</Tag>}
            />
            <div className="mb-3">
                <Tag color="#55acee">按钮类型</Tag>
                <Radio.Group
                    value={this.buttonSetting.btnType}
                    onChange={(e) => {
                        this.buttonSetting.btnType = e.target.value;
                        this.props.setData(this.buttonSetting.setting);
                    }}
                >
                    <Radio value="primary">主按钮</Radio>
                    <Radio value="default">默认按钮</Radio>
                    <Radio value="dashed">dashed</Radio>
                    <Radio value="ghost">ghost</Radio>
                    <Radio value="link">link</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">按钮大小</Tag>
                <Radio.Group
                    value={this.buttonSetting.size}
                    onChange={(e) => {
                        this.buttonSetting.size = e.target.value;
                        this.props.setData(this.buttonSetting.setting);
                    }}
                >
                    <Radio value="large">大</Radio>
                    <Radio value="middle">中</Radio>
                    <Radio value="small">小</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">形&#12288;&#12288;状</Tag>
                <Radio.Group
                    value={this.buttonSetting.shape}
                    onChange={(e) => {
                        this.buttonSetting.shape = e.target.value;
                        this.props.setData(this.buttonSetting.setting);
                    }}
                >
                    <Radio value="circle">圆角型</Radio>
                    <Radio value="round">有点方</Radio>
                    <Radio value="">正方</Radio>
                </Radio.Group>
            </div>
        </div>)
    }
}

IEButtonSettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}