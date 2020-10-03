import React from 'react';
import IComponent from 'IETemplateComponents/IESearch/IComponent'
import { withRouter } from 'react-router-dom'
import { View, StyleSheet } from 'react-native'
import { Item, Icon, Input, Button, Text } from 'native-base'
import AntIcons from 'BaseCommon/AntIcons'

class Component extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = this.getCurrentSetting();
        let icon = <Button
            type='link'
            style={{alignSelf: 'center'}}
            onClick={this.onClick}
            transparent
        >
            <Text style={{ color: setting.fontColor }}>
                {
                    AntIcons.getIcon('SearchOutlined', { color: setting.fontColor })
                }
            </Text>
        </Button>;

        return (
            <View style={[this.baseStyle, styles.view, { borderWidth: setting.showBorder != 'false' && 1 }]}>
                <Item style={[styles.item]}>
                    {setting.iconPos == 'left' && icon}
                    <Input
                        style={[styles.input, { color: setting.fontColor }]}
                        placeholder="搜索文章"
                        value={this.state.search}
                        onChange={(e) => {
                            this.setState({ search: e.target.value });
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
        width: '100%'
    }
})

export default withRouter(Component);
