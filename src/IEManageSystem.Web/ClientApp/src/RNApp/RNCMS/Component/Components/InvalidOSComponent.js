import React from 'react'
import {View, Text} from 'react-native'
import {IInvalidOSComponent} from 'BaseCMSManage/Components/ComponentFactory'

export default class extends IInvalidOSComponent{
    render(){
        return <View>
            <Text>该组件不适用于当前平台</Text>
        </View>
    }
}