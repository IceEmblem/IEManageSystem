import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEInfoGroup/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-信息组</div>
    }
}

export default (register) => register(IPreview, Preview);