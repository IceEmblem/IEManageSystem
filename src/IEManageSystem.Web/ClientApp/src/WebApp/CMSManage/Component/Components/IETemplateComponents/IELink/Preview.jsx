import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IELink/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-链接</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);