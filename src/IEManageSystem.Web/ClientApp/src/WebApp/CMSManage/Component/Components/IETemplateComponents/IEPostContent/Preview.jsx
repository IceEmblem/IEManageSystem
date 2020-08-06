import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEPostContent/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-文章内容</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);