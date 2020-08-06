import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEPageSetting/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-页面设置</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);