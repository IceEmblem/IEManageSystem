import React from 'react'
import PropTypes from 'prop-types'
import BaseConfig from 'CMSManage/Component/Components/BaseComponents/BaseComponent/BaseConfig'
import Setting from './Setting'

import { Input, Tag, InputNumber } from 'antd';

export default class SettingConfig extends BaseConfig {
    setting = null;

    constructor(props) {
        super(props);

        this.setting = new Setting(props.data);
    }

    render() {
        this.setting.setSetting(this.props.data);

        return (<div>
            <div>
                <span><Tag color="#55acee">文章列数</Tag></span>
                <InputNumber
                    placeholder=""
                    className="mb-3"
                    value={this.setting.col}
                    onChange={(value) => {
                        this.setting.col = value;
                        this.props.setData(this.setting.setting);
                    }}
                />
            </div>
            <Input
                placeholder="图片高度（示例：5rem）"
                className="mb-3"
                value={this.setting.heigth}
                onChange={(e) => {
                    this.setting.heigth = e.currentTarget.value;
                    this.props.setData(this.setting.setting);
                }}
                suffix={<Tag color="#55acee">图片高度</Tag>}
            />
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}