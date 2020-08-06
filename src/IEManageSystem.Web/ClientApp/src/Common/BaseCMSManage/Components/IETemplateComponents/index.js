import Template from 'BaseCMSManage/Components/Template'
import TemplatePage from 'BaseCMSManage/Components/TemplatePage'

// 导出的页面
import Home from './Home.json'
import PostList from './PostList.json'
import Post from './Post.json'
import Chart from './Chart.json'

// 导出的组件
import Container from "./Container"
import IEBottomNav from "./IEBottomNav"
import IEButton from "./IEButton"
import IECalendar from "./IECalendar"
import IECard from "./IECard"
import IECarousel from "./IECarousel"
import IECategoryLabel from "./IECategoryLabel"
import IEComment from "./IEComment"
import IEDrawer from "./IEDrawer"
import IEImg from "./IEImg"
import IEInfoGroup from "./IEInfoGroup"
import IELine from "./IELine"
import IELink from "./IELink"
import IELogo from "./IELogo"
import IEMenu from "./IEMenu"
import IEPageSetting from "./IEPageSetting"
import IEPostContent from "./IEPostContent"
import IEPostDescribe from "./IEPostDescribe"
import IEPostList from "./IEPostList"
import IEPostTitle from "./IEPostTitle"
import IERankingList from "./IERankingList"
import IERate from "./IERate"
import IESearch from "./IESearch"
import IESelect from "./IESelect"
import NotFind from "./NotFind"
import RichTextEditor from "./RichTextEditor"
import Text from "./Text"

const template = new Template();
template.name = "IETemplate";
template.displayName = "IE-模板";
template.describe = "IE的模板库";
template.company = "IceEmblem";
template.templatePages.push(new TemplatePage(Home));
template.templatePages.push(new TemplatePage(PostList));
template.templatePages.push(new TemplatePage(Post));
template.templatePages.push(new TemplatePage(Chart));
template.componentBuilders = [
    Container, IEBottomNav, IEButton, IECalendar, IECard, IECarousel, IECategoryLabel, IEComment, IEDrawer, IEImg, IEInfoGroup, IELine, IELink, IELogo, IEMenu, IEPageSetting, IEPostContent, IEPostDescribe, IEPostList, IEPostTitle, IERankingList, IERate, IESearch, IESelect, NotFind, RichTextEditor, Text
]

export default template;