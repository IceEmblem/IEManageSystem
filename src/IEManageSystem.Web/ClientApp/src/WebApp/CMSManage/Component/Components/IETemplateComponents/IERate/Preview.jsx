import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IERate/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-文章评分</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);