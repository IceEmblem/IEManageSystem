import React from 'react'
import { List } from 'antd'
import Setting from 'IETemplateComponents/IEInfoGroup/Setting'
import Data from 'IETemplateComponents/IEInfoGroup/Data'
import IComponent from 'IETemplateComponents/IEInfoGroup/IComponent'


class Component extends IComponent {
    createItem(data) {
        let Item = this.props.ChildComponent['item'];
        return Item ?
            <Item
                key={data.key}
                interactivConfigFeature={this.getItemInteractivConfigFeature(data)}
            /> :
            <List.Item key={data.key} style={{ color: data.color }} className="mb-0 pt-2 pb-2" >
                <span>{data.settingField}</span>
                <span>{data.dataField}</span>
            </List.Item>
    }

    createTitle(setting) {
        let Title = this.props.ChildComponent['title'];
        return Title ?
            <Title
                interactivConfigFeature={this.getTitleInteractivConfigFeature(setting)}
            /> :
            setting.title ?
                <div style={{ color: setting.color }}>{setting.title}</div> :
                undefined
    }

    render() {
        let setting = this.getCurrentSetting();
        let itemDatas = this.getItemDatas();

        return <List
            bordered={setting.bordered}
            grid={{ column: setting.col }}
            header={this.createTitle(setting)}
            dataSource={itemDatas}
            renderItem={item => this.createItem(item)}
        />
    }
}

export default Component;
