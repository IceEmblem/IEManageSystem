// 注册各个模板所需的部件
import Container from "./Container"
import IEButton from "./IEButton"
import IECalendar from "./IECalendar"
import IECard from "./IECard"
import IECarousel from "./IECarousel"
import IECategoryLabel from "./IECategoryLabel"
import IEComment from "./IEComment"
import IEImg from "./IEImg"
import IEInfoGroup from "./IEInfoGroup"
import IELine from "./IELine"
import IEMenu from "./IEMenu"
import IEPlaceholder from './IEPlaceholder'
import IEPostList from "./IEPostList"
import IERankingList from "./IERankingList"
import IESearch from "./IESearch"
import NotFind from "./NotFind"
import RichTextEditor from "./RichTextEditor"
import Text from "./Text"

import TemplateBuilder from 'IETemplateComponents'

const describes = [
    Container,
    IEButton,
    IECalendar,
    IECard,
    IECarousel,
    IECategoryLabel,
    IEComment,
    IEImg,
    IEInfoGroup,
    IELine,
    IEMenu,
    IEPlaceholder,
    IEPostList,
    IERankingList,
    IESearch,
    NotFind,
    RichTextEditor,
    Text
]

export default TemplateBuilder(describes);