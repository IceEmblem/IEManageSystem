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
    QuestionCircleOutlined,
} from '@ant-design/icons';

type IconNameType = 'GithubOutlined' | 'AccountBookFilled' | 'CaretDownOutlined' | 'CaretLeftFilled' | 'CaretRightFilled' | 'CaretUpFilled' | 'HighlightTwoTone' | 'HomeFilled' | 'IdcardOutlined' | 'RollbackOutlined' | 'SafetyCertificateFilled' | 'StarTwoTone' | 'StepBackwardFilled' | 'StepBackwardOutlined' | 'StepForwardFilled' | 'StepForwardOutlined' | 'StockOutlined' | 'StopOutlined' | 'UploadOutlined' | 'UsbFilled' | 'UserAddOutlined' | 'UserDeleteOutlined' | 'UsergroupAddOutlined' | 'UsergroupDeleteOutlined' | 'UserOutlined' | 'WeiboSquareFilled' | 'WhatsAppOutlined' | 'WifiOutlined' | 'WindowsFilled' | 'WomanOutlined' | 'ZhihuOutlined' | 'ZoomInOutlined' | 'QuestionCircleOutlined';
export const icons = {
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
    'StarTwoTone': StarTwoTone,
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
    'QuestionCircleOutlined': QuestionCircleOutlined
}

export function getIconType(name: IconNameType) {
    let iconType = icons[name];
    
    if(iconType){
        return iconType;
    }

    return iconType['QuestionCircleOutlined'];
}