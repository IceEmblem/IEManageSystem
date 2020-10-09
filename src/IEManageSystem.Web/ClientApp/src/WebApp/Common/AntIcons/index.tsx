import React from 'react'
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
    QuestionCircleOutlined,
    SearchOutlined,
    MenuOutlined,
    MessageFilled,
    EllipsisOutlined,
    FireOutlined,
    StarOutlined,
    HeartOutlined,
    PauseOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    BgColorsOutlined,
} from '@ant-design/icons';

const iconsTypes = {
    'GithubOutlined': GithubOutlined,
    'AccountBookFilled': AccountBookFilled,
    'CaretDownOutlined': CaretDownOutlined,
    'CaretLeftFilled': CaretLeftFilled,
    'CaretRightFilled': CaretRightFilled,
    'CaretUpFilled': CaretUpFilled,
    'HighlightTwoTone': HighlightTwoTone,
    'HomeFilled': HomeFilled,
    'IdcardOutlined': IdcardOutlined,
    'RollbackOutlined': RollbackOutlined,
    'SafetyCertificateFilled': SafetyCertificateFilled,
    'StepBackwardFilled': StepBackwardFilled,
    'StepBackwardOutlined': StepBackwardOutlined,
    'StepForwardFilled': StepForwardFilled,
    'StepForwardOutlined': StepForwardOutlined,
    'StockOutlined': StockOutlined,
    'StopOutlined': StopOutlined,
    'UploadOutlined': UploadOutlined,
    'UsbFilled': UsbFilled,
    'UserAddOutlined': UserAddOutlined,
    'UserDeleteOutlined': UserDeleteOutlined,
    'UsergroupAddOutlined': UsergroupAddOutlined,
    'UsergroupDeleteOutlined': UsergroupDeleteOutlined,
    'UserOutlined': UserOutlined,
    'WeiboSquareFilled': WeiboSquareFilled,
    'WhatsAppOutlined': WhatsAppOutlined,
    'WifiOutlined': WifiOutlined,
    'WindowsFilled': WindowsFilled,
    'WomanOutlined': WomanOutlined,
    'ZhihuOutlined': ZhihuOutlined,
    'ZoomInOutlined': ZoomInOutlined,
    'QuestionCircleOutlined': QuestionCircleOutlined,
    'SearchOutlined': SearchOutlined,
    'MenuOutlined': MenuOutlined,
    'MessageFilled': MessageFilled,
    'EllipsisOutlined': EllipsisOutlined,
    'FireOutlined': FireOutlined,
    'StarOutlined': StarOutlined,
    'HeartOutlined': HeartOutlined,
    'PauseOutlined': PauseOutlined,
    'FullscreenOutlined': FullscreenOutlined,
    'FullscreenExitOutlined': FullscreenExitOutlined,
    'BgColorsOutlined': BgColorsOutlined,
}

var iconComponents = new Map<string, React.Component>();

Object.keys(iconsTypes).forEach(IconsTypeKey=>{
    let IconsType = iconsTypes[IconsTypeKey];
    iconComponents[IconsTypeKey] = <IconsType />;
})

export const icons = iconComponents;

export const getIcon = (name: string, style: any) => {
    let IconType = iconsTypes[name];

    if(IconType){
        return <IconType style={style} />
    }

    let QuestionCircleType = iconsTypes['QuestionCircleOutlined'];

    return <QuestionCircleType style={style} />
}