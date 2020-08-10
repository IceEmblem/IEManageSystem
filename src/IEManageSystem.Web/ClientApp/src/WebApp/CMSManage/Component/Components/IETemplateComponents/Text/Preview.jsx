import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/Text/IPreview'

class Preview extends IPreview{
    render(){
        return <div>文本框</div>
    }
}

export default (register) => register(IPreview, Preview);