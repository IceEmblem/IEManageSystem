import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEPostDescribe/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-文章描述</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);