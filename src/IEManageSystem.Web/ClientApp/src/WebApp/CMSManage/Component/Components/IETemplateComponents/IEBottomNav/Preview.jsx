import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEBottomNav/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-底部导航栏</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);