import React from 'react'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Data from 'IETemplateComponents/IECarousel/Data'
import Setting from 'IETemplateComponents/IECarousel/Setting'
import { StyleSheet, Text, View, Image } from 'react-native';
import defaultImg from 'images/nofind.jpg'

import StyleCheck from 'RNCMS/StyleCheck'
import { DeckSwiper } from 'native-base'

import Weburl from 'Core/Weburl'

// 走马灯
class Component extends IComponent {
    createItem(singleData, setting) {
        let source = singleData.img ? { uri: Weburl.handleWeburl(singleData.img) } : defaultImg

        return (
            <View>
                <Image
                    source={source}
                    style={{ width: '100%', height: setting.height, position: 'absolute' }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: setting.backgroundColor
                    }}
                >
                    <View
                        style={{
                            height: setting.height,
                            width: setting.width,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: 30
                        }}
                    >
                        <Text style={{ color: setting.fontColor, fontSize: 20, marginBottom: 10, fontWeight: '600' }}>{singleData.title}</Text>
                        <Text style={{ color: setting.fontColor }}>{singleData.content}</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        let data = new Data(this.props.componentData);
        let setting = new Setting(this.getSetting("DefaultSetting"));

        let style = StyleCheck.handle({
            height: setting.height,
            width: setting.width,
            backgroundColor: setting.shade,
            fontColor: setting.fontColor
        });

        if (!style.height) {
            style.height = 300;
        }

        if (!style.width) {
            style.width = 300;
        }

        return (
            <View style={[this.baseStyle, {height: style.height}]}>
                <DeckSwiper
                    dataSource={data.getDatas()}
                    renderItem={item=>{
                        return this.createItem(item, style)
                    }}
                />
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
