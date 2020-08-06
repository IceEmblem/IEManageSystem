import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/Text/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>文本框</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);