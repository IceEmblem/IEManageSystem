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

        let height = new Number(setting.height).valueOf();
        if (isNaN(height)) {
            height = 0;
        }

        return (
            <View style={[this.baseStyle]}>
                <Link
                    to={data.link}
                >
                    <Card>
                        <Card.Header
                            style={{ padding: 0, margin: 0 }}
                            thumbStyle={{ width: '100%', height: height }}
                            thumb={data.imgUrl}
                        />
                        <Card.Body>
                            <View style={{ padding: 10 }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: "rgba(0, 0, 0, 0.85)",
                                    fontWeight: '600',
                                    marginBottom: 8
                                }}
                                >{data.title}</Text>
                                <Text>{data.content}</Text>
                            </View>
                        </Card.Body>
                    </Card>
                </Link>
            </View>
        );
    }
}

export default (register) => register(IComponent, IECard);
