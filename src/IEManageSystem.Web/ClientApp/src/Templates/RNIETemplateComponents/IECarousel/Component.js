import React from 'react'
import IComponent from 'IETemplateComponents/IECarousel/IComponent'
import { StyleSheet, Text, View, Image } from 'react-native';
import defaultImg from 'images/nofind.jpg'

import StyleCheck from 'RNCMS/StyleCheck'
import { DeckSwiper } from 'native-base'

import Weburl from 'Core/Weburl'

// 走马灯
class Component extends IComponent {
    defaultItem(singleData, setting) {
        let source = singleData.img ? { uri: Weburl.handleWeburl(singleData.img) } : defaultImg

        return (
            <View>
                <Image
                    source={source}
                    style={[{ width: '100%' }, StyleCheck.handle({ height: setting.height })]}
                />
                <View
                    style={[
                        {
                            flexDirection: 'row',
                            justifyContent: 'center',
                            position: 'absolute',
                            width: '100%'
                        },
                        StyleCheck.handle({ backgroundColor: setting.shade })]}
                >
                    <View
                        style={[{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: 30
                        },
                        StyleCheck.handle({ height: setting.height, width: setting.width })]}
                    >
                        <Text style={[{ color: setting.fontColor, fontSize: 20, marginBottom: 10, fontWeight: '600' }, StyleCheck.handle({ color: setting.fontColor })]}>{singleData.title}</Text>
                        <Text style={[StyleCheck.handle({ color: setting.fontColor })]}>{singleData.content}</Text>
                    </View>
                </View>
            </View>
        );
    }

    createItem(singleData, setting) {
        return <View>
            {
                this.props.isExitChild ?
                    <this.props.ChildComponent
                        interactivConfigFeature={this.getInteractivConfigFeature(singleData)}
                    />
                    : this.defaultItem(singleData, setting)
            }
        </View>
    }

    render() {
        let data = this.getCurrentData();
        let setting = this.getCurrentSetting();
        let ChildComponents = this.props.children;

        return (
            <View style={[this.baseStyle, StyleCheck.handle({ height: setting.height })]}>
                {
                    ChildComponents.length > 0 ?
                        <DeckSwiper
                            dataSource={ChildComponents}
                            renderItem={item => {
                                return item;
                            }}
                        /> :
                        <DeckSwiper
                            dataSource={data.getDatas()}
                            renderItem={item => {
                                return this.createItem(item, setting)
                            }}
                        />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
})

export default Component;
