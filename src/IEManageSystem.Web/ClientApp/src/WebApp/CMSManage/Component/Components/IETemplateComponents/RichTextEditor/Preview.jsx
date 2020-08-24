import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/RichTextEditor/IPreview'

class Preview extends IPreview{
    render(){
        return <div>富文本框</div>
    }
}

export default (register) => register(IPreview, Preview);