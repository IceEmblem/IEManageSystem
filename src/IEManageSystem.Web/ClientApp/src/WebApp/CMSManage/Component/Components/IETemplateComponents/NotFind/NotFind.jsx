import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/NotFind/IComponent'
import IocContainer from 'Core/IocContainer';

class NotFind extends IComponent{
    render() {
        return <div>组件已失效</div>;
    }
}

IocContainer.registerSingleIntances(IComponent, NotFind);
