import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IELink/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-链接</div>
    }
}

export default (register) => register(IPreview, Preview);