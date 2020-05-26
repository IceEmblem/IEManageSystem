import React from 'react'
import PropTypes from 'prop-types'
import BaseConfig from 'CMSManage/Component/Components/BaseComponents/BaseComponent/BaseConfig'
import Setting from './Setting'

import { Input, Tag, Radio, Button } from 'antd';

export default class SettingConfig extends BaseConfig {
    setting = null;

    constructor(props) {
        super(props);

        this.setting = new Setting(props.data);
    }

    render() {
        this.setting.setSetting(this.props.data);

        return (<div>
            <Input
                placeholder=""
                className="mb-3"
                value={this.setting.copyright}
                onChange={(e) => {
                    this.setting.copyright = e.currentTarget.value;
                    this.props.setData(this.setting.setting);
                }}
                suffix={<Tag color="#55acee">版权声明</Tag>}
            />
            <Input
                placeholder=""
                className="mb-3"
                value={this.setting.text}
                onChange={(e) => {
                    this.setting.text = e.currentTarget.value;
                    this.props.setData(this.setting.setting);
                }}
                suffix={<Tag color="#55acee">右边文本</Tag>}
            />
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}