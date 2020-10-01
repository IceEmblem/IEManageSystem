import Template from 'BaseCMSManage/Components/Template'
import TemplatePage from 'BaseCMSManage/Components/TemplatePage'

// 导出的页面
import Home from './Home.json'
import PostList from './PostList.json'
import Post from './Post.json'
import Chart from './Chart.json'
import Tencent from './Tencent.json'
import WBolt from './WBolt.json'

export default (componentDescribes) => {
    const template = new Template();
    template.name = "IETemplate";
    template.displayName = "IE-模板";
    template.describe = "IE的模板库";
    template.company = "IceEmblem";
    template.templatePages.push(new TemplatePage(Home));
    template.templatePages.push(new TemplatePage(PostList));
    template.templatePages.push(new TemplatePage(Post));
    template.templatePages.push(new TemplatePage(Chart));
    template.templatePages.push(new TemplatePage(Tencent));
    template.templatePages.push(new TemplatePage(WBolt));
    template.componentDescribes = componentDescribes;

    return template;
}