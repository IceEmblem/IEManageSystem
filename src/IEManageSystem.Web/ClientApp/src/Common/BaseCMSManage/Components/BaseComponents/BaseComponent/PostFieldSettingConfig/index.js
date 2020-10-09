import React from 'react'
import BaseComponentSettingConfig from '../BaseComponentSettingConfig'
import IocContainer from 'Core/IocContainer'
import { IEPostFieldSetting } from 'BaseCMSManage/Models/Pages/PageComponentSettingModel'

export class IPostFieldConfigComponent extends React.Component { }
IPostFieldConfigComponent.iocKey = Symbol()

export default class PostFieldSettingConfig extends BaseComponentSettingConfig {
    // [{ fieldName: string, displayName: string }]
    // fieldName: 要获取数据的字段的名称，displayName展示名称
    constructor(configs) {
        super(IEPostFieldSetting, "文章自定义数据选择", undefined)

        let PostFieldConfigComponent = IocContainer.getService(IPostFieldConfigComponent)

        this.ConfigComponent = (props) => {
            let {data : pageComponent, setData, ...other} = props;

            return <PostFieldConfigComponent 
                {...other}
                data={pageComponent.getOrCreatePageComponentSetting(this.name)}
                setData={(data)=>{
                    pageComponent.replacePageComponentSetting(this.name, data);
                    setData(pageComponent);
                }}
                configs={configs}
            />
        }
    }
}