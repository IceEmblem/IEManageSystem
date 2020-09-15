import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Setting from './Setting'
import Data from './Data'
import InteractivConfigFeature, { InteractivConfigFeatureTextItem } from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractivConfigFeature'


export default class Component extends IComponent {
    getCurrentSetting(){
        return new Setting(this.getDefaultSetting());
    }

    getCurrentData(){
        return new Data(this.props.componentData);
    }

    getTitleInteractivConfigFeature(setting){
        let items = [
            new InteractivConfigFeatureTextItem('title', '信息组-标题', (data) => {
                return data.title;
            }),
        ];

        return new InteractivConfigFeature(items, setting);
    }

    getItemInteractivConfigFeature(data){
        let items = [
            new InteractivConfigFeatureTextItem('settingField', '信息组-字段名称', (data) => {
                return data.settingField;
            }),
            new InteractivConfigFeatureTextItem('dataField', '信息组-字段值', (data) => {
                return data.dataField;
            }),
        ];

        return new InteractivConfigFeature(items, data);
    }

    getItemDatas(){
        let setting = this.getCurrentSetting();
        let data = this.getCurrentData();

        let itemDatas = [];
        if (setting.field1)
            itemDatas.push({ key: 'field1', settingField: setting.field1, dataField: data.field1, color: setting.color });
        if (setting.field2)
            itemDatas.push({ key: 'field2', settingField: setting.field2, dataField: data.field2, color: setting.color });
        if (setting.field3)
            itemDatas.push({ key: 'field3', settingField: setting.field3, dataField: data.field3, color: setting.color });
        if (setting.field4)
            itemDatas.push({ key: 'field4', settingField: setting.field4, dataField: data.field4, color: setting.color });
        if (setting.field5)
            itemDatas.push({ key: 'field5', settingField: setting.field5, dataField: data.field5, color: setting.color });

        return itemDatas;
    }
}