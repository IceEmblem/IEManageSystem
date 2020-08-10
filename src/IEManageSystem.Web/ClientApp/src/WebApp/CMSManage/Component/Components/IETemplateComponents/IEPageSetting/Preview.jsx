import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEPageSetting/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-页面设置</div>
    }
}

export default (register) => register(IPreview, Preview);