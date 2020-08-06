import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IESearch/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-搜索框</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);