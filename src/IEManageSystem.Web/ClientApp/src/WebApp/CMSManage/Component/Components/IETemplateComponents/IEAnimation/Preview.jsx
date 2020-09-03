import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEAnimation/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-动画组件</div>
    }
}

export default (register) => register(IPreview, Preview);