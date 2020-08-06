import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IELogo/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div></div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);