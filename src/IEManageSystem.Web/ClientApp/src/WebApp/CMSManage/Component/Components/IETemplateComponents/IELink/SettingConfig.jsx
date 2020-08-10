import React from 'react'
import PropTypes from 'prop-types'
import ISettingConfig from 'BaseCMSManage/Components/IETemplateComponents/IELink/ISettingConfig'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IELink/Setting'
import { Input, Tag, Radio } from 'antd';
import {
    GithubOutlined,
    AccountBookFilled,
    AccountBookOutlined,
    AccountBookTwoTone,
    AimOutlined,
    AlertFilled,
    CaretDownOutlined,
    CaretLeftFilled,
    CaretLeftOutlined,
    CaretRightFilled,
    CaretRightOutlined,
    CaretUpFilled,
    CaretUpOutlined,
    CarFilled,
    FastForwardFilled,
    FastForwardOutlined,
    FieldBinaryOutlined,
    FieldNumberOutlined,
    FieldStringOutlined,
    FieldTimeOutlined,
    FileAddFilled,
    FileAddOutlined,
    FileAddTwoTone,
    FileDoneOutlined,
    FileExcelFilled,
    HighlightTwoTone,
    HistoryOutlined,
    HomeFilled,
    HomeOutlined,
    HomeTwoTone,
    HourglassFilled,
    HourglassOutlined,
    HourglassTwoTone,
    Html5Filled,
    Html5Outlined,
    Html5TwoTone,
    IdcardFilled,
    IdcardOutlined,
    IdcardTwoTone,
    PieChartTwoTone,
    PlayCircleFilled,
    PlayCircleOutlined,
    RollbackOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SafetyCertificateFilled,
    StarTwoTone,
    StepBackwardFilled,
    StepBackwardOutlined,
    StepForwardFilled,
    StepForwardOutlined,
    StockOutlined,
    StopFilled,
    StopOutlined,
    StopTwoTone,
    StrikethroughOutlined,
    UpCircleTwoTone,
    UploadOutlined,
    UpOutlined,
    UpSquareFilled,
    UpSquareOutlined,
    UpSquareTwoTone,
    UsbFilled,
    UsbOutlined,
    UsbTwoTone,
    UserAddOutlined,
    UserDeleteOutlined,
    UsergroupAddOutlined,
    UsergroupDeleteOutlined,
    UserOutlined,
    UserSwitchOutlined,
    VerifiedOutlined,
    WeiboSquareFilled,
    WeiboSquareOutlined,
    WhatsAppOutlined,
    WifiOutlined,
    WindowsFilled,
    WindowsOutlined,
    WomanOutlined,
    YahooFilled,
    YahooOutlined,
    YoutubeFilled,
    YoutubeOutlined,
    YuqueFilled,
    YuqueOutlined,
    ZhihuCircleFilled,
    ZhihuOutlined,
    ZhihuSquareFilled,
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
            <Input
                placeholder="示例：16px"
                className="mb-3"
                value={this.setting.fontSize}
                onChange={(e) => {
                    this.setting.fontSize = e.currentTarget.value;
                    this.props.setData(this.setting.setting);
                }}
                suffix={<Tag color="#55acee">字体大小</Tag>}
            />
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
                        <Radio value="AccountBookOutlined"><AccountBookOutlined /></Radio>
                        <Radio value="AccountBookTwoTone"><AccountBookTwoTone /></Radio>
                        <Radio value="AimOutlined"><AimOutlined /></Radio>
                        <Radio value="AlertFilled"><AlertFilled /></Radio>
                        <Radio value="CaretDownOutlined"><CaretDownOutlined /></Radio>
                        <Radio value="CaretLeftFilled"><CaretLeftFilled /></Radio>
                        <Radio value="CaretLeftOutlined"><CaretLeftOutlined /></Radio>
                        <Radio value="CaretRightFilled"><CaretRightFilled /></Radio>
                        <Radio value="CaretRightOutlined"><CaretRightOutlined /></Radio>
                        <Radio value="CaretUpFilled"><CaretUpFilled /></Radio>
                        <Radio value="CaretUpOutlined"><CaretUpOutlined /></Radio>
                        <Radio value="CarFilled"><CarFilled /></Radio>
                        <Radio value="FastForwardFilled"><FastForwardFilled /></Radio>
                        <Radio value="FastForwardOutlined"><FastForwardOutlined /></Radio>
                        <Radio value="FieldBinaryOutlined"><FieldBinaryOutlined /></Radio>
                        <Radio value="FieldNumberOutlined"><FieldNumberOutlined /></Radio>
                        <Radio value="FieldStringOutlined"><FieldStringOutlined /></Radio>
                        <Radio value="FieldTimeOutlined"><FieldTimeOutlined /></Radio>
                        <Radio value="FileAddFilled"><FileAddFilled /></Radio>
                        <Radio value="FileAddOutlined"><FileAddOutlined /></Radio>
                        <Radio value="FileAddTwoTone"><FileAddTwoTone /></Radio>
                        <Radio value="FileDoneOutlined"><FileDoneOutlined /></Radio>
                        <Radio value="FileExcelFilled"><FileExcelFilled /></Radio>
                        <Radio value="HighlightTwoTone"><HighlightTwoTone /></Radio>
                        <Radio value="HistoryOutlined"><HistoryOutlined /></Radio>
                        <Radio value="HomeFilled"><HomeFilled /></Radio>
                        <Radio value="HomeOutlined"><HomeOutlined /></Radio>
                        <Radio value="HomeTwoTone"><HomeTwoTone /></Radio>
                        <Radio value="HourglassFilled"><HourglassFilled /></Radio>
                        <Radio value="HourglassOutlined"><HourglassOutlined /></Radio>
                        <Radio value="HourglassTwoTone"><HourglassTwoTone /></Radio>
                        <Radio value="Html5Filled"><Html5Filled /></Radio>
                        <Radio value="Html5Outlined"><Html5Outlined /></Radio>
                        <Radio value="Html5TwoTone"><Html5TwoTone /></Radio>
                        <Radio value="IdcardFilled"><IdcardFilled /></Radio>
                        <Radio value="IdcardOutlined"><IdcardOutlined /></Radio>
                        <Radio value="IdcardTwoTone"><IdcardTwoTone /></Radio>
                        <Radio value="PieChartTwoTone"><PieChartTwoTone /></Radio>
                        <Radio value="PlayCircleFilled"><PlayCircleFilled /></Radio>
                        <Radio value="PlayCircleOutlined"><PlayCircleOutlined /></Radio>
                        <Radio value="RollbackOutlined"><RollbackOutlined /></Radio>
                        <Radio value="RotateLeftOutlined"><RotateLeftOutlined /></Radio>
                        <Radio value="RotateRightOutlined"><RotateRightOutlined /></Radio>
                        <Radio value="SafetyCertificateFilled"><SafetyCertificateFilled /></Radio>
                        <Radio value="StarTwoTone"><StarTwoTone /></Radio>
                        <Radio value="StepBackwardFilled"><StepBackwardFilled /></Radio>
                        <Radio value="StepBackwardOutlined"><StepBackwardOutlined /></Radio>
                        <Radio value="StepForwardFilled"><StepForwardFilled /></Radio>
                        <Radio value="StepForwardOutlined"><StepForwardOutlined /></Radio>
                        <Radio value="StockOutlined"><StockOutlined /></Radio>
                        <Radio value="StopFilled"><StopFilled /></Radio>
                        <Radio value="StopOutlined"><StopOutlined /></Radio>
                        <Radio value="StopTwoTone"><StopTwoTone /></Radio>
                        <Radio value="StrikethroughOutlined"><StrikethroughOutlined /></Radio>
                        <Radio value="UpCircleTwoTone"><UpCircleTwoTone /></Radio>
                        <Radio value="UploadOutlined"><UploadOutlined /></Radio>
                        <Radio value="UpOutlined"><UpOutlined /></Radio>
                        <Radio value="UpSquareFilled"><UpSquareFilled /></Radio>
                        <Radio value="UpSquareOutlined"><UpSquareOutlined /></Radio>
                        <Radio value="UpSquareTwoTone"><UpSquareTwoTone /></Radio>
                        <Radio value="UsbFilled"><UsbFilled /></Radio>
                        <Radio value="UsbOutlined"><UsbOutlined /></Radio>
                        <Radio value="UsbTwoTone"><UsbTwoTone /></Radio>
                        <Radio value="UserAddOutlined"><UserAddOutlined /></Radio>
                        <Radio value="UserDeleteOutlined"><UserDeleteOutlined /></Radio>
                        <Radio value="UsergroupAddOutlined"><UsergroupAddOutlined /></Radio>
                        <Radio value="UsergroupDeleteOutlined"><UsergroupDeleteOutlined /></Radio>
                        <Radio value="UserOutlined"><UserOutlined /></Radio>
                        <Radio value="UserSwitchOutlined"><UserSwitchOutlined /></Radio>
                        <Radio value="VerifiedOutlined"><VerifiedOutlined /></Radio>
                        <Radio value="WeiboSquareFilled"><WeiboSquareFilled /></Radio>
                        <Radio value="WeiboSquareOutlined"><WeiboSquareOutlined /></Radio>
                        <Radio value="WhatsAppOutlined"><WhatsAppOutlined /></Radio>
                        <Radio value="WifiOutlined"><WifiOutlined /></Radio>
                        <Radio value="WindowsFilled"><WindowsFilled /></Radio>
                        <Radio value="WindowsOutlined"><WindowsOutlined /></Radio>
                        <Radio value="WomanOutlined"><WomanOutlined /></Radio>
                        <Radio value="YahooFilled"><YahooFilled /></Radio>
                        <Radio value="YahooOutlined"><YahooOutlined /></Radio>
                        <Radio value="YoutubeFilled"><YoutubeFilled /></Radio>
                        <Radio value="YoutubeOutlined"><YoutubeOutlined /></Radio>
                        <Radio value="YuqueFilled"><YuqueFilled /></Radio>
                        <Radio value="YuqueOutlined"><YuqueOutlined /></Radio>
                        <Radio value="ZhihuCircleFilled"><ZhihuCircleFilled /></Radio>
                        <Radio value="ZhihuOutlined"><ZhihuOutlined /></Radio>
                        <Radio value="ZhihuSquareFilled"><ZhihuSquareFilled /></Radio>
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
