import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEPostContent/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-文章内容</div>
    }
}

export default (register) => register(IPreview, Preview);