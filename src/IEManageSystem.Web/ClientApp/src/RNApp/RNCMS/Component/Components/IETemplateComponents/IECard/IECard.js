import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
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
                    <CardItem style={styles.textArea}>
                        <Text>{data.title}</Text>
                        <Text style={styles.content}>{data.content}</Text>
                    </CardItem>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textArea:{
        flexDirection: 'column'
    },
    content:{
        color: '#0008',
        marginTop: 10
    }
})

export default (register) => register(IComponent, withRouter(IECard));
