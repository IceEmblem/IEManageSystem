import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEBottomNav/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-底部导航栏</div>
    }
}

export default (register) => register(IPreview, Preview);