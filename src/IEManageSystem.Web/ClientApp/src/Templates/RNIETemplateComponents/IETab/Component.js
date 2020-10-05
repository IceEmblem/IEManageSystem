import React from 'react';
import IComponent from 'IETemplateComponents/IETab/IComponent'
import { Tabs, Tab, ScrollableTab, Text, Button } from 'native-base'
import { View, TouchableHighlight, StyleSheet, Animated, Platform, UIManager } from 'react-native'
import Theme from 'BaseLayout/Theme'

// 无法使用 native-base 的 Tabs 组件
export default class Component extends IComponent {
    state = {
        indexKey: 0
    }

    elements = {};
    parentElement = undefined;

    pos = new Animated.Value(0);
    width = new Animated.Value(0);

    creactTabItem(itemData) {
        return <TouchableHighlight
            onPress={() => this.setState({ indexKey: itemData.key })}
            underlayColor='#0004'
            ref={(element) => {
                this.elements[itemData.key] = element
            }}
            style={{ flexShrink: 1, flexGrow: 1 }}
        >
            <View style={[styles.tabItem]} >
                {itemData.tab}
            </View>
        </TouchableHighlight>
    }

    componentDidMount() {
        setTimeout(() => {
            this.execAnimated();
        }, 0);
    }

    componentDidUpdate() {
        this.execAnimated();
    }

    execAnimated() {
        if (Platform.OS == 'web') {
            let currentEle = this.elements[this.state.indexKey];
            if (!currentEle) {
                return;
            }

            Animated.parallel([
                Animated.timing(this.pos, {
                    toValue: currentEle.offsetLeft,
                    duration: 200
                }),
                Animated.timing(this.width, {
                    toValue: currentEle.offsetWidth,
                    duration: 200
                })
            ]).start();
        }
        else {
            if (!this.parentElement) {
                return;
            }

            this.parentElement.measure((pfx, pfy, pwidth, pheight, ppx, ppy) => {
                let currentEle = this.elements[this.state.indexKey];
                if (!currentEle) {
                    return;
                }
                
                currentEle.measure((fx, fy, width, height, px, py) => {
                    Animated.parallel([
                        Animated.timing(this.pos, {
                            toValue: px - ppx,
                            duration: 200
                        }),
                        Animated.timing(this.width, {
                            toValue: width,
                            duration: 200
                        })
                    ]).start();
                })
            })
        }
    }

    render() {
        let listDatas = this.getListDatas();

        return (
            <View style={[this.baseStyle]}>
                {
                    listDatas.length > 0 &&
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
                            ref={e => { this.parentElement = e }}
                            collapsable={false}
                        >
                            {
                                listDatas.map(item => this.creactTabItem(item))
                            }
                        </View>
                        <Animated.View
                            style={{
                                width: this.width,
                                left: this.pos,
                                height: 3,
                                backgroundColor: Theme.primary,
                            }}
                        >
                        </Animated.View>
                        <View style={styles.contents}>
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
        borderBottomWidth: 2,
        borderBottomColor: '#0000',
    },
    contents: {
        marginTop: 15
    }
})