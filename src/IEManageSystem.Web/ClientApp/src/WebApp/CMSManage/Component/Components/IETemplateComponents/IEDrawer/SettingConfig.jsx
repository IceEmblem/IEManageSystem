import React from 'react'
import PropTypes from 'prop-types'
import ISettingConfig from 'BaseCMSManage/Components/IETemplateComponents/IEDrawer/ISettingConfig'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEDrawer/Setting'
import { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import { Input, Tag, InputNumber } from 'antd';

class SettingConfig extends ISettingConfig {
    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <div>
                <Tag color="#55acee">图片高度（Web端：300px, 30rem ... | App端：300）</Tag>
                <Input
                    placeholder="示例：300"
                    className="mb-3"
                    value={setting.imgHeight}
                    onChange={(e) => {
                        setting.imgHeight = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                />
            </div>
            <div className="mb-3">
                <span><Tag color="#55acee">侧边栏宽度</Tag></span>
                <InputNumber
                    placeholder="示例：300"
                    value={setting.boxWidth}
                    onChange={(value) => {
                        setting.boxWidth = value;
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

export default (register) => register(ISettingConfig, ComponentSettingConfig.BuildPageComponentSettingConfig("DefaultSetting", "组件设置",
    (pageComponentSetting, setPageComponentSetting) => {
        return <SettingConfig
            data={pageComponentSetting}
            setData={setPageComponentSetting}
        />;
    }
));
