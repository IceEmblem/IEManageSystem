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
import IELink from "./IELink"
import IELogo from "./IELogo"
import IEMenu from "./IEMenu"
import IEPostContent from "./IEPostContent"
import IEPostDescribe from "./IEPostDescribe"
import IEPostList from "./IEPostList"
import IEPostTitle from "./IEPostTitle"
import IERankingList from "./IERankingList"
import IESearch from "./IESearch"
import NotFind from "./NotFind"
import RichTextEditor from "./RichTextEditor"
import Text from "./Text"

export default (register) => {
    Container(register)
    IEBottomNav(register)
    IEButton(register)
    IECalendar(register)
    IECard(register)
    IECarousel(register)
    IECategoryLabel(register)
    IEComment(register)
    IEDrawer(register)
    IEImg(register)
    IEInfoGroup(register)
    IELine(register)
    IELink(register)
    IELogo(register)
    IEMenu(register)
    IEPostContent(register)
    IEPostDescribe(register)
    IEPostList(register)
    IEPostTitle(register)
    IERankingList(register)
    IESearch(register)
    NotFind(register)
    RichTextEditor(register)
    Text(register)
};