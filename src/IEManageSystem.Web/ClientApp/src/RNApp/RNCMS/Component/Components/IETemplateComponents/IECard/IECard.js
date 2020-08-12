import React from 'react'
import { View, Text } from 'react-native'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IECard/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IECard/Data'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IECard/Setting'
import { Card } from '@ant-design/react-native';
import { Link } from 'react-router-native'

class IECard extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = new Setting(this.getSetting("DefaultSetting"));
        let data = new Data(this.props.componentData);

        return (
            <Link to={data.link}>
                <Card>
                    <Card.Header
                        style={{ padding: 0, margin: 0 }}
                        thumbStyle={{ width: setting.width, height: setting.height }}
                        thumb={data.imgUrl}
                    />
                    <Card.Body>
                        <View style={{padding: "10px"}}>
                            <Text style={{
                                fontSize: 18,
                                color: "rgba(0, 0, 0, 0.85)",
                                fontWeight: 600,
                                marginBottom: "8px"
                            }}
                            >{data.title}</Text>
                            <Text>{data.content}</Text>
                        </View>
                    </Card.Body>
                </Card>
            </Link>);
    }
}

export default (register) => register(IComponent, IECard);
