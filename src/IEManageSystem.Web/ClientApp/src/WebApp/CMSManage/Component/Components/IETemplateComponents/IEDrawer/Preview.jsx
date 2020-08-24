import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEDrawer/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-抽屉</div>
    }
}

export default (register) => register(IPreview, Preview);