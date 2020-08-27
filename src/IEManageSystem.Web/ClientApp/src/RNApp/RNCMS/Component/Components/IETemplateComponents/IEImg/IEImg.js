import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEImg/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IEImg/Data'
import { View, Image, TouchableHighlight } from 'react-native'
import { Text } from 'native-base'
import WebUrl from 'Core/Weburl'
import { Link, withRouter } from 'react-router-native'

class IEImg extends IComponent {
    render() {
        let data = new Data(this.props.componentData);

        let height = new Number(data.imgHeigth).valueOf();
        if (isNaN(height)) {
            height = 0;
        }

        return <TouchableHighlight to={data.linkUrl}
            style={[this.baseStyle]}
            onPress={()=>{
                this.props.history.push(data.linkUrl);
            }}
            underlayColor='#0004'
        >
            <View>
                <Image source={{ uri: WebUrl.handleWeburl(data.imgUrl) }} style={{ height: height }} />
                <Text style={{ textAlign: "center", lineHeight: 40 }}>{data.text}</Text>
            </View>
        </TouchableHighlight>
    }
}

export default (register) => register(IComponent, withRouter(IEImg));
