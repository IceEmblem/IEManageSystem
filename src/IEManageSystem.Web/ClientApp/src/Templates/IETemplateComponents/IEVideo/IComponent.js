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

    getVideoUrl(){
        let data = this.getCurrentData();

        return this.props.videoUrl || this.getPostFieldSetting().getFieldValue("videoUrl", this.props.pageData) || data.url || data.url2;
    }

    getImgUrl(){
        let data = this.getCurrentData();
        return this.props.imgUrl || this.getPostFieldSetting().getFieldValue("imgUrl", this.props.pageData) || data.img;
    }
}