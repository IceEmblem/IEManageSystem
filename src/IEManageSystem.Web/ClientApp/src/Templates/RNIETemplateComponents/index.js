// 注册各个模板所需的部件
import Container from "./Container"
import IEAudio from "./IEAudio"
import IEButton from "./IEButton"
import IECard from "./IECard"
import IECarousel from "./IECarousel"
import IECategoryLabel from "./IECategoryLabel"
import IEComment from "./IEComment"
import IEImg from "./IEImg"
import IEInfoGroup from "./IEInfoGroup"
import IELayout from './IELayout'
import IELine from "./IELine"
import IEMenu from "./IEMenu"
import IEPlaceholder from './IEPlaceholder'
import IEPostList from "./IEPostList"
import IERankingList from "./IERankingList"
import IEScrollbar from './IEScrollbar'
import IESearch from "./IESearch"
import IETab from "./IETab"
import IETheme from './IETheme'
import IEVideo from './IEVideo'
import NotFind from "./NotFind"
import RichTextEditor from "./RichTextEditor"
import Text from "./Text"

import TemplateBuilder from 'IETemplateComponents'

const describes = [
    Container,
    IEAudio,
    IEButton,
    IECard,
    IECarousel,
    IECategoryLabel,
    IEComment,
    IEImg,
    IEInfoGroup,
    IELayout,
    IELine,
    IEMenu,
    IEPlaceholder,
    IEPostList,
    IERankingList,
    IEScrollbar,
    IESearch,
    IETab,
    IETheme,
    IEVideo,
    NotFind,
    RichTextEditor,
    Text
]

export default TemplateBuilder(describes);