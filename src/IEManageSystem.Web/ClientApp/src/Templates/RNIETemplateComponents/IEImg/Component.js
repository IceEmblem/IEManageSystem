import React from 'react';
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Data from 'IETemplateComponents/IEImg/Data'
import { View, Image, TouchableHighlight } from 'react-native'
import { Text } from 'native-base'
import WebUrl from 'Core/Weburl'
import { Link, withRouter } from 'react-router-native'

class Component extends IComponent {
    render() {
        let data = new Data(this.props.componentData);

        let height = new Number(data.imgHeigth).valueOf();
        if (isNaN(height)) {
            height = 0;
        }

        let width = new Number(data.imgWidth).valueOf();
        if (isNaN(width)) {
            width = '100%';
        }

        return <TouchableHighlight to={data.linkUrl}
            style={[this.baseStyle]}
            onPress={()=>{
                this.props.history.push(data.linkUrl);
            }}
            underlayColor='#0004'
        >
            <View style={{alignItems: 'center'}}>
                <Image source={{ uri: WebUrl.handleWeburl(data.imgUrl) }} style={{ height: height, width: width }} />
                <Text style={{ textAlign: "center", lineHeight: 40 }}>{data.text}</Text>
            </View>
        </TouchableHighlight>
    }
}

export default withRouter(Component);
