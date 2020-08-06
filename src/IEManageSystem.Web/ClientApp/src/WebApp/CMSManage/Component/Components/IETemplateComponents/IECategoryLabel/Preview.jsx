import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IECategoryLabel/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-分类标签</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);