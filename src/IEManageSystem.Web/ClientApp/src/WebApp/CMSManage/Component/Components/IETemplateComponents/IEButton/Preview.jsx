import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEButton/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-按钮</div>
    }
}

export default (register) => register(IPreview, Preview);