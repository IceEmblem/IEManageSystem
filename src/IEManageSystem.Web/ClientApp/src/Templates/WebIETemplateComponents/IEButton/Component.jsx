import React from 'react';
import IComponent from 'IETemplateComponents/IEButton/IComponent'
import {getIconType} from 'Common/AntIcons'
import {withRouter} from 'react-router-dom'
import { Button } from 'antd';

class Component extends IComponent {
    render() {
        let setting = this.getCurrentSetting();
        let Icon;
        if(setting.icon){
            let IconType = getIconType(setting.icon);
            Icon = <IconType />
        }

        return (
        <Button 
            icon={Icon}
            style={{backgroundColor: setting.bgcolor, color: setting.color, fontSize: setting.fontSize, height: setting.btnHeight}} 
            shape={setting.shape} 
            type={setting.btnType} 
            size={setting.size}
            onClick={()=>{
                if(this.props.interactivClick){
                    this.props.interactivClick();
                    return;
                }
                if(setting.url.startsWith('http')){
                    window.location.href = setting.url;
                    return;
                }
                this.props.history.push(setting.url);
            }}
        >
            {this.props.interactivText || setting.text}
        </Button>
        );
    }
}

export default withRouter(Component);