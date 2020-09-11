import React from 'react';
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Setting from 'IETemplateComponents/IEPostTitle/Setting'

import {Text} from 'react-native'

class Component extends IComponent {
    constructor(props){
        super(props);
    }

    render() {
        let setting = new Setting(this.getSetting("DefaultSetting"));

        let title = this.props.pageData.title || "文章标题";

        let style = { color: setting.fontColor }

        if (setting.textType == "h1") {
            style.fontSize = 27;
            style.fontWeight = '600'
        }
        else if (setting.textType == "h2") {
            style.fontSize = 24;
            style.fontWeight = '600'
        }
        else if (setting.textType == "h3") {
            style.fontSize = 21;
            style.fontWeight = '600'
        }
        else if (setting.textType == "h4") {
            style.fontSize = 18;
            style.fontWeight = '600'
        }

        return <Text style={[this.baseStyle, style]}>{title}</Text>
    }
}

export default Component;
