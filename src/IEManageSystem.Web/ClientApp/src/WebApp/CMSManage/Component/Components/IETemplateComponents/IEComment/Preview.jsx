import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEComment/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-评论</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);