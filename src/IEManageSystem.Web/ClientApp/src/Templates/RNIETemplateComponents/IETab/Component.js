import React from 'react';
import IComponent from 'IETemplateComponents/IETab/IComponent'
import { Tabs, Tab, ScrollableTab, Text, Button, getTheme, StyleProvider } from 'native-base'
import { View, TouchableHighlight, StyleSheet } from 'react-native'
import material from 'native-base/src/theme/variables/material'

// 无法使用 native-base 的 Tabs 组件
export default class Component extends IComponent {
    state = {
        indexKey: 0
    }

    creactTabItem(itemData) {
        return <TouchableHighlight
            onPress={() => this.setState({ indexKey: itemData.key })}
            underlayColor='#0004'
        >
            <View style={[styles.tabItem, itemData.key == this.state.indexKey && styles.tabItemActive]}>
                {itemData.tab}
            </View>
        </TouchableHighlight>
    }

    render() {
        let listDatas = this.getListDatas();

        // material.brandPrimary = '#0008';

        // return (
        //     <View>
        //     <StyleProvider style={getTheme(material)}>
        //         <Button primary><Text>aaaa</Text></Button>
        //     </StyleProvider>
        //     <Button primary><Text>aaaa</Text></Button>
        //     </View>
        // )

        return (
            <View style={[this.baseStyle]}>
                {
                    listDatas.length > 0 &&
                    <>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                listDatas.map(item => this.creactTabItem(item))
                            }
                        </View>
                        <View>
                            {
                                listDatas[this.state.indexKey].content
                            }
                        </View>
                    </>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabItem: {
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#0000'
    },
    tabItemActive: {
        borderBottomColor: '#0008'
    }
})