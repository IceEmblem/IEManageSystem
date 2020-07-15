import Template from '../Template'
import TemplatePage from '../TemplatePage'
import Home from './Home.json'
import PostList from './PostList.json'
import Post from './Post.json'
import Chart from './Chart.json'

const template = new Template();
template.name = "IETemplate";
template.displayName = "IE-模板";
template.describe = "IE的模板库";
template.company = "IceEmblem";
template.templatePages.push(new TemplatePage(Home));
template.templatePages.push(new TemplatePage(PostList));
template.templatePages.push(new TemplatePage(Post));
template.templatePages.push(new TemplatePage(Chart));

export default template;