import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IESearch/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-搜索框</div>
    }
}

export default (register) => register(IPreview, Preview);