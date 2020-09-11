import React from 'react';
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import { View, StyleSheet } from 'react-native'
import { Item, Icon, Input } from 'native-base'

class Component extends IComponent {
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

export default Component;
