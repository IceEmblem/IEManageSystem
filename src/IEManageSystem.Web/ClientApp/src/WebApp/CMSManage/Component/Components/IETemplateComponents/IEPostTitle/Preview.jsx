import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEPostTitle/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-文章标题</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);