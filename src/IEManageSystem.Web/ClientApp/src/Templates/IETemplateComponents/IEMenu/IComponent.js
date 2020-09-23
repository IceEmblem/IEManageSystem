import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Setting from './Setting'

export default class Component extends IComponent{
    getCurrentSetting(){
        return new Setting(this.getDefaultSetting());
    }
}