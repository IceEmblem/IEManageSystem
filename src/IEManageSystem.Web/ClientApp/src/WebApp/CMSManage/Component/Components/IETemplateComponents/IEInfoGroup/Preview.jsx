import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEInfoGroup/IPreview'

class Preview extends IPreview{
    render(){
        return <div></div>
    }
}

export default (register) => register(IPreview, Preview);