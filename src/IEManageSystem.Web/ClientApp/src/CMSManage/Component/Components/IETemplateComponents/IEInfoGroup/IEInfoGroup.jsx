import React from 'react'
import { BaseContentLeafComponent } from '../../BaseComponents/BaseContentLeafComponent'

import { List } from 'antd'
import Setting from './Setting'
import Data from './Data'

export default class IEInfoGroup extends BaseContentLeafComponent {
    getPageComponentSetting() {
        return this.props.pageComponentSettings.find(e => e.name == "DefaultSetting");
    }

    createItem(settingField, dataField) {
        return <List.Item>
            <span>{settingField}</span>
            <span>{dataField}</span>
        </List.Item>
    }

    render() {
        let setting = new Setting(this.getPageComponentSetting());
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
            grid={{ column: setting.col }}
            header={setting.title}
            dataSource={itemDatas}
            renderItem={item => this.createItem(item.settingField, item.dataField)}
        />

        return <div>
            {setting.field1 && this.createItem(setting.field1, data.field1)}
            {setting.field2 && this.createItem(setting.field2, data.field2)}
            {setting.field3 && this.createItem(setting.field3, data.field3)}
            {setting.field4 && this.createItem(setting.field4, data.field4)}
            {setting.field5 && this.createItem(setting.field5, data.field5)}
        </div>
    }
}