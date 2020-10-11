import React from 'react'
import PropTypes from 'prop-types'
import Setting from 'IETemplateComponents/Container/Setting'

import { Tag, Radio } from 'antd';

class SettingConfig extends React.Component {
    state = {
        isShowPicturePopupBox: false
    }
    
    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <div className="mb-3">
                <Tag color="#55acee">排序（主轴）方向</Tag>
                <Radio.Group
                    value={setting.direction}
                    onChange={(e) => {
                        setting.direction = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="row">对平</Radio>
                    <Radio value="row-reverse">方向反向</Radio>
                    <Radio value="column">垂直</Radio>
                    <Radio value="column-reverse">方向垂直</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">主轴内容对齐</Tag>
                <Radio.Group
                    value={setting.justifyContent}
                    onChange={(e) => {
                        setting.justifyContent = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="flex-start">头部</Radio>
                    <Radio value="flex-end">尾部</Radio>
                    <Radio value="center">中间</Radio>
                    <Radio value="space-between">等距</Radio>
                    <Radio value="space-around">等距（头尾有间隔）</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">副轴（单行）内容对齐</Tag>
                <Radio.Group
                    value={setting.alignItems}
                    onChange={(e) => {
                        setting.alignItems = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="flex-start">头部</Radio>
                    <Radio value="flex-end">尾部</Radio>
                    <Radio value="center">中间</Radio>
                    <Radio value="baseline">基线对齐（第一行文字对齐）</Radio>
                    <Radio value="stretch">头部（子元素等高）</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">是否换行</Tag>
                <Radio.Group
                    value={setting.wrap}
                    onChange={(e) => {
                        setting.wrap = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="wrap">换行</Radio>
                    <Radio value="nowrap">不换行</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">副轴（多行）内容对齐</Tag>
                <Radio.Group
                    value={setting.alignContent}
                    onChange={(e) => {
                        setting.alignContent = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="flex-start">头部</Radio>
                    <Radio value="flex-end">尾部</Radio>
                    <Radio value="center">中间</Radio>
                    <Radio value="space-around">对称</Radio>
                    <Radio value="stretch">对称（子元素等高）</Radio>
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

export default SettingConfig;