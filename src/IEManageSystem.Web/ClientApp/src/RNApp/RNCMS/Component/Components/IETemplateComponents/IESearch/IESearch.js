import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IESearch/IComponent'
import { View, StyleSheet } from 'react-native'
import { Item, Icon, Input } from 'native-base'

class IESearch extends IComponent {
    state = {
        text: ''
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[this.baseStyle, styles.view]}>
                <Item style={[this.baseStyle, styles.view]}>
                    <Icon name="search1" type='AntDesign' />
                    <Input placeholder="Search" />
                </Item>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
    }
})

export default (register) => register(IComponent, IESearch);
