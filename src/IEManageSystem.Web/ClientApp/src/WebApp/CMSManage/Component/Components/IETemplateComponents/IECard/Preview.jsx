import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IECard/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-卡片</div>
    }
}

export default (register) => register(IPreview, Preview);