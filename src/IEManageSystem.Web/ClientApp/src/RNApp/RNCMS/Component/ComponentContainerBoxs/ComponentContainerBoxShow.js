import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    errorShow() {
        return <View>
            <Text>无法展示组件，请确保组件的样式是否正确</Text>
            <Text>错误信息：{
                this.state.error && 
                this.state.error.message && 
                `${this.state.error.message.substr(0, 150)}......`
            }
            </Text>
        </View>
    }

    render() {
        if (this.state.error) {
            return this.errorShow();
        }

        return <View
            style={[styles.container, this.props.style]}
        >
            {this.props.children}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexWrap: 'nowrap'
    }
})