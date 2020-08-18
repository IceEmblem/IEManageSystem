import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEDrawer/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IEDrawer/Data'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEDrawer/Setting'
import { Drawer } from '@ant-design/react-native';
import { Text, View, TouchableHighlight, Image, StyleSheet } from 'react-native'

class IEDrawer extends IComponent {
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

        return (
            <Drawer
                sidebar={
                    <View style={styles.sidebar}>
                        <Text style={styles.title}>{this.data.title}</Text>
                        <Text style={styles.content}>{this.data.content}</Text>
                    </View>
                }
                position="left"
                open={false}
                drawerWidth={setting.boxWidth}
                drawerRef={el => (this.drawer = el)}
                drawerBackgroundColor="#ccc8"
            >
                <TouchableHighlight
                    onPress={() => this.drawer && this.drawer.openDrawer()}
                    activeOpacity={0.1}
                >
                    <Image source={this.data.imgUrl} style={{ height: setting.imgHeight }} />
                </TouchableHighlight>
            </Drawer>
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
        marginBottom: "10px"
    },
    content: {
        color: "#fff"
    }
});

export default (register) => register(IComponent, IEDrawer);
