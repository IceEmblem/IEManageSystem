import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEImg/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-图片</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);