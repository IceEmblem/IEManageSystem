import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEComment/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-评论</div>
    }
}

export default (register) => register(IPreview, Preview);