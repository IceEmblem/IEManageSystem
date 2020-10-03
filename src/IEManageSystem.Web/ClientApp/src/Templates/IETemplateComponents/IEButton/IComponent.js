import BaseComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Setting from './Setting'

export default class IComponent extends BaseComponent{
    constructor(props){
        super(props);
        
        this.onClick = this.onClick.bind(this);
    }

    getCurrentSetting(){
        return new Setting(this.getSetting("BtnSetting"));
    }

    onClick(){
        let setting = this.getCurrentSetting();

        if(this.props.interactivClick){
            this.props.interactivClick();
            return true;
        }

        if(!setting.url){
            return true;
        }

        if(!setting.url.startsWith('http')){
            this.props.history.push(setting.url);
            return true;
        }

        return false;
    }

    getText(){
        let setting = this.getCurrentSetting();

        return this.props.interactivText || setting.text;
    }
}