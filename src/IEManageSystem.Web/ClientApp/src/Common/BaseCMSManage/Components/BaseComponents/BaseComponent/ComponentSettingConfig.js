import React from 'react'
import BaseComponentSettingConfig from './BaseComponentSettingConfig' 
import {DefaultSettingName} from 'BaseCMSManage/Models/Pages/PageComponentSettingModel'

export default class ComponentSettingConfig extends BaseComponentSettingConfig {
    constructor(
        name, 
        displayName, 
        ConfigComponent)
    {
        super();
        
        this.name = name || DefaultSettingName;
        this.displayName = displayName || this.name;
        this.ConfigComponent = (props) => {
            let {data : pageComponent, setData, ...other} = props;

            return <ConfigComponent 
                {...other}
                data={pageComponent.getOrCreatePageComponentSetting(this.name)}
                setData={(data)=>{
                    pageComponent.replacePageComponentSetting(this.name, data);
                    setData(pageComponent);
                }}
            />
        }
    }
}