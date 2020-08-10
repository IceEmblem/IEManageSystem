import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/NotFind/IPreview'

class Preview extends IPreview{
    render(){
        return <div>无效组件</div>
    }
}

export default (register) => register(IPreview, Preview);