import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/NotFind/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>无效组件</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);