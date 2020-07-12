import React from 'react'
import PropTypes from 'prop-types'
import BaseConfig from 'CMSManage/Component/Components/BaseComponents/BaseComponent/BaseConfig'
import Setting from './Setting'

import { Input, Tag, Radio, Button, InputNumber } from 'antd';

export default class SettingConfig extends BaseConfig {
    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <div className="mb-3">
                <h6 className="font-weight-bold">文章样式</h6>
                <Tag color="#55acee">列数</Tag>
                <InputNumber
                    value={setting.col}
                    onChange={(value) => {
                        setting.col = value;
                        this.props.setData(setting.setting);
                    }}
                />
                <Input
                    placeholder="示例：文章信息介绍"
                    className="mb-3 mt-3"
                    value={setting.title}
                    onChange={(e) => {
                        setting.title = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">信息标题</Tag>}
                />
            </div>
            <div>
                <h6 className="font-weight-bold">字段配置</h6>
                <Input
                    placeholder="示例：上市时间"
                    className="mb-3"
                    value={setting.field1}
                    onChange={(e) => {
                        setting.field1 = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">字段1名称</Tag>}
                />
                <Input
                    placeholder="示例：上市时间"
                    className="mb-3"
                    value={setting.field2}
                    onChange={(e) => {
                        setting.field2 = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">字段2名称</Tag>}
                />
                <Input
                    placeholder="示例：上市时间"
                    className="mb-3"
                    value={setting.field3}
                    onChange={(e) => {
                        setting.field3 = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">字段3名称</Tag>}
                />
                <Input
                    placeholder="示例：上市时间"
                    className="mb-3"
                    value={setting.field4}
                    onChange={(e) => {
                        setting.field4 = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">字段4名称</Tag>}
                />
                <Input
                    placeholder="示例：上市时间"
                    className="mb-3"
                    value={setting.field5}
                    onChange={(e) => {
                        setting.field5 = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">字段5名称</Tag>}
                />
            </div>
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}