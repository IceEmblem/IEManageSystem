import React from 'react'
import {View} from 'react-native'

export default (props) => (
    <View
        style={props.style}
        {...props.propsEX}
    >
        {props.children}
        {props.ToolBtn}
    </View>
);