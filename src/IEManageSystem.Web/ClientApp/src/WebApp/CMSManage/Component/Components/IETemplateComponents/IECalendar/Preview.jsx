import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IECalendar/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-日历</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);