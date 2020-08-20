import React from 'react'
import PropTypes from 'prop-types'
import ISettingConfig from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/ISettingConfig'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/Setting'
import { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import { Input, Tag, InputNumber } from 'antd';

class SettingConfig extends ISettingConfig {
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
            <div className="mb-3">
                <Tag color="#55acee">幻灯片高度</Tag>
                <InputNumber
                    placeholder="示例：300"
                    value={setting.height}
                    onChange={(value) => {
                        setting.height = value;
                        this.props.setData(setting.setting);
                    }}
                />
            </div>
            <div className="mb-3">
                <Tag color="#55acee">内容区域宽度</Tag>
                <InputNumber
                    placeholder="示例：300"
                    value={setting.width}
                    onChange={(value) => {
                        setting.width = value;
                        this.props.setData(setting.setting);
                    }}
                />
            </div>
            <div className="mb-3">
                <Tag color="#55acee">遮罩颜色</Tag>
                <Input
                    placeholder="示例：#0004"
                    value={setting.shade}e
                    onChange={(e) => {
                        setting.shade = e.target.value;
                        this.props.setData(setting.setting);
                    }}
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

export default (register) => register(ISettingConfig, ComponentSettingConfig.BuildPageComponentSettingConfig("DefaultSetting", "幻灯片设置",
    (pageComponentSetting, setPageComponentSetting) => {
        return <SettingConfig
            data={pageComponentSetting}
            setData={setPageComponentSetting}
        />;
    }
));
