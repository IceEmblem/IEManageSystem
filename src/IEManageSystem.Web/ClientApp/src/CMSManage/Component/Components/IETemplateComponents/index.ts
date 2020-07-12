import Template from '../Template'
import TemplatePage from '../TemplatePage'
import HomePage from './HomePage.json'
import PostList from './PostList.json'
import Post from './Post.json'

const template = new Template();
template.name = "IETemplate";
template.displayName = "IE-模板";
template.describe = "IE的模板库";
template.company = "IceEmblem";
template.templatePages.push(new TemplatePage(HomePage));
template.templatePages.push(new TemplatePage(PostList));
template.templatePages.push(new TemplatePage(Post));

export default template;