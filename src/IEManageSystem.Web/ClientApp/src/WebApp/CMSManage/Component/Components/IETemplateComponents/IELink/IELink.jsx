import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IELink/IComponent'
import IocContainer from 'Core/IocContainer';
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

import Setting from 'BaseCMSManage/Components/IETemplateComponents/IELink/Setting'

class IELink extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = new Setting(this.getSetting("Setting"));

        let Icon = undefined;
        if (!setting.icon || setting.icon == "") { }
        else if ("GithubOutlined" == setting.icon) Icon = <GithubOutlined />;
        else if ("AccountBookFilled" == setting.icon) Icon = <AccountBookFilled />;
        else if ("AccountBookOutlined" == setting.icon) Icon = <AccountBookOutlined />;
        else if ("AccountBookTwoTone" == setting.icon) Icon = <AccountBookTwoTone />;
        else if ("AimOutlined" == setting.icon) Icon = <AimOutlined />;
        else if ("AlertFilled" == setting.icon) Icon = <AlertFilled />;
        else if ("CaretDownOutlined" == setting.icon) Icon = <CaretDownOutlined />;
        else if ("CaretLeftFilled" == setting.icon) Icon = <CaretLeftFilled />;
        else if ("CaretLeftOutlined" == setting.icon) Icon = <CaretLeftOutlined />;
        else if ("CaretRightFilled" == setting.icon) Icon = <CaretRightFilled />;
        else if ("CaretRightOutlined" == setting.icon) Icon = <CaretRightOutlined />;
        else if ("CaretUpFilled" == setting.icon) Icon = <CaretUpFilled />;
        else if ("CaretUpOutlined" == setting.icon) Icon = <CaretUpOutlined />;
        else if ("CarFilled" == setting.icon) Icon = <CarFilled />;
        else if ("FastForwardFilled" == setting.icon) Icon = <FastForwardFilled />;
        else if ("FastForwardOutlined" == setting.icon) Icon = <FastForwardOutlined />;
        else if ("FieldBinaryOutlined" == setting.icon) Icon = <FieldBinaryOutlined />;
        else if ("FieldNumberOutlined" == setting.icon) Icon = <FieldNumberOutlined />;
        else if ("FieldStringOutlined" == setting.icon) Icon = <FieldStringOutlined />;
        else if ("FieldTimeOutlined" == setting.icon) Icon = <FieldTimeOutlined />;
        else if ("FileAddFilled" == setting.icon) Icon = <FileAddFilled />;
        else if ("FileAddOutlined" == setting.icon) Icon = <FileAddOutlined />;
        else if ("FileAddTwoTone" == setting.icon) Icon = <FileAddTwoTone />;
        else if ("FileDoneOutlined" == setting.icon) Icon = <FileDoneOutlined />;
        else if ("FileExcelFilled" == setting.icon) Icon = <FileExcelFilled />;
        else if ("HighlightTwoTone" == setting.icon) Icon = <HighlightTwoTone />;
        else if ("HistoryOutlined" == setting.icon) Icon = <HistoryOutlined />;
        else if ("HomeFilled" == setting.icon) Icon = <HomeFilled />;
        else if ("HomeOutlined" == setting.icon) Icon = <HomeOutlined />;
        else if ("HomeTwoTone" == setting.icon) Icon = <HomeTwoTone />;
        else if ("HourglassFilled" == setting.icon) Icon = <HourglassFilled />;
        else if ("HourglassOutlined" == setting.icon) Icon = <HourglassOutlined />;
        else if ("HourglassTwoTone" == setting.icon) Icon = <HourglassTwoTone />;
        else if ("Html5Filled" == setting.icon) Icon = <Html5Filled />;
        else if ("Html5Outlined" == setting.icon) Icon = <Html5Outlined />;
        else if ("Html5TwoTone" == setting.icon) Icon = <Html5TwoTone />;
        else if ("IdcardFilled" == setting.icon) Icon = <IdcardFilled />;
        else if ("IdcardOutlined" == setting.icon) Icon = <IdcardOutlined />;
        else if ("IdcardTwoTone" == setting.icon) Icon = <IdcardTwoTone />;
        else if ("PieChartTwoTone" == setting.icon) Icon = <PieChartTwoTone />;
        else if ("PlayCircleFilled" == setting.icon) Icon = <PlayCircleFilled />;
        else if ("PlayCircleOutlined" == setting.icon) Icon = <PlayCircleOutlined />;
        else if ("RollbackOutlined" == setting.icon) Icon = <RollbackOutlined />;
        else if ("RotateLeftOutlined" == setting.icon) Icon = <RotateLeftOutlined />;
        else if ("RotateRightOutlined" == setting.icon) Icon = <RotateRightOutlined />;
        else if ("SafetyCertificateFilled" == setting.icon) Icon = <SafetyCertificateFilled />;
        else if ("StarTwoTone" == setting.icon) Icon = <StarTwoTone />;
        else if ("StepBackwardFilled" == setting.icon) Icon = <StepBackwardFilled />;
        else if ("StepBackwardOutlined" == setting.icon) Icon = <StepBackwardOutlined />;
        else if ("StepForwardFilled" == setting.icon) Icon = <StepForwardFilled />;
        else if ("StepForwardOutlined" == setting.icon) Icon = <StepForwardOutlined />;
        else if ("StockOutlined" == setting.icon) Icon = <StockOutlined />;
        else if ("StopFilled" == setting.icon) Icon = <StopFilled />;
        else if ("StopOutlined" == setting.icon) Icon = <StopOutlined />;
        else if ("StopTwoTone" == setting.icon) Icon = <StopTwoTone />;
        else if ("StrikethroughOutlined" == setting.icon) Icon = <StrikethroughOutlined />;
        else if ("UpCircleTwoTone" == setting.icon) Icon = <UpCircleTwoTone />;
        else if ("UploadOutlined" == setting.icon) Icon = <UploadOutlined />;
        else if ("UpOutlined" == setting.icon) Icon = <UpOutlined />;
        else if ("UpSquareFilled" == setting.icon) Icon = <UpSquareFilled />;
        else if ("UpSquareOutlined" == setting.icon) Icon = <UpSquareOutlined />;
        else if ("UpSquareTwoTone" == setting.icon) Icon = <UpSquareTwoTone />;
        else if ("UsbFilled" == setting.icon) Icon = <UsbFilled />;
        else if ("UsbOutlined" == setting.icon) Icon = <UsbOutlined />;
        else if ("UsbTwoTone" == setting.icon) Icon = <UsbTwoTone />;
        else if ("UserAddOutlined" == setting.icon) Icon = <UserAddOutlined />;
        else if ("UserDeleteOutlined" == setting.icon) Icon = <UserDeleteOutlined />;
        else if ("UsergroupAddOutlined" == setting.icon) Icon = <UsergroupAddOutlined />;
        else if ("UsergroupDeleteOutlined" == setting.icon) Icon = <UsergroupDeleteOutlined />;
        else if ("UserOutlined" == setting.icon) Icon = <UserOutlined />;
        else if ("UserSwitchOutlined" == setting.icon) Icon = <UserSwitchOutlined />;
        else if ("VerifiedOutlined" == setting.icon) Icon = <VerifiedOutlined />;
        else if ("WeiboSquareFilled" == setting.icon) Icon = <WeiboSquareFilled />;
        else if ("WeiboSquareOutlined" == setting.icon) Icon = <WeiboSquareOutlined />;
        else if ("WhatsAppOutlined" == setting.icon) Icon = <WhatsAppOutlined />;
        else if ("WifiOutlined" == setting.icon) Icon = <WifiOutlined />;
        else if ("WindowsFilled" == setting.icon) Icon = <WindowsFilled />;
        else if ("WindowsOutlined" == setting.icon) Icon = <WindowsOutlined />;
        else if ("WomanOutlined" == setting.icon) Icon = <WomanOutlined />;
        else if ("YahooFilled" == setting.icon) Icon = <YahooFilled />;
        else if ("YahooOutlined" == setting.icon) Icon = <YahooOutlined />;
        else if ("YoutubeFilled" == setting.icon) Icon = <YoutubeFilled />;
        else if ("YoutubeOutlined" == setting.icon) Icon = <YoutubeOutlined />;
        else if ("YuqueFilled" == setting.icon) Icon = <YuqueFilled />;
        else if ("YuqueOutlined" == setting.icon) Icon = <YuqueOutlined />;
        else if ("ZhihuCircleFilled" == setting.icon) Icon = <ZhihuCircleFilled />;
        else if ("ZhihuOutlined" == setting.icon) Icon = <ZhihuOutlined />;
        else if ("ZhihuSquareFilled" == setting.icon) Icon = <ZhihuSquareFilled />;
        else if ("ZoomInOutlined" == setting.icon) Icon = <ZoomInOutlined />;
        else if ("ZoomOutOutlined" == setting.icon) Icon = <ZoomOutOutlined />;


        return <a href={setting.url} style={{fontSize:setting.fontSize, color:setting.fontColor}}>
            {Icon}
            <span className={Icon ? "ml-2" : ""}>{setting.text}</span>
        </a>
    }
}

IocContainer.registerSingleIntances(IComponent, IELink);
