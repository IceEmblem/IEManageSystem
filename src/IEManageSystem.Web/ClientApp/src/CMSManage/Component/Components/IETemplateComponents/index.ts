import Template from '../Template'
import TemplatePage from '../TemplatePage'
import HomePage from './HomePage.json'

const template = new Template();
template.name = "IETemplate";
template.displayName = "IE-模板";
template.describe = "IE的模板库";
template.company = "IceEmblem";
template.templatePages.push(new TemplatePage(HomePage));

export default template;