import React from 'react'
import {IInvalidOSComponent} from 'BaseCMSManage/Components/ComponentFactory'

export default class extends IInvalidOSComponent{
    render(){
        return <div>
            该组件不适用于当前平台
        </div>
    }
}