import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEPostList/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-文章列表</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);