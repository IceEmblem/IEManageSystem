import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IELink/IComponent'
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
        else if ("CaretDownOutlined" == setting.icon) Icon = <CaretDownOutlined />;
        else if ("CaretLeftFilled" == setting.icon) Icon = <CaretLeftFilled />;
        else if ("CaretRightFilled" == setting.icon) Icon = <CaretRightFilled />;
        else if ("CaretUpFilled" == setting.icon) Icon = <CaretUpFilled />;
        else if ("HighlightTwoTone" == setting.icon) Icon = <HighlightTwoTone />;
        else if ("HomeFilled" == setting.icon) Icon = <HomeFilled />;
        else if ("IdcardOutlined" == setting.icon) Icon = <IdcardOutlined />;
        else if ("RollbackOutlined" == setting.icon) Icon = <RollbackOutlined />;
        else if ("SafetyCertificateFilled" == setting.icon) Icon = <SafetyCertificateFilled />;
        else if ("StarTwoTone" == setting.icon) Icon = <StarTwoTone />;
        else if ("StepBackwardFilled" == setting.icon) Icon = <StepBackwardFilled />;
        else if ("StepBackwardOutlined" == setting.icon) Icon = <StepBackwardOutlined />;
        else if ("StepForwardFilled" == setting.icon) Icon = <StepForwardFilled />;
        else if ("StepForwardOutlined" == setting.icon) Icon = <StepForwardOutlined />;
        else if ("StockOutlined" == setting.icon) Icon = <StockOutlined />;
        else if ("StopOutlined" == setting.icon) Icon = <StopOutlined />;
        else if ("UploadOutlined" == setting.icon) Icon = <UploadOutlined />;
        else if ("UsbFilled" == setting.icon) Icon = <UsbFilled />;
        else if ("UserAddOutlined" == setting.icon) Icon = <UserAddOutlined />;
        else if ("UserDeleteOutlined" == setting.icon) Icon = <UserDeleteOutlined />;
        else if ("UsergroupAddOutlined" == setting.icon) Icon = <UsergroupAddOutlined />;
        else if ("UsergroupDeleteOutlined" == setting.icon) Icon = <UsergroupDeleteOutlined />;
        else if ("UserOutlined" == setting.icon) Icon = <UserOutlined />;
        else if ("WeiboSquareFilled" == setting.icon) Icon = <WeiboSquareFilled />;
        else if ("WhatsAppOutlined" == setting.icon) Icon = <WhatsAppOutlined />;
        else if ("WifiOutlined" == setting.icon) Icon = <WifiOutlined />;
        else if ("WindowsFilled" == setting.icon) Icon = <WindowsFilled />;
        else if ("WomanOutlined" == setting.icon) Icon = <WomanOutlined />;
        else if ("ZhihuOutlined" == setting.icon) Icon = <ZhihuOutlined />;
        else if ("ZoomInOutlined" == setting.icon) Icon = <ZoomInOutlined />;


        return <a href={setting.url} style={{fontSize:setting.fontSize, color:setting.fontColor}}>
            {Icon}
            <span className={Icon ? "ml-2" : ""}>{setting.text}</span>
        </a>
    }
}

export default (register) => register(IComponent, IELink);
