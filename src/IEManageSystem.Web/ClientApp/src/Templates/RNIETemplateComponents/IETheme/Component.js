import React from 'react';
import IComponent from 'IETemplateComponents/IETheme/IComponent'
import { Tabs, Tab, ScrollableTab, Text, Button } from 'native-base'
import { View, TouchableHighlight, StyleSheet, Animated, Platform, UIManager } from 'react-native'
import Theme from 'BaseLayout/Theme'

// 无法使用 native-base 的 Tabs 组件
export default class Component extends IComponent {
    render() {
        return (
            <View style={[this.baseStyle]}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})