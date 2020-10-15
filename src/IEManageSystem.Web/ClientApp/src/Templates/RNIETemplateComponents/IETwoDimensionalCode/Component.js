import React from 'react';
import IComponent from 'IETemplateComponents/IETwoDimensionalCode/IComponent'
import { Button } from 'native-base'
import { View, StyleSheet, Text } from 'react-native'
import StyleCheck from 'RNCMS/StyleCheck'
import Camera from 'RNInfrastructure/Camera'
import {withRouter} from 'react-router-native'
import {AntIcons} from 'ice-common'

class Component extends IComponent {
    state = {
        isShow: false,
        backgroundColor: '#0000'
    }

    render() {
        let style = StyleCheck.handle(this.getCommonStyleSetting().toStyle());

        return (
            <View style={[this.baseStyle]}>
                <Camera 
                    isShow={this.state.isShow}
                    type='TwoCode'
                    callback={(data)=>{
                        if(!data.startsWith("/Page")){
                            return;
                        }
                        this.setState({isShow: false});
                        this.props.history.push(data);
                    }}
                    cancelShow={()=>{
                        this.setState({isShow: false});
                    }}
                />
                <View
                    style={{ width: '100%', backgroundColor: this.state.backgroundColor }}
                    onStartShouldSetResponderCapture={() => {
                        return true;
                    }}
                    onResponderGrant={() => {
                        this.setState({ isShow: true, backgroundColor: '#0002' });
                    }}
                    onResponderRelease={() => {
                        this.setState({ backgroundColor: '#0000' });
                    }}
                >
                    {
                        this.props.children.length >= 1 ?
                            this.props.children[0] :
                            <Button transparent style={style} small><Text>{AntIcons.getIcon("MinusSquareOutlined", {color: "#fff"})}</Text></Button>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
    },
})

export default withRouter(Component);