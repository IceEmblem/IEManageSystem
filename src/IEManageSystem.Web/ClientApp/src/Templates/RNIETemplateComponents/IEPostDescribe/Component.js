import React from 'react';
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import { Text } from 'react-native'

class Component extends IComponent {
    render() {
        let title = this.props.pageData.describe || "这里是文章的简短描述";

        return (<Text style={[this.baseStyle]}>{title}</Text>);
    }
}

export default Component;
