import React from 'react'
import PropTypes from 'prop-types'
import BaseConfig from 'CMSManage/Component/Components/BaseComponents/BaseComponent/BaseConfig'
import Setting from './Setting'

import { Input, Tag, Radio, Button } from 'antd';

export default class SettingConfig extends BaseConfig {
    state = {
        isShowPicturePopupBox: false
    }

    setting = null;

    constructor(props) {
        super(props);

        this.setting = new Setting(props.data);
    }

    render() {
        this.setting.setSetting(this.props.data);

        return (<div>
            <div className="mb-3">
                <Tag color="#55acee">排序（主轴）方向</Tag>
                <Radio.Group
                    value={this.setting.direction}
                    onChange={(e) => {
                        this.setting.direction = e.target.value;
                        this.props.setData(this.setting.setting);
                    }}
                >
                    <Radio value="flex-row">对平</Radio>
                    <Radio value="flex-row-reverse">方向反向</Radio>
                    <Radio value="flex-column">垂直</Radio>
                    <Radio value="flex-column-reverse">方向垂直</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">主轴内容对齐</Tag>
                <Radio.Group
                    value={this.setting.justifyContent}
                    onChange={(e) => {
                        this.setting.justifyContent = e.target.value;
                        this.props.setData(this.setting.setting);
                    }}
                >
                    <Radio value="justify-content-start">头部</Radio>
                    <Radio value="justify-content-end">尾部</Radio>
                    <Radio value="justify-content-center">中间</Radio>
                    <Radio value="justify-content-between">等距</Radio>
                    <Radio value="justify-content-around">等距（头尾有间隔）</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">副轴（单行）内容对齐</Tag>
                <Radio.Group
                    value={this.setting.alignItems}
                    onChange={(e) => {
                        this.setting.alignItems = e.target.value;
                        this.props.setData(this.setting.setting);
                    }}
                >
                    <Radio value="align-items-start">头部</Radio>
                    <Radio value="align-items-end">尾部</Radio>
                    <Radio value="align-items-center">中间</Radio>
                    <Radio value="align-items-baseline">基线对齐</Radio>
                    <Radio value="align-items-stretch">头部（子元素等高）</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">是否换行</Tag>
                <Radio.Group
                    value={this.setting.wrap}
                    onChange={(e) => {
                        this.setting.wrap = e.target.value;
                        this.props.setData(this.setting.setting);
                    }}
                >
                    <Radio value="flex-wrap">换行</Radio>
                    <Radio value="flex-nowrap">不换行</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">副轴（多行）内容对齐</Tag>
                <Radio.Group
                    value={this.setting.alignContent}
                    onChange={(e) => {
                        this.setting.alignContent = e.target.value;
                        this.props.setData(this.setting.setting);
                    }}
                >
                    <Radio value="align-content-start">头部</Radio>
                    <Radio value="align-content-end">尾部</Radio>
                    <Radio value="align-content-center">中间</Radio>
                    <Radio value="align-content-around">对称</Radio>
                    <Radio value="align-content-stretch">对称（子元素等高）</Radio>
                </Radio.Group>
            </div>
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}