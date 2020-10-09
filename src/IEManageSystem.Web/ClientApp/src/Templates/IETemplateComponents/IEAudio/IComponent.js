import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Data from './Data'

export default class Component extends IComponent {
    getCurrentData(){
        return new Data(this.props.componentData);
    }

    getUrl(){
        let data = this.getCurrentData();
        return this.props.interactivUrl || this.getPostFieldSetting().getFieldValue("audioUrl", this.props.pageData) || data.url || data.url2;
    }
}