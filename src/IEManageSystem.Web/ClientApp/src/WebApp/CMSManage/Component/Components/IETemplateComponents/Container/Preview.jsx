import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/Container/IPreview'

class Preview extends IPreview{
    render(){
        return <div>容器组件</div>
    }
}

export default (register) => register(IPreview, Preview);