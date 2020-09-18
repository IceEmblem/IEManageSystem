import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Setting from './Setting'

export default class Component extends IComponent {
    getCurrentSetting(){
        return new Setting(this.getDefaultSetting());
    }

    getListDatas(){
        let listDatas = [];
        this.props.children.tabs.forEach((item, index) => {
            listDatas.push({
                key: index,
                tab: item,
                content: this.props.children.contents.length > index ? this.props.children.contents[index] : undefined
            });
        });

        return listDatas;
    }
}