import React from 'react'
import { View } from 'react-native'
import { Button, Icon, Input } from 'native-base'

export default class extends React.Component {
    render() {
        return (
            <View style={{ height: 30, borderRadius: 15, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                <Button transparent>
                    <Icon style={{ color: '#0008' }} name='search' />
                </Button>
                <Input style={{ flexBasis: 150, fontSize: 14 }} placeholder='搜索' />
            </View>
        )
    }
}