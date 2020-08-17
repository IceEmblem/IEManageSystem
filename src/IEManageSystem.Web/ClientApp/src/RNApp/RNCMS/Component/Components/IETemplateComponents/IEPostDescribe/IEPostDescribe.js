import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEPostDescribe/IComponent'
import { Text } from 'react-native'

class IEPostDescribe extends IComponent {
    render() {
        let title = this.props.pageData.describe || "这里是文章的简短描述";

        return (<Text>{title}</Text>);
    }
}

export default (register) => register(IComponent, IEPostDescribe);
