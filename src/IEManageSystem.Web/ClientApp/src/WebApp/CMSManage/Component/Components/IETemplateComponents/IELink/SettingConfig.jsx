import React from 'react'
import PropTypes from 'prop-types'
import ISettingConfig from 'BaseCMSManage/Components/IETemplateComponents/IELink/ISettingConfig'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IELink/Setting'
import { Input, Tag, Radio } from 'antd';
import {
    GithubOutlined,
    AccountBookFilled,
    CaretDownOutlined,
    CaretLeftFilled,
    CaretRightFilled,
    CaretUpFilled,
    HighlightTwoTone,
    HomeFilled,
    IdcardOutlined,
    RollbackOutlined,
    SafetyCertificateFilled,
    StarTwoTone,
    StepBackwardFilled,
    StepBackwardOutlined,
    StepForwardFilled,
    StepForwardOutlined,
    StockOutlined,
    StopOutlined,
    UploadOutlined,
    UsbFilled,
    UserAddOutlined,
    UserDeleteOutlined,
    UsergroupAddOutlined,
    UsergroupDeleteOutlined,
    UserOutlined,
    WeiboSquareFilled,
    WhatsAppOutlined,
    WifiOutlined,
    WindowsFilled,
    WomanOutlined,
    ZhihuOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons';
import { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';

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
            <Input
                placeholder="示例：这时一个链接"
                className="mb-3"
                value={this.setting.text}
                onChange={(e) => {
                    this.setting.text = e.currentTarget.value;
                    this.props.setData(this.setting.setting);
                }}
                suffix={<Tag color="#55acee">文本</Tag>}
            />
            <Input
                placeholder="示例：http://www.baidu.com"
                className="mb-3"
                value={this.setting.url}
                onChange={(e) => {
                    this.setting.url = e.currentTarget.value;
                    this.props.setData(this.setting.setting);
                }}
                suffix={<Tag color="#55acee">链接 Url</Tag>}
            />
            <div>
                <div>字体大小（Web端：16px，1rem ... | App端：16）</div>
                <Input
                    placeholder="示例：16"
                    className="mb-3"
                    value={this.setting.fontSize}
                    onChange={(e) => {
                        this.setting.fontSize = e.currentTarget.value;
                        this.props.setData(this.setting.setting);
                    }}
                    suffix={<Tag color="#55acee">字体大小</Tag>}
                />
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
            <div className="mb-3">
                <Tag color="#55acee">图标</Tag>
                <div className="col-md-12">
                    <Radio.Group
                        value={this.setting.icon}
                        onChange={(e) => {
                            this.setting.icon = e.target.value;
                            this.props.setData(this.setting.setting);
                        }}
                    >
                        <Radio value="">无</Radio>
                        <Radio value="GithubOutlined"><GithubOutlined /></Radio>
                        <Radio value="AccountBookFilled"><AccountBookFilled /></Radio>
                        <Radio value="CaretDownOutlined"><CaretDownOutlined /></Radio>
                        <Radio value="CaretLeftFilled"><CaretLeftFilled /></Radio>
                        <Radio value="CaretRightFilled"><CaretRightFilled /></Radio>
                        <Radio value="CaretUpFilled"><CaretUpFilled /></Radio>
                        <Radio value="HighlightTwoTone"><HighlightTwoTone /></Radio>
                        <Radio value="HomeFilled"><HomeFilled /></Radio>
                        <Radio value="IdcardOutlined"><IdcardOutlined /></Radio>
                        <Radio value="RollbackOutlined"><RollbackOutlined /></Radio>
                        <Radio value="SafetyCertificateFilled"><SafetyCertificateFilled /></Radio>
                        <Radio value="StarTwoTone"><StarTwoTone /></Radio>
                        <Radio value="StepBackwardFilled"><StepBackwardFilled /></Radio>
                        <Radio value="StepBackwardOutlined"><StepBackwardOutlined /></Radio>
                        <Radio value="StepForwardFilled"><StepForwardFilled /></Radio>
                        <Radio value="StepForwardOutlined"><StepForwardOutlined /></Radio>
                        <Radio value="StockOutlined"><StockOutlined /></Radio>
                        <Radio value="StopOutlined"><StopOutlined /></Radio>
                        <Radio value="UploadOutlined"><UploadOutlined /></Radio>
                        <Radio value="UsbFilled"><UsbFilled /></Radio>
                        <Radio value="UserAddOutlined"><UserAddOutlined /></Radio>
                        <Radio value="UserDeleteOutlined"><UserDeleteOutlined /></Radio>
                        <Radio value="UsergroupAddOutlined"><UsergroupAddOutlined /></Radio>
                        <Radio value="UsergroupDeleteOutlined"><UsergroupDeleteOutlined /></Radio>
                        <Radio value="UserOutlined"><UserOutlined /></Radio>
                        <Radio value="WeiboSquareFilled"><WeiboSquareFilled /></Radio>
                        <Radio value="WhatsAppOutlined"><WhatsAppOutlined /></Radio>
                        <Radio value="WifiOutlined"><WifiOutlined /></Radio>
                        <Radio value="WindowsFilled"><WindowsFilled /></Radio>
                        <Radio value="WomanOutlined"><WomanOutlined /></Radio>
                        <Radio value="ZhihuOutlined"><ZhihuOutlined /></Radio>
                        <Radio value="ZoomInOutlined"><ZoomInOutlined /></Radio>
                        <Radio value="ZoomOutOutlined"><ZoomOutOutlined /></Radio>
                    </Radio.Group>
                </div>
            </div>
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default (register) => register(ISettingConfig, ComponentSettingConfig.BuildPageComponentSettingConfig("Setting", "链接设置",
    (pageComponentSetting, setPageComponentSetting) => {
        return <SettingConfig
            data={pageComponentSetting}
            setData={setPageComponentSetting}
        />;
    }
));
