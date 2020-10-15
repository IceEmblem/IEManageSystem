import React from 'react';
import IComponent from 'IETemplateComponents/IESearch/IComponent'
import { withRouter } from 'react-router-dom'
import { View, StyleSheet, Text } from 'react-native'
import { Item, Icon, Input, Button  } from 'native-base'
import {AntIcons} from 'ice-common'

class Component extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = this.getCurrentSetting();
        let icon = <Button
            type='link'
            style={{alignSelf: 'center'}}
            onPress={this.onClick}
            transparent
            small
        >
            <Text style={{ color: setting.fontColor, paddingLeft: 10, paddingRight: 10 }}>
                {
                    AntIcons.getIcon('SearchOutlined', { color: setting.fontColor })
                }
            </Text>
        </Button>;

        return (
            <View style={[this.baseStyle, styles.view, { borderWidth: setting.showBorder != false ? 1 : 0 }]}>
                <Item style={[styles.item]}>
                    {setting.iconPos == 'left' && icon}
                    <Input
                        style={[styles.input, { color: setting.fontColor }]}
                        placeholder="搜索文章"
                        value={this.state.search}
                        onChangeText={(text)=>{
                            this.setState({ search: text });
                        }}
                    />
                    {setting.iconPos == 'right' && icon}
                </Item>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        height: '100%'
    },
    item: {
        borderBottomWidth: 0, 
        alignItems: 'center', 
        paddingTop: 0,
        height: '100%',
        width: '100%'
    },
    input: {
        height: 30, 
        fontSize: 15,
        flex: 1,
        width: '100%',
        padding: 0
    }
})

export default withRouter(Component);
