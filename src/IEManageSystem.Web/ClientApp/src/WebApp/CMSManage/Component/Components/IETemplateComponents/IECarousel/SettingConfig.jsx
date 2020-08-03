import React from 'react'
import PropTypes from 'prop-types'
import {BaseConfig} from 'CMSManage/Component/Components/BaseComponents/BaseComponent'
import Setting from './Setting'

import { Input, Tag, Radio, Button } from 'antd';

export default class SettingConfig extends BaseConfig {
    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <Input
                placeholder="示例：#ffffff"
                className="mb-3"
                value={setting.fontColor}
                onChange={(e) => {
                    setting.fontColor = e.currentTarget.value;
                    this.props.setData(setting.setting);
                }}
                suffix={<Tag color="#55acee">字体颜色</Tag>}
            />
            <Input
                placeholder="示例：9rem"
                className="mb-3"
                value={setting.height}
                onChange={(e) => {
                    setting.height = e.currentTarget.value;
                    this.props.setData(setting.setting);
                }}
                suffix={<Tag color="#55acee">幻灯片高度</Tag>}
            />
            <Input
                placeholder="示例：35%"
                className="mb-3"
                value={setting.width}
                onChange={(e) => {
                    setting.width = e.currentTarget.value;
                    this.props.setData(setting.setting);
                }}
                suffix={<Tag color="#55acee">内容宽度</Tag>}
            />
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}