import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IECard/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-卡片</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);