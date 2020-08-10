import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IECalendar/IPreview'

class Preview extends IPreview{
    render(){
        return <div>IE-日历</div>
    }
}

export default (register) => register(IPreview, Preview);