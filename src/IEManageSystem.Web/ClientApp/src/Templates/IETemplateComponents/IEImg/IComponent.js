import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Data from './Data'
import Setting from './Setting'

export default class Component extends IComponent{
    getCurrentData(){
        return new Data(this.props.componentData);
    }

    getCurrentSetting(){
        return new Setting(this.getDefaultSetting());
    }

    getImgStyle(){
        let setting = this.getCurrentSetting();

        return { height: setting.imgHeigth, width: setting.imgWidth };
    }

    click = () => {
        let data = new Data(this.props.componentData);

        if(this.props.interactivClick){
            this.props.interactivClick();
            return true;
        }

        if(data.linkUrl && !data.linkUrl.startsWith('http')){

            this.props.history.push(data.linkUrl);

            return true;
        }
    }
}