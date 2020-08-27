import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEPlaceholder/IComponent'

class IEPlaceholder extends IComponent{
    render() {
        return <></>;
    }
}

export default (register) => register(IComponent, IEPlaceholder);
