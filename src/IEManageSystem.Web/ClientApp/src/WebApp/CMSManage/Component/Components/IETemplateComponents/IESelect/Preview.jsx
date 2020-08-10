import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IESelect/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-选择框</div>
    }
}

export default (register) => register(IPreview, Preview);