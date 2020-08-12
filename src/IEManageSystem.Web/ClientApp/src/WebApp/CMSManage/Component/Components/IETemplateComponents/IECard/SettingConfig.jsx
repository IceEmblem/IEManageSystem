import React from 'react'
import PropTypes from 'prop-types'
import ISettingConfig from 'BaseCMSManage/Components/IETemplateComponents/IECard/ISettingConfig'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IECard/Setting'
import { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import { Input, Tag } from 'antd';

class SettingConfig extends ISettingConfig {
    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <Input
                placeholder="示例：300px"
                className="mb-3"
                value={setting.height}
                onChange={(e) => {
                    setting.height = e.currentTarget.value;
                    this.props.setData(setting.setting);
                }}
                suffix={<Tag color="#55acee">图片高度</Tag>}
            />
            <Input
                placeholder="示例：100%"
                className="mb-3"
                value={setting.width}
                onChange={(e) => {
                    setting.width = e.currentTarget.value;
                    this.props.setData(setting.setting);
                }}
                suffix={<Tag color="#55acee">图片宽度</Tag>}
            />
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default (register) => register(ISettingConfig, ComponentSettingConfig.BuildPageComponentSettingConfig("DefaultSetting", "图片设置",
(pageComponentSetting, setPageComponentSetting) => {
    return <SettingConfig
        data={pageComponentSetting}
        setData={setPageComponentSetting}
    />;
}
));
