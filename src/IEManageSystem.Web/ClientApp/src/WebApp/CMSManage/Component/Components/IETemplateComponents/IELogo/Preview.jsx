import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IELogo/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-Logo</div>
    }
}

export default (register) => register(IPreview, Preview);