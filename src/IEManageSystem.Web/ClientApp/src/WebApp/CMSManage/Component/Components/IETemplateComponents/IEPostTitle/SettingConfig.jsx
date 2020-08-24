import React from 'react'
import PropTypes from 'prop-types'
import ISettingConfig from 'BaseCMSManage/Components/IETemplateComponents/IEPostTitle/ISettingConfig'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEPostTitle/Setting'
import { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import { Input, Tag, Radio } from 'antd';

class SettingConfig extends ISettingConfig {
    setting = null;

    constructor(props) {
        super(props);

        this.setting = new Setting(props.data);
    }

    render() {
        this.setting.setSetting(this.props.data);

        return (<div>
            <div className="mb-3">
                <Tag color="#55acee">文本类型</Tag>
                <Radio.Group
                    value={this.setting.textType}
                    onChange={(e) => {
                        this.setting.textType = e.target.value;
                        this.props.setData(this.setting.setting);
                    }}
                >
                    <Radio value="h1">H1</Radio>
                    <Radio value="h2">H2</Radio>
                    <Radio value="h3">H3</Radio>
                    <Radio value="h4">H4</Radio>
                    <Radio value="text">普通文本</Radio>
                </Radio.Group>
            </div>
            <Input
                placeholder="示例：#ffffff"
                className="mb-3"
                value={this.setting.fontColor}
                onChange={(e) => {
                    this.setting.fontColor = e.currentTarget.value;
                    this.props.setData(this.setting.setting);
                }}
                suffix={<Tag color="#55acee">字体颜色</Tag>}
            />
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default (register) => register(ISettingConfig, ComponentSettingConfig.BuildPageComponentSettingConfig("DefaultSetting", "组件设置",
(pageComponentSetting, setPageComponentSetting) => {
    return <SettingConfig
        data={pageComponentSetting}
        setData={setPageComponentSetting}
    />;
}
));
