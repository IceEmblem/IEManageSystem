import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Data from './Data'
import Setting from './Setting'

export default class Component extends IComponent {
    getCurrentData(){
        return new Data(this.props.componentData);
    }

    getCurrentSetting(){
        return new Setting(this.getDefaultSetting());
    }
}