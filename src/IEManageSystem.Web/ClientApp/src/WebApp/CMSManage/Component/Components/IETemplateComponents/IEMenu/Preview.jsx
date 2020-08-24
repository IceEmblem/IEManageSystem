import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEMenu/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-菜单</div>
    }
}

export default (register) => register(IPreview, Preview);