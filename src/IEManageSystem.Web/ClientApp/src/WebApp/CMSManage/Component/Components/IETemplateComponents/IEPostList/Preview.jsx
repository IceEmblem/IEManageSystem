import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEPostList/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-文章列表</div>
    }
}

export default (register) => register(IPreview, Preview);