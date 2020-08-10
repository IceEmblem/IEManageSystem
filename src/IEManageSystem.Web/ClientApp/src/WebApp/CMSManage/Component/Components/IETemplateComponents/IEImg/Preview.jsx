import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEImg/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-图片</div>
    }
}

export default (register) => register(IPreview, Preview);