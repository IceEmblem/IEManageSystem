import React from 'react'
import PropTypes from 'prop-types'
import ISettingConfig from 'BaseCMSManage/Components/IETemplateComponents/IEPostList/ISettingConfig'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEPostList/Setting'
import { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import IocContainer from 'Core/IocContainer';
import { Input, Tag, InputNumber, Switch } from 'antd';

class SettingConfig extends ISettingConfig {
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
            <div>
                <span>是否显示文章图片：</span>
                <Switch 
                checked={JSON.parse(this.setting.isShowImg)}
                onChange={(value)=>{
                    this.setting.isShowImg = value.toString();
                    this.props.setData(this.setting.setting);
                }} />
            </div>
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

IocContainer.registerSingleIntances(ISettingConfig, ComponentSettingConfig.BuildPageComponentSettingConfig("DefaultSetting", "组件设置",
(pageComponentSetting, setPageComponentSetting) => {
    return <SettingConfig
        data={pageComponentSetting}
        setData={setPageComponentSetting}
    />;
}
));
