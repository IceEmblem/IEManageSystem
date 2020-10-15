import React from 'react';
import IComponent from 'IETemplateComponents/IEScrollbar/IComponent'
import { ScrollView, StyleSheet, RefreshControl } from 'react-native'
import StyleCheck from 'RNCMS/StyleCheck'

// 无法使用 native-base 的 Tabs 组件
export default class Component extends IComponent {
    state = {
        refreshing: false
    }

    onRefresh = () => {
        this.setState({ refreshing: true });
        this.props.pageFreshen()
            .then(() => {
                this.setState({ refreshing: false });
            });
    }

    render() {
        let style = StyleCheck.handle(this.getCommonStyleSetting().toStyle());

        return (
            <ScrollView
                style={[this.baseStyle, styles.scrollView, style]}
                refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                }
            >
                {
                    this.props.children
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        height: '100%'
    }
})