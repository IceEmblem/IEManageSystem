import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Data from 'IETemplateComponents/IECard/Data'
import { Link, withRouter } from 'react-router-native'

import defaultAvatar from 'images/default_avatar.png'
import { Card, CardItem, Text, H3, Body } from 'native-base'

class Component extends IComponent {
    render() {
        let data = new Data(this.props.componentData);

        return (
            <View style={[this.baseStyle]}>
                <Card>
                    {
                        this.props.children['top'] &&
                        <CardItem header>
                            {
                                this.props.children['top']
                            }
                        </CardItem>
                    }
                    <CardItem button cardBody
                        onPress={() => {
                            this.props.history.push(data.link);
                        }}
                    >
                        <Body>
                            {
                                this.props.children['middle']
                            }
                        </Body>
                    </CardItem>
                    {
                        this.props.children['bottom'] &&
                        <CardItem footer>
                            {
                                this.props.children['bottom']
                            }
                        </CardItem>
                    }
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textArea: {
        flexDirection: 'column'
    },
    content: {
        color: '#0008',
        marginTop: 10
    }
})

export default withRouter(Component);
