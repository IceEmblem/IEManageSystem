import React from 'react'
import { Icon } from 'native-base'

const iconsTypes = {
    'GithubOutlined': (props) => <Icon {...props} name='github' type='AntDesign' />,
    'AccountBookFilled': (props) => <Icon {...props} name='account' type='MaterialCommunityIcons' />,
    'CaretDownOutlined': (props) => <Icon {...props} name='caretdown' type='AntDesign' />,
    'CaretLeftFilled': (props) => <Icon {...props} name='caretleft' type='AntDesign' />,
    'CaretRightFilled': (props) => <Icon {...props} name='caretright' type='AntDesign' />,
    'CaretUpFilled': (props) => <Icon {...props} name='caretup' type='AntDesign' />,
    'HighlightTwoTone': (props) => <Icon {...props} name='highlighter' type='FontAwesome5' />,
    'HomeFilled': (props) => <Icon {...props} name='home' type='AntDesign' />,
    'IdcardOutlined': (props) => <Icon {...props} name='idcard' type='AntDesign' />,
    'RollbackOutlined': (props) => <Icon {...props} name='back' type='AntDesign' />,
    'SafetyCertificateFilled': (props) => <Icon {...props} name='Safety' type='AntDesign' />,
    'StarTwoTone': (props) => <Icon {...props} name='star' type='AntDesign' />,
    'StepBackwardFilled': (props) => <Icon {...props} name='stepbackward' type='AntDesign' />,
    'StepBackwardOutlined': (props) => <Icon {...props} name='stepbackward' type='AntDesign' />,
    'StepForwardFilled': (props) => <Icon {...props} name='stepforward' type='AntDesign' />,
    'StepForwardOutlined': (props) => <Icon {...props} name='stepforward' type='AntDesign' />,
    'StockOutlined': (props) => <Icon {...props} name='stocking' type='MaterialCommunityIcons' />,
    'StopOutlined': (props) => <Icon {...props} name='stocking' type='MaterialCommunityIcons' />,
    'UploadOutlined': (props) => <Icon {...props} name='upload' type='AntDesign' />,
    'UsbFilled': (props) => <Icon {...props} name='USB' type='AntDesign' />,
    'UserAddOutlined': (props) => <Icon {...props} name='adduser' type='AntDesign' />,
    'UserDeleteOutlined': (props) => <Icon {...props} name='deleteuser' type='AntDesign' />,
    'UsergroupAddOutlined': (props) => <Icon {...props} name='addusergroup' type='AntDesign' />,
    'UsergroupDeleteOutlined': (props) => <Icon {...props} name='deleteusergroup' type='AntDesign' />,
    'UserOutlined': (props) => <Icon {...props} name='user' type='AntDesign' />,
    'WeiboSquareFilled': (props) => <Icon {...props} name='weibo' type='AntDesign' />,
    'WhatsAppOutlined': (props) => <Icon {...props} name='whatsapp' type='MaterialCommunityIcons' />,
    'WifiOutlined': (props) => <Icon {...props} name='wifi' type='AntDesign' />,
    'WindowsFilled': (props) => <Icon {...props} name='windows' type='AntDesign' />,
    'WomanOutlined': (props) => <Icon {...props} name='woman' type='AntDesign' />,
    'ZhihuOutlined': (props) => <Icon {...props} name='zhihu' type='AntDesign' />,
    'ZoomInOutlined': (props) => <Icon {...props} name='zoom-in' type='MaterialIcons' />,
    'QuestionCircleOutlined': (props) => <Icon {...props} name='questioncircle' type='AntDesign' />,
    'SearchOutlined': (props) => <Icon {...props} name='search1' type='AntDesign' />,
    'MenuOutlined': (props) => <Icon {...props} name='menufold' type='AntDesign' />,
    'MessageFilled': (props) => <Icon {...props} name='message1' type='AntDesign' />,
    'EllipsisOutlined': (props) => <Icon {...props} name='ellipsis1' type='AntDesign' />,
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