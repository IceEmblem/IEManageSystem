import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEPlaceholder/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-占位符</div>
    }
}

export default (register) => register(IPreview, Preview);