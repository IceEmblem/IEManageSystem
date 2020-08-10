import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IERate/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-文章评分</div>
    }
}

export default (register) => register(IPreview, Preview);