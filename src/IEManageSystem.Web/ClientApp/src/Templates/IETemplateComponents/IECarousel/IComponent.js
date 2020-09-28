import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Setting from './Setting'
import Data from './Data'
import defaultImg from 'images/nofind.jpg'

import InteractivConfigFeature, {
    InteractivConfigFeatureTextItem,
    InteractivConfigFeatureUrlItem
} from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractivConfigFeature'

export default class Component extends IComponent{
    getCurrentData(){
        return new Data(this.props.componentData);
    }

    getCurrentSetting(){
        return new Setting(this.getDefaultSetting());
    }

    getInteractivConfigFeature(singleData){
        return new InteractivConfigFeature([
            new InteractivConfigFeatureUrlItem('imgurl', '走马灯-图片Url', (data) => data.img || defaultImg),
            new InteractivConfigFeatureTextItem('title', '走马灯-标题', (data) => data.title),
            new InteractivConfigFeatureTextItem('content', '走马灯-内容', (data) => data.content),
        ], singleData)
    }
}