import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/Container/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>容器组件</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);