import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IELine/IPreview'
import PreviewImg from 'BaseCMSManage/Components/IETemplateComponents/IELine/Preview.png'

class Preview extends IPreview{
    render(){
        return <div><img width="100%" height="100%" src={PreviewImg} alt="IE-折线|柱状|条形"/></div>
    }
}

export default (register) => register(IPreview, Preview);