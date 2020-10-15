import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Icon, Input } from 'native-base'
import Camera from 'RNInfrastructure/Camera'

export default class extends React.Component {
    render() {
        return (
            <View style={{ height: 30, borderRadius: 15, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', flexGrow: 1 }}>
                <Button small transparent>
                    <Icon style={{ color: '#0008' }} name='search' />
                </Button>
                <Input style={{ fontSize: 14 }} placeholder='搜索' />
                <Camera
                    btnComponent={(props) => {
                        return <Button small transparent
                            onPress={()=>{
                                props.onPress((picData) => {})
                            }}
                            style={{marginRight: 10}}
                        >
                            <Text><Icon style={{ color: '#0008' }} type='AntDesign' name='minussquareo' /></Text>
                        </Button>
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fontSize: {
        fontSize: 14
    }
})