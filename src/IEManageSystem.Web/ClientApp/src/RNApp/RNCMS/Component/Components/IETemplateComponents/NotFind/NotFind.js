import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/NotFind/IComponent'
import { Text } from 'react-native'

class NotFind extends IComponent{
    render() {
        return <Text style={[this.baseStyle]}>未找到组件，请确保组件存在</Text>;
    }
}

export default (register) => register(IComponent, NotFind);
