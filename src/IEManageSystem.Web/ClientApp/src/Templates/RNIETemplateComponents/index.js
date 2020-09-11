// 注册各个模板所需的部件
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
import IEMenu from "./IEMenu"
import IEPlaceholder from './IEPlaceholder'
import IEPostContent from "./IEPostContent"
import IEPostDescribe from "./IEPostDescribe"
import IEPostList from "./IEPostList"
import IEPostTitle from "./IEPostTitle"
import IERankingList from "./IERankingList"
import IESearch from "./IESearch"
import NotFind from "./NotFind"
import RichTextEditor from "./RichTextEditor"
import Text from "./Text"

import TemplateBuilder from 'IETemplateComponents'

const describes = [
    Container,
    IEBottomNav,
    IEButton,
    IECalendar,
    IECard,
    IECarousel,
    IECategoryLabel,
    IEComment,
    IEDrawer,
    IEImg,
    IEInfoGroup,
    IELine,
    IEMenu,
    IEPlaceholder,
    IEPostContent,
    IEPostDescribe,
    IEPostList,
    IEPostTitle,
    IERankingList,
    IESearch,
    NotFind,
    RichTextEditor,
    Text
]

export default TemplateBuilder(describes);