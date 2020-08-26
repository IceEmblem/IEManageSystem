import React from 'react'
import { View, Image } from 'react-native'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IECard/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IECard/Data'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IECard/Setting'
import { Link, withRouter } from 'react-router-native'

import defaultAvatar from 'images/default_avatar.png'
import { Card, CardItem, Text, H3 } from 'native-base'

class IECard extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = new Setting(this.getSetting("DefaultSetting"));
        let data = new Data(this.props.componentData);

        let height = new Number(setting.height).valueOf();
        if (isNaN(height)) {
            height = 0;
        }

        let source;
        if (data.imgUrl) {
            source = { uri: data.imgUrl }
        }
        else {
            source = defaultAvatar;
        }

        return (
            <View style={[this.baseStyle]}>
                <Card>
                    <CardItem button cardBody
                        onPress={() => {
                            this.props.history.push(data.link);
                        }}
                    >
                        <Image
                            style={{ width: '100%', height: height }}
                            source={source}
                        />
                    </CardItem>
                    <CardItem>
                        <H3>{data.title}</H3>
                    </CardItem>
                    <CardItem>
                        <Text>{data.content}</Text>
                    </CardItem>
                </Card>
            </View>
        );
    }
}

export default (register) => register(IComponent, withRouter(IECard));
