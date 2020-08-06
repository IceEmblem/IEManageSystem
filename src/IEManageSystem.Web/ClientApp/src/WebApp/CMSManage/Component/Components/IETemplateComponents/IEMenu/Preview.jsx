import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEMenu/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-菜单</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);