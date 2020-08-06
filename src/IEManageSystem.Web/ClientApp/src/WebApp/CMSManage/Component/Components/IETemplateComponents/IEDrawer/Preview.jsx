import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IEDrawer/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-抽屉</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);