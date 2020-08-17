import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEPostTitle/IComponent'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEPostTitle/Setting'

import {Text} from 'react-native'

class IEPostTitle extends IComponent {
    constructor(props){
        super(props);
    }

    render() {
        let setting = new Setting(this.getSetting("DefaultSetting"));

        let title = this.props.pageData.title || "文章标题";

        let style = { color: setting.fontColor }

        if (setting.textType == "h1") {
            style.fontSize = '27px';
            style.fontWeight = '600'
        }
        else if (setting.textType == "h2") {
            style.fontSize = '24px';
            style.fontWeight = '600'
        }
        else if (setting.textType == "h3") {
            style.fontSize = '21px';
            style.fontWeight = '600'
        }
        else if (setting.textType == "h4") {
            style.fontSize = '18px';
            style.fontWeight = '600'
        }

        return <Text style={style}>{title}</Text>
    }
}

export default (register) => register(IComponent, IEPostTitle);
