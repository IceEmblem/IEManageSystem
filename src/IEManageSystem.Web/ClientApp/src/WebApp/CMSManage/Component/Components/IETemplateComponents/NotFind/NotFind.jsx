import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/NotFind/IComponent'

class NotFind extends IComponent{
    render() {
        return <div>未找到组件，请确保组件存在</div>;
    }
}

export default (register) => register(IComponent, NotFind);
