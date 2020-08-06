import React from 'react'
import PropTypes from 'prop-types'
import ISettingConfig from 'BaseCMSManage/Components/IETemplateComponents/IEPageSetting/ISettingConfig'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEPageSetting/Setting'
import { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import IocContainer from 'Core/IocContainer';
import PicturePopupBox from 'CMSManage/PictureManage/PicturePopupBox'
import { Input, Tag, Radio, Button } from 'antd';

class SettingConfig extends ISettingConfig {
    state = {
        isShowPicturePopupBox: false
    }

    setting = null;

    constructor(props) {
        super(props);

        this.setting = new Setting(props.data);
    }

    render() {
        this.setting.setSetting(this.props.data);

        return (<div>
            <div className="mb-3">
                <Tag color="#55acee">操作元素</Tag>
                <Radio.Group
                    value={this.setting.element}
                    onChange={(e) => {
                        this.setting.element = e.target.value;
                        this.props.setData(this.setting.setting);
                    }}
                >
                    <Radio value="root">根（固定）</Radio>
                    <Radio value="page">页面（滚动）</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Input
                    placeholder="背景图片"
                    value={this.setting.backgroundImage}
                    onChange={(e) => {
                        this.setting.backgroundImage = e.target.value;
                        this.props.setData(this.setting.setting);
                    }}
                    suffix={<Button size="small" type="primary" onClick={() => { this.setState({ isShowPicturePopupBox: true }) }} >选择图片</Button>}
                />
                <PicturePopupBox
                    isShow={this.state.isShowPicturePopupBox}
                    closePopupBox={() => { this.setState({ isShowPicturePopupBox: false }) }}
                    selectPictruePath={(path) => {
                        this.setting.backgroundImage = path;
                        this.props.setData(this.setting.setting);
                    }}
                />
            </div>
            <Input
                placeholder="示例：#ffffff"
                className="mb-3"
                value={this.setting.backgroundColor}
                onChange={(e) => {
                    this.setting.backgroundColor = e.currentTarget.value;
                    this.props.setData(this.setting.setting);
                }}
                suffix={<Tag color="#55acee">背景颜色</Tag>}
            />
            <Input
                placeholder="示例：500px"
                className="mb-3"
                value={this.setting.height}
                onChange={(e) => {
                    this.setting.height = e.currentTarget.value;
                    this.props.setData(this.setting.setting);
                }}
                suffix={<Tag color="#55acee">高&#12288;&#12288;度</Tag>}
            />
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

IocContainer.registerSingleIntances(ISettingConfig, ComponentSettingConfig.BuildPageComponentSettingConfig("PageSetting", "页面设置",
(pageComponentSetting, setPageComponentSetting) => {
    return <SettingConfig
        data={pageComponentSetting}
        setData={setPageComponentSetting}
    />;
}
));
