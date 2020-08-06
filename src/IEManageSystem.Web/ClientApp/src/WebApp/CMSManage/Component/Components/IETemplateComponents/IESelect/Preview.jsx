import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IESelect/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-选择框</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);