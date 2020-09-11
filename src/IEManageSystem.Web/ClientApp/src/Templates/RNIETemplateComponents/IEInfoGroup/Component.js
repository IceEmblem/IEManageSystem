import React from 'react'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import { View, StyleSheet } from 'react-native'
import Setting from 'IETemplateComponents/IEInfoGroup/Setting'
import Data from 'IETemplateComponents/IEInfoGroup/Data'

import { List, ListItem, Text, Icon, H3 } from 'native-base'

class Component extends IComponent {
    createItem(settingField, dataField, color) {
        return <ListItem>
            <Text style={{ color: color }}>{settingField}</Text>
            <Text style={{ color: color }}>{dataField}</Text>
        </ListItem>
    }

    render() {
        let setting = new Setting(this.getSetting("DefaultSetting"));
        let data = new Data(this.props.componentData);

        let itemDatas = [];
        if (setting.field1)
            itemDatas.push({ settingField: setting.field1, dataField: data.field1 });
        if (setting.field2)
            itemDatas.push({ settingField: setting.field2, dataField: data.field2 });
        if (setting.field3)
            itemDatas.push({ settingField: setting.field3, dataField: data.field3 });
        if (setting.field4)
            itemDatas.push({ settingField: setting.field4, dataField: data.field4 });
        if (setting.field5)
            itemDatas.push({ settingField: setting.field5, dataField: data.field5 });

        return <View style={this.baseStyle}>
            {
                setting.title && 
                <Text style={[styles.itemHeader, {color: setting.color}]}>{setting.title}</Text>
            }
            <List
                style={[{ borderColor: '#0004', borderStyle: 'solid', borderWidth: setting.bordered ? 1 : 0 }]}
            >
                {itemDatas.map(item => this.createItem(item.settingField, item.dataField, setting.color))}
            </List>
        </View>
    }
}

const styles = StyleSheet.create({
    itemHeader: {
        padding: 10,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#0004'
    },
});



export default Component;
