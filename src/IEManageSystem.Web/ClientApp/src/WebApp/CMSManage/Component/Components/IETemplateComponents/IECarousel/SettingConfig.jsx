import React from 'react'
import PropTypes from 'prop-types'
import ISettingConfig from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/ISettingConfig'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/Setting'
import { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import IocContainer from 'Core/IocContainer';
import { Input, Tag } from 'antd';

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

IocContainer.registerSingleIntances(ISettingConfig, ComponentSettingConfig.BuildPageComponentSettingConfig("DefaultSetting", "幻灯片设置",
(pageComponentSetting, setPageComponentSetting) => {
    return <SettingConfig
        data={pageComponentSetting}
        setData={setPageComponentSetting}
    />;
}
));
