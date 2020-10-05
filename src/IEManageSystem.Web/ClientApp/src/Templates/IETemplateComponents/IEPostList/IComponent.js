import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import InteractivConfigFeature, {
    InteractivConfigFeatureClickItem,
    InteractivConfigFeatureTextItem,
    InteractivConfigFeatureUrlItem,
} from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractivConfigFeature'
import Setting from 'IETemplateComponents/IEPostList/Setting'


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
        let creator = data.creator || {};

        return new InteractivConfigFeature([
            new InteractivConfigFeatureUrlItem('imgUrl', '图标地址', (data) => (data.imageList.length > 0 && data.imageList[0] ? data.imageList[0] : "/Picture/SheJi/post/post4.jpg")),
            new InteractivConfigFeatureTextItem('postTitle', '文章标题', (data) => data.title),
            new InteractivConfigFeatureTextItem('postDescribe', '文章描述', (data) => data.describe || "暂无简介"),
            new InteractivConfigFeatureTextItem('postScore', '文章评分', (data) => data.score || '0'),
            new InteractivConfigFeatureTextItem('postClick', '文章点击量', (data) => data.click || '0'),
            new InteractivConfigFeatureTextItem('postTime', '文章发表时间', (data) => new Date(creator.time).toLocaleDateString()),
            new InteractivConfigFeatureClickItem('postLink', '文章点击', (data) => ()=>{
                this.props.history.push(this.props.createUrl(data));
            }),
            new InteractivConfigFeatureUrlItem('userHead', '用户头像', (data) => creator.headSculpture || "/Picture/SheJi/default_avatar.png"),
            new InteractivConfigFeatureTextItem('userName', '用户名称', (data) => creator.name),
        ], data)
    }
}