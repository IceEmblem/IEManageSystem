import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IERankingList/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-排行榜</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);