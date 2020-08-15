import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEImg/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IEImg/Data'
import { View, Text, Image } from 'react-native'

class IEImg extends IComponent {
    render() {
        let data = new Data(this.props.componentData);

        return <View>
            <Image source={data.imgUrl} style={{height: data.imgHeigth}} />
            <Text style={{textAlign: "center", lineHeight: '40px'}}>{data.text}</Text>
        </View>
    }
}

export default (register) => register(IComponent, IEImg);
