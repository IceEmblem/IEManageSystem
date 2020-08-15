import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEInfoGroup/IComponent'
import { List } from '@ant-design/react-native'
import { View, Text, StyleSheet } from 'react-native'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEInfoGroup/Setting'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IEInfoGroup/Data'

class IEInfoGroup extends IComponent {
    createItem(settingField, dataField, color) {
        return <List.Item>
            <View style={{ color: color, flexDirection: 'row' }}>
                <Text style={styles.text}>{settingField}</Text>
                <Text style={styles.text}>{dataField}</Text>
            </View>
        </List.Item>
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

        return <List
            style={{borderColor: '#0004', borderStyle: 'solid', borderWidth: setting.bordered ? "1px" : "0px"}}
            bordered={setting.bordered}
            grid={{ column: setting.col }}
            renderHeader={setting.title}
        >
            {itemDatas.map(item => this.createItem(item.settingField, item.dataField, setting.color))}
        </List>
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'inherit'
    }
})

export default (register) => register(IComponent, IEInfoGroup);
