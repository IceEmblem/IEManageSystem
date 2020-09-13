import BaseComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Setting from './Setting'

export default class IComponent extends BaseComponent{
    getCurrentSetting(){
        return new Setting(this.getSetting("FlexSetting"));
    }
}