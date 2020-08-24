import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IERankingList/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-排行榜</div>
    }
}

export default (register) => register(IPreview, Preview);