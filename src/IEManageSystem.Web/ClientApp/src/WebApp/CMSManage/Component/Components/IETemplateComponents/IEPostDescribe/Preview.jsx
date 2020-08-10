import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEPostDescribe/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-文章描述</div>
    }
}

export default (register) => register(IPreview, Preview);