import React from 'react';
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Data from 'IETemplateComponents/IEDrawer/Data'
import Setting from 'IETemplateComponents/IEDrawer/Setting'
import { Drawer } from '@ant-design/react-native';
import { Text, View, TouchableHighlight, Image, StyleSheet } from 'react-native'

class Component extends IComponent {
    state = {
        visible: false
    }

    constructor(props) {
        super(props);

        this.data = new Data(this.props.componentData);
    }

    render() {
        this.data.setData(this.props.componentData);
        let setting = new Setting(this.getSetting("DefaultSetting"));

        let height = new Number(setting.imgHeight).valueOf();
        if (isNaN(height)) {
            height = 300;
        }

        let boxWidth = new Number(setting.boxWidth).valueOf()
        if (isNaN(boxWidth)) {
            boxWidth = 200;
        }

        return (
            <View style={[this.baseStyle]}>
                <Drawer
                    sidebar={
                        <View style={styles.sidebar}>
                            <Text style={styles.title}>{this.data.title}</Text>
                            <Text style={styles.content}>{this.data.content}</Text>
                        </View>
                    }
                    position="left"
                    open={true}
                    drawerWidth={boxWidth}
                    drawerRef={el => (this.drawer = el)}
                    drawerBackgroundColor="#ccc8"
                >
                    <TouchableHighlight
                        onPress={() => this.drawer && this.drawer.openDrawer()}
                        activeOpacity={0.1}
                    >
                        <Image source={{ uri: this.data.imgUrl }} style={{ height: height }} />
                    </TouchableHighlight>
                </Drawer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sidebar: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10
    },
    content: {
        color: "#fff"
    }
});

export default Component;
