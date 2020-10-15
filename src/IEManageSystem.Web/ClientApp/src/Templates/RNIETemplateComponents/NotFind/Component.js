import React from 'react';
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import { Text } from 'react-native'

class Component extends IComponent{
    render() {
        return <Text style={[this.baseStyle]}>未找到组件，请确保组件存在</Text>;
    }
}

export default Component;
