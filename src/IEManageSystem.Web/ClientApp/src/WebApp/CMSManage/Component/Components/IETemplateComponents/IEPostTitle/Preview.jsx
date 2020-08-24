import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEPostTitle/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-文章标题</div>
    }
}

export default (register) => register(IPreview, Preview);