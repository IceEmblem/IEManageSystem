import React from 'react';
import IComponent from 'IETemplateComponents/IETheme/IComponent'
import { Tabs, Tab, ScrollableTab, Button } from 'native-base'
import { View, TouchableHighlight, StyleSheet, Modal, Text } from 'react-native'
import StyleCheck from 'RNCMS/StyleCheck'
import { Theme, allThemeColors } from 'ice-common'

// 无法使用 native-base 的 Tabs 组件
export default class Component extends IComponent {
    state = {
        isShow: false,
        backgroundColor: '#0000'
    }

    render() {
        let style = StyleCheck.handle(this.getCommonStyleSetting().toStyle());

        return (
            <View style={[this.baseStyle]}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isShow}
                >
                    <TouchableHighlight style={styles.modal}
                        onPress={() => {
                            this.setState({ isShow: false });
                        }}
                        underlayColor="#0000"
                    >
                        <View style={styles.modalColors}>
                            <View style={{ width: '100%' }}><Text style={styles.modalText}>你需要重启程序才能生效</Text></View>
                            {
                                allThemeColors.map(item => {
                                    return <View style={styles.modalColorBox}>
                                        <Button
                                            onPress={() => {
                                                Theme.applyTheme(item.name);
                                                this.props.pageFreshen();
                                            }}
                                            style={{ width: 50, height: 50, backgroundColor: item.color }}
                                        >
                                        </Button>
                                    </View>
                                })
                            }
                            <View style={styles.modalColorBox}>
                                <Button
                                    onPress={() => {
                                        Theme.applyDefault();
                                        this.props.pageFreshen();
                                    }}
                                    primary
                                >
                                    <Text style={{color: '#fff', textAlign: 'center'}}>跟随系统</Text>
                                </Button>
                            </View>
                        </View>
                    </TouchableHighlight>
                </Modal>
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
                            <Button primary style={style} block><Text style={styles.text}>主题</Text></Button>
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
    modal: { 
        width: '100%', 
        height: '100%', 
        justifyContent: 'center' 
    },
    modalColors: { 
        width: '100%', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center' 
    },
    modalText: { 
        backgroundColor: '#0004', 
        color: '#fff', 
        textAlign: 'center', 
        padding: 10 
    },
    modalColorBox: {
        width: 50, 
        height: 50, 
        margin: 10
    }
})