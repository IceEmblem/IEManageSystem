import React from 'react'
import { View, StyleSheet } from 'react-native'
import IComponent from 'IETemplateComponents/IEInfoGroup/IComponent'

import { List, ListItem, Text, Icon, H3 } from 'native-base'

class Component extends IComponent {
    createItem(data) {
        let Item = this.props.ChildComponent['item'];
        return Item ?
            <Item
                key={data.key}
                interactivConfigFeature={this.getItemInteractivConfigFeature(data)}
            /> :
            <ListItem key={data.key}>
                <Text style={{ color: data.color }}>{data.settingField}</Text>
                <Text style={{ color: data.color }}>{data.dataField}</Text>
            </ListItem>
    }

    createTitle(setting) {
        let Title = this.props.ChildComponent['title'];
        return Title ?
            <Title
                interactivConfigFeature={this.getTitleInteractivConfigFeature(setting)}
            /> :
            setting.title ?
                <Text style={[styles.itemHeader, { color: setting.color }]}>{setting.title}</Text> :
                undefined
    }

    render() {
        let setting = this.getCurrentSetting();
        let itemDatas = this.getItemDatas();

        return <View style={this.baseStyle}>
            {
                this.createTitle(setting)
            }
            <List
                style={[{ borderColor: '#0004', borderStyle: 'solid', borderWidth: setting.bordered ? 1 : 0 }]}
            >
                {itemDatas.map(item => this.createItem(item))}
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
