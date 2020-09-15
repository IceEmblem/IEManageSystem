import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import InteractivConfigFeature, {
    InteractivConfigFeatureClickItem,
    InteractivConfigFeatureTextItem
} from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractivConfigFeature'
import Setting from 'IETemplateComponents/IEPostList/Setting'
import defaultImg from 'images/default_post_img.jpg'


export default class Component extends IComponent{
    getCurrentSetting(){
        return new Setting(this.getDefaultSetting());
    }

    getHeadInteractivConfigFeature(){
        return new InteractivConfigFeature([
            new InteractivConfigFeatureClickItem('sortDate', '排序-发表时间', (data) => () => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Date" }) }),
            new InteractivConfigFeatureClickItem('sortClick', '排序-点击', (data) => () => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Click" }) }),
            new InteractivConfigFeatureClickItem('sortScore', '排序-评分', (data) => () => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Score" }) }),
        ])
    }

    getItemInteractivConfigFeature(data){
        return new InteractivConfigFeature([
            new InteractivConfigFeatureTextItem('imgUrl', '图标地址', (data) => (data.imageList.length > 0 && data.imageList[0] ? data.imageList[0] : defaultImg)),
            new InteractivConfigFeatureTextItem('postTitle', '文章标题', (data) => data.title),
            new InteractivConfigFeatureTextItem('postDescribe', '文章描述', (data) => data.describe || "暂无简介"),
            new InteractivConfigFeatureTextItem('postScore', '文章评分', (data) => data.score || '0'),
            new InteractivConfigFeatureTextItem('postClick', '文章点击量', (data) => data.click),
            new InteractivConfigFeatureTextItem('postTime', '文章发表时间', (data) => new Date(data.creationTime).toLocaleDateString()),
            new InteractivConfigFeatureClickItem('postLink', '文章点击', (data) => ()=>{
                this.props.history.push(this.props.createUrl(data));
            }),
        ], data)
    }
}