import React from 'react';
import IComponent from 'IETemplateComponents/IEButton/IComponent'
import {AntIcons} from 'ice-common'
import {withRouter} from 'react-router-dom'
import { Button } from 'antd';

class Component extends IComponent {
    render() {
        let setting = this.getCurrentSetting();
        let commonSetting = this.getCommonStyleSetting().toStyle();
        let Icon;
        if(setting.icon){
            Icon = AntIcons.getIcon(setting.icon);
        }

        return (
        <Button 
            icon={Icon}
            style={{...this.baseStyle, backgroundColor: setting.bgcolor, color: setting.color, fontSize: setting.fontSize, height: setting.btnHeight, ...commonSetting}} 
            shape={setting.shape} 
            type={setting.btnType} 
            size={setting.size}
            onClick={()=>{
                if(!this.onClick()){
                    document.location.href = setting.url;
                }
            }}
        >
            {this.props.interactivText || setting.text}
        </Button>
        );
    }
}

export default withRouter(Component);