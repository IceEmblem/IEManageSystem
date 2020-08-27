import React from 'react';
import {View} from 'react-native'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEPlaceholder/IComponent'

class IEPlaceholder extends IComponent{
    render() {
        return <View></View>;
    }
}

export default (register) => register(IComponent, IEPlaceholder);
