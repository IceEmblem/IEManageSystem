import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEInfoGroup/IComponent'
import { List } from 'antd'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEInfoGroup/Setting'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IEInfoGroup/Data'

class IEInfoGroup extends IComponent {
    createItem(settingField, dataField, color) {
        return <List.Item style={{ color: color }} className="mb-0 pt-2 pb-2" >
            <span>{settingField}</span>
            <span>{dataField}</span>
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
            bordered={setting.bordered}
            grid={{ column: setting.col }}
            header={setting.title ? <div style={{ color: setting.color }}>{setting.title}</div> : ""}
            dataSource={itemDatas}
            renderItem={item => this.createItem(item.settingField, item.dataField, setting.color)}
        />
    }
}

export default (register) => register(IComponent, IEInfoGroup);
