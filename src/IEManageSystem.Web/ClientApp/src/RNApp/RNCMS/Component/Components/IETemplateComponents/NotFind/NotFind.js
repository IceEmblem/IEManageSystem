import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/NotFind/IComponent'
import { Text } from 'react-native'

class NotFind extends IComponent{
    render() {
        return <Text>组件已失效</Text>;
    }
}

export default (register) => register(IComponent, NotFind);
