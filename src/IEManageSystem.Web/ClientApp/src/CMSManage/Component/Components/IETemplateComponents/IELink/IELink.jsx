import React from 'react';

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

import Setting from './Setting'

export default class IEImg extends React.Component {
    constructor(props) {
        super(props);

        this.setting = new Setting(this.getPageComponentSetting());
    }

    getPageComponentSetting() {
        return this.props.pageComponentSettings.find(e => e.name == "Setting");
    }

    render() {
        this.setting.setSetting(this.getPageComponentSetting());

        let Icon = undefined;
        if (!this.setting.icon || this.setting.icon == "") { }
        else if ("GithubOutlined" == this.setting.icon) Icon = <GithubOutlined />;
        else if ("AccountBookFilled" == this.setting.icon) Icon = <AccountBookFilled />;
        else if ("AccountBookOutlined" == this.setting.icon) Icon = <AccountBookOutlined />;
        else if ("AccountBookTwoTone" == this.setting.icon) Icon = <AccountBookTwoTone />;
        else if ("AimOutlined" == this.setting.icon) Icon = <AimOutlined />;
        else if ("AlertFilled" == this.setting.icon) Icon = <AlertFilled />;
        else if ("CaretDownOutlined" == this.setting.icon) Icon = <CaretDownOutlined />;
        else if ("CaretLeftFilled" == this.setting.icon) Icon = <CaretLeftFilled />;
        else if ("CaretLeftOutlined" == this.setting.icon) Icon = <CaretLeftOutlined />;
        else if ("CaretRightFilled" == this.setting.icon) Icon = <CaretRightFilled />;
        else if ("CaretRightOutlined" == this.setting.icon) Icon = <CaretRightOutlined />;
        else if ("CaretUpFilled" == this.setting.icon) Icon = <CaretUpFilled />;
        else if ("CaretUpOutlined" == this.setting.icon) Icon = <CaretUpOutlined />;
        else if ("CarFilled" == this.setting.icon) Icon = <CarFilled />;
        else if ("FastForwardFilled" == this.setting.icon) Icon = <FastForwardFilled />;
        else if ("FastForwardOutlined" == this.setting.icon) Icon = <FastForwardOutlined />;
        else if ("FieldBinaryOutlined" == this.setting.icon) Icon = <FieldBinaryOutlined />;
        else if ("FieldNumberOutlined" == this.setting.icon) Icon = <FieldNumberOutlined />;
        else if ("FieldStringOutlined" == this.setting.icon) Icon = <FieldStringOutlined />;
        else if ("FieldTimeOutlined" == this.setting.icon) Icon = <FieldTimeOutlined />;
        else if ("FileAddFilled" == this.setting.icon) Icon = <FileAddFilled />;
        else if ("FileAddOutlined" == this.setting.icon) Icon = <FileAddOutlined />;
        else if ("FileAddTwoTone" == this.setting.icon) Icon = <FileAddTwoTone />;
        else if ("FileDoneOutlined" == this.setting.icon) Icon = <FileDoneOutlined />;
        else if ("FileExcelFilled" == this.setting.icon) Icon = <FileExcelFilled />;
        else if ("HighlightTwoTone" == this.setting.icon) Icon = <HighlightTwoTone />;
        else if ("HistoryOutlined" == this.setting.icon) Icon = <HistoryOutlined />;
        else if ("HomeFilled" == this.setting.icon) Icon = <HomeFilled />;
        else if ("HomeOutlined" == this.setting.icon) Icon = <HomeOutlined />;
        else if ("HomeTwoTone" == this.setting.icon) Icon = <HomeTwoTone />;
        else if ("HourglassFilled" == this.setting.icon) Icon = <HourglassFilled />;
        else if ("HourglassOutlined" == this.setting.icon) Icon = <HourglassOutlined />;
        else if ("HourglassTwoTone" == this.setting.icon) Icon = <HourglassTwoTone />;
        else if ("Html5Filled" == this.setting.icon) Icon = <Html5Filled />;
        else if ("Html5Outlined" == this.setting.icon) Icon = <Html5Outlined />;
        else if ("Html5TwoTone" == this.setting.icon) Icon = <Html5TwoTone />;
        else if ("IdcardFilled" == this.setting.icon) Icon = <IdcardFilled />;
        else if ("IdcardOutlined" == this.setting.icon) Icon = <IdcardOutlined />;
        else if ("IdcardTwoTone" == this.setting.icon) Icon = <IdcardTwoTone />;
        else if ("PieChartTwoTone" == this.setting.icon) Icon = <PieChartTwoTone />;
        else if ("PlayCircleFilled" == this.setting.icon) Icon = <PlayCircleFilled />;
        else if ("PlayCircleOutlined" == this.setting.icon) Icon = <PlayCircleOutlined />;
        else if ("RollbackOutlined" == this.setting.icon) Icon = <RollbackOutlined />;
        else if ("RotateLeftOutlined" == this.setting.icon) Icon = <RotateLeftOutlined />;
        else if ("RotateRightOutlined" == this.setting.icon) Icon = <RotateRightOutlined />;
        else if ("SafetyCertificateFilled" == this.setting.icon) Icon = <SafetyCertificateFilled />;
        else if ("StarTwoTone" == this.setting.icon) Icon = <StarTwoTone />;
        else if ("StepBackwardFilled" == this.setting.icon) Icon = <StepBackwardFilled />;
        else if ("StepBackwardOutlined" == this.setting.icon) Icon = <StepBackwardOutlined />;
        else if ("StepForwardFilled" == this.setting.icon) Icon = <StepForwardFilled />;
        else if ("StepForwardOutlined" == this.setting.icon) Icon = <StepForwardOutlined />;
        else if ("StockOutlined" == this.setting.icon) Icon = <StockOutlined />;
        else if ("StopFilled" == this.setting.icon) Icon = <StopFilled />;
        else if ("StopOutlined" == this.setting.icon) Icon = <StopOutlined />;
        else if ("StopTwoTone" == this.setting.icon) Icon = <StopTwoTone />;
        else if ("StrikethroughOutlined" == this.setting.icon) Icon = <StrikethroughOutlined />;
        else if ("UpCircleTwoTone" == this.setting.icon) Icon = <UpCircleTwoTone />;
        else if ("UploadOutlined" == this.setting.icon) Icon = <UploadOutlined />;
        else if ("UpOutlined" == this.setting.icon) Icon = <UpOutlined />;
        else if ("UpSquareFilled" == this.setting.icon) Icon = <UpSquareFilled />;
        else if ("UpSquareOutlined" == this.setting.icon) Icon = <UpSquareOutlined />;
        else if ("UpSquareTwoTone" == this.setting.icon) Icon = <UpSquareTwoTone />;
        else if ("UsbFilled" == this.setting.icon) Icon = <UsbFilled />;
        else if ("UsbOutlined" == this.setting.icon) Icon = <UsbOutlined />;
        else if ("UsbTwoTone" == this.setting.icon) Icon = <UsbTwoTone />;
        else if ("UserAddOutlined" == this.setting.icon) Icon = <UserAddOutlined />;
        else if ("UserDeleteOutlined" == this.setting.icon) Icon = <UserDeleteOutlined />;
        else if ("UsergroupAddOutlined" == this.setting.icon) Icon = <UsergroupAddOutlined />;
        else if ("UsergroupDeleteOutlined" == this.setting.icon) Icon = <UsergroupDeleteOutlined />;
        else if ("UserOutlined" == this.setting.icon) Icon = <UserOutlined />;
        else if ("UserSwitchOutlined" == this.setting.icon) Icon = <UserSwitchOutlined />;
        else if ("VerifiedOutlined" == this.setting.icon) Icon = <VerifiedOutlined />;
        else if ("WeiboSquareFilled" == this.setting.icon) Icon = <WeiboSquareFilled />;
        else if ("WeiboSquareOutlined" == this.setting.icon) Icon = <WeiboSquareOutlined />;
        else if ("WhatsAppOutlined" == this.setting.icon) Icon = <WhatsAppOutlined />;
        else if ("WifiOutlined" == this.setting.icon) Icon = <WifiOutlined />;
        else if ("WindowsFilled" == this.setting.icon) Icon = <WindowsFilled />;
        else if ("WindowsOutlined" == this.setting.icon) Icon = <WindowsOutlined />;
        else if ("WomanOutlined" == this.setting.icon) Icon = <WomanOutlined />;
        else if ("YahooFilled" == this.setting.icon) Icon = <YahooFilled />;
        else if ("YahooOutlined" == this.setting.icon) Icon = <YahooOutlined />;
        else if ("YoutubeFilled" == this.setting.icon) Icon = <YoutubeFilled />;
        else if ("YoutubeOutlined" == this.setting.icon) Icon = <YoutubeOutlined />;
        else if ("YuqueFilled" == this.setting.icon) Icon = <YuqueFilled />;
        else if ("YuqueOutlined" == this.setting.icon) Icon = <YuqueOutlined />;
        else if ("ZhihuCircleFilled" == this.setting.icon) Icon = <ZhihuCircleFilled />;
        else if ("ZhihuOutlined" == this.setting.icon) Icon = <ZhihuOutlined />;
        else if ("ZhihuSquareFilled" == this.setting.icon) Icon = <ZhihuSquareFilled />;
        else if ("ZoomInOutlined" == this.setting.icon) Icon = <ZoomInOutlined />;
        else if ("ZoomOutOutlined" == this.setting.icon) Icon = <ZoomOutOutlined />;


        return <a href={this.setting.url} style={{fontSize:this.setting.fontSize, color:this.setting.fontColor}}>
            {Icon}
            <span className={Icon ? "ml-2" : ""}>{this.setting.text}</span>
        </a>
    }
}