import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-走马灯</div>
    }
}

export default (register) => register(IPreview, Preview);