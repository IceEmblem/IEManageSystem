import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/Data'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/Setting'
import { StyleSheet, Text, View } from 'react-native';
import { Carousel } from '@ant-design/react-native';
import defaultImg from 'images/nofind.jpg'

// 走马灯
class IECarousel extends IComponent {
    constructor(props) {
        super(props);
    }

    createItem(singleData, setting) {
        return (
            <View>
                <View
                    style={{
                        backgroundImage: `url(${singleData.img || defaultImg})`,
                        backgroundSize: "100% auto",
                        backgroundRepeat: "no-repeat",
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{ 
                            height: setting.height, 
                            width: setting.width,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: "30px"
                        }}
                    >
                        <Text style={{ color: setting.fontColor, fontSize: "20px", marginBottom: "10px", fontWeight: 600 }}>{singleData.title}</Text>
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
            <Carousel autoplay>
                {data.getDatas().map(item => this.createItem(item, setting))}
            </Carousel >
        );
    }
}

IECarousel.defaultProps = {
};

export default (register) => register(IComponent, IECarousel);
