import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IECategoryLabel/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-分类标签</div>
    }
}

export default (register) => register(IPreview, Preview);