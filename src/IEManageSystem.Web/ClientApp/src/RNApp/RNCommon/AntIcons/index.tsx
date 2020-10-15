import React from 'react'
import { Icon } from 'native-base'

const iconsTypes = {
    'GithubOutlined': {name:'github', type:'AntDesign'},
    'AccountBookFilled': {name:'account', type:'MaterialCommunityIcons'},
    'CaretDownOutlined': {name:'caretdown', type:'AntDesign'},
    'CaretLeftFilled': {name:'caretleft', type:'AntDesign'},
    'CaretRightFilled': {name:'caretright', type:'AntDesign'},
    'CaretUpFilled': {name:'caretup', type:'AntDesign'},
    'HighlightTwoTone': {name:'highlighter', type:'FontAwesome5'},
    'HomeFilled': {name:'home', type:'AntDesign'},
    'IdcardOutlined': {name:'idcard', type:'AntDesign'},
    'RollbackOutlined': {name:'back', type:'AntDesign'},
    'SafetyCertificateFilled': {name:'Safety', type:'AntDesign'},
    'StarOutlined': {name:'star', type:'AntDesign'},
    'StepBackwardFilled': {name:'stepbackward', type:'AntDesign'},
    'StepBackwardOutlined': {name:'stepbackward', type:'AntDesign'},
    'StepForwardFilled': {name:'stepforward', type:'AntDesign'},
    'StepForwardOutlined': {name:'stepforward', type:'AntDesign'},
    'StockOutlined': {name:'stocking', type:'MaterialCommunityIcons'},
    'StopOutlined': {name:'stocking', type:'MaterialCommunityIcons'},
    'UploadOutlined': {name:'upload', type:'AntDesign'},
    'UsbFilled': {name:'USB', type:'AntDesign'},
    'UserAddOutlined': {name:'adduser', type:'AntDesign'},
    'UserDeleteOutlined': {name:'deleteuser', type:'AntDesign'},
    'UsergroupAddOutlined': {name:'addusergroup', type:'AntDesign'},
    'UsergroupDeleteOutlined': {name:'deleteusergroup', type:'AntDesign'},
    'UserOutlined': {name:'user', type:'AntDesign'},
    'WeiboSquareFilled': {name:'weibo', type:'AntDesign'},
    'WhatsAppOutlined': {name:'whatsapp', type:'MaterialCommunityIcons'},
    'WifiOutlined': {name:'wifi', type:'AntDesign'},
    'WindowsFilled': {name:'windows', type:'AntDesign'},
    'WomanOutlined': {name:'woman', type:'AntDesign'},
    'ZhihuOutlined': {name:'zhihu', type:'AntDesign'},
    'ZoomInOutlined': {name:'zoom-in', type:'MaterialIcons'},
    'QuestionCircleOutlined': {name:'questioncircle', type:'AntDesign'},
    'SearchOutlined': {name:'search1', type:'AntDesign'},
    'MenuOutlined': {name:'menufold', type:'AntDesign'},
    'MessageFilled': {name:'message1', type:'AntDesign'},
    'EllipsisOutlined': {name:'ellipsis1', type:'AntDesign'},
    'FireOutlined': {name:'fire', type:'FontAwesome'},
    'HeartOutlined': {name:'heart', type:'AntDesign'},
    'PauseOutlined': {name:'pause', type:'AntDesign'},
    'FullscreenOutlined': {name:'fullscreen', type: 'MaterialCommunityIcons'},
    'FullscreenExitOutlined': {name:'fullscreen-exit', type: 'MaterialCommunityIcons'},
    'BgColorsOutlined': {name:'background-color', type: 'Foundation'},
    'MinusSquareOutlined': {name:'minussquareo', type: 'AntDesign'},
    'LeftOutlined': {name:'left', type: 'AntDesign'},
    'RightOutlined': {name:'right', type: 'AntDesign'},
    'UpOutlined': {name:'up', type: 'AntDesign'},
    'DownOutlined': {name:'down', type: 'AntDesign'},
}

var iconComponents = new Map<string, React.Component>();

Object.keys(iconsTypes).forEach(IconsTypeKey=>{
    let IconType = iconsTypes[IconsTypeKey];
    iconComponents[IconsTypeKey] = <Icon name={IconType.name} type={IconType.type} />;
})

export const icons = iconComponents;

export const getIcon = (name: string, style: any) => {
    let IconType = iconsTypes[name];

    if(IconType){
        return <Icon style={style} name={IconType.name} type={IconType.type} />;
    }

    return <Icon style={style} name='questioncircle' type='AntDesign' />;
}