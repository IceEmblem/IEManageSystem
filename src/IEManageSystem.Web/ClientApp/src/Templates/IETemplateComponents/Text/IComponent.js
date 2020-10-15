import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Setting from './Setting'
import Data from './Data'

export default class Component extends IComponent {
    getCurrentSetting(){
        return new Setting(this.getSetting("Setting"));
    }

    getCurrentData(){
        return new Data(this.props.componentData);
    }

    getText(){
        let setting = this.getCurrentSetting();

        if(setting.textSource == 'PTitle'){
            return this.props.pageData.title || "文章标题";
        }

        if(setting.textSource == 'PDescribe'){
            return this.props.pageData.describe || "这里是文章的简短描述";
        }

        return this.props.interactivText || this.getCurrentData().text || "什么都没有";
    }
}