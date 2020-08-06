import React from 'react'
import PropTypes from 'prop-types'
import ISettingConfig from 'BaseCMSManage/Components/IETemplateComponents/IEInfoGroup/ISettingConfig'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEInfoGroup/Setting'
import { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import { Input, Tag, Switch, InputNumber } from 'antd';
import IocContainer from 'Core/IocContainer';

class SettingConfig extends ISettingConfig {
    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <div className="mb-3">
                <div className="font-weight-bold mb-3">文章样式</div>
                <div className="mb-3">
                    <Tag color="#55acee">列数</Tag>
                    <InputNumber
                        value={setting.col}
                        onChange={(value) => {
                            setting.col = value;
                            this.props.setData(setting.setting);
                        }}
                    />
                </div>
                <Input
                    placeholder="示例：文章信息介绍"
                    className="mb-3"
                    value={setting.title}
                    onChange={(e) => {
                        setting.title = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">信息标题</Tag>}
                />
                <Input
                    placeholder="示例：#fff"
                    className="mb-3"
                    value={setting.color}
                    onChange={(e) => {
                        setting.color = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">字体颜色</Tag>}
                />
                <div className="mb-3">
                    <span>是否显示边框：</span>
                    <Switch
                        checked={setting.bordered}
                        onChange={(value) => {
                            setting.bordered = value;
                            this.props.setData(setting.setting);
                        }}
                    />
                </div>
            </div>
            <div>
                <div className="font-weight-bold mb-3">字段配置</div>
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

IocContainer.registerSingleIntances(ISettingConfig, ComponentSettingConfig.BuildPageComponentSettingConfig("DefaultSetting", "字段配置",
(pageComponentSetting, setPageComponentSetting) => {
    return <SettingConfig
        data={pageComponentSetting}
        setData={setPageComponentSetting}
    />;
}
));
