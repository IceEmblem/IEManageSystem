import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/RichTextEditor/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>富文本框</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);