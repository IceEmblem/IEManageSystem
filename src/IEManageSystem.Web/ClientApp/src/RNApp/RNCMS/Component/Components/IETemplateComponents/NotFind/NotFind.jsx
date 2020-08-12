import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/NotFind/IComponent'

class NotFind extends IComponent{
    render() {
        return <div>组件已失效</div>;
    }
}

export default (register) => register(IComponent, NotFind);
