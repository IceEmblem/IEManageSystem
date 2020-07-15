import React from 'react'
import PropTypes from 'prop-types'
import BaseConfig from 'CMSManage/Component/Components/BaseComponents/BaseComponent/BaseConfig'
import Setting from './Setting'

import { Input, Tag } from 'antd';

export default class SettingConfig extends BaseConfig {
    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <Input
                placeholder="示例：线条1|线条2|线条3"
                className="mb-3"
                value={setting.lines}
                onChange={(e) => {
                    setting.lines = e.currentTarget.value;
                    this.props.setData(setting.setting);
                }}
                suffix={<Tag color="#55acee">线条名称（多线条已 | 进行分隔）</Tag>}
            />
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}