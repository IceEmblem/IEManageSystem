import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/Data'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/Setting'
import { StyleSheet, Text, View, Image } from 'react-native';
import { Carousel } from '@ant-design/react-native';
import defaultImg from 'images/nofind.jpg'

// 走马灯
class IECarousel extends IComponent {
    constructor(props) {
        super(props);
    }

    createItem(singleData, setting) {
        let height = new Number(setting.height).valueOf();
        if(isNaN(height)){
            height = 300;
        }

        let width = new Number(setting.width).valueOf();
        if(isNaN(width)){
            width = 300;
        }

        let source = singleData.img ? {uri: singleData.img} : defaultImg

        return (
            <View>
                <Image 
                    source={source}
                    style={{width: '100%', height: height, position: 'absolute'}}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{ 
                            height: height, 
                            width: width,
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

        return (
            <Carousel style={[this.baseStyle]} autoplay>
                {data.getDatas().map(item => this.createItem(item, setting))}
            </Carousel >
        );
    }
}

IECarousel.defaultProps = {
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
})

export default (register) => register(IComponent, IECarousel);
