import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEImg/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IEImg/Data'
import { View, Text, Image } from 'react-native'

class IEImg extends IComponent {
    render() {
        let data = new Data(this.props.componentData);

        let height = new Number(data.imgHeigth).valueOf();
        if(isNaN(height)){
            height = 0;
        }

        return <View style={[this.baseStyle]}>
            <Image source={{uri: data.imgUrl}} style={{height: height}} />
            <Text style={{textAlign: "center", lineHeight: 40}}>{data.text}</Text>
        </View>
    }
}

export default (register) => register(IComponent, IEImg);
