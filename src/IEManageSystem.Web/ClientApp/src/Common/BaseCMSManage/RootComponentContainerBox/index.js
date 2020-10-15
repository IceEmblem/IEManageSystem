import React from 'react'
import PropTypes from 'prop-types'
import ComponentContainerBox from '../ComponentContainerBoxs'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import PageComponentModel from 'BaseCMSManage/Models/Pages/PageComponentModel'
import ComponentContext from '../ComponentContext'
import PageDataModel from 'BaseCMSManage/Models/PageDatas/PageDataModel'
import {Discriminator} from 'BaseCMSManage/Models/Pages/PageModel'
import {withRouter} from 'react-router'
import InteractivConfigFeature, {
    InteractivConfigFeatureClickItem,
    InteractivConfigFeatureTextItem,
    InteractivConfigFeatureUrlItem,
} from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractivConfigFeature'

const pageDataModel = PageDataModel.CreatePageDataModel();

class RootComponentContainerBox extends React.Component {
    getCurrentPageAndPost = () => {
        return {
            os: this.props.os,
            page: this.props.page,
            pageData: this.props.pageData,
            isExistPageData: !!this.props.pageDataId,
            pageComponents: this.props.pageComponents,
            defaultComponentDatas: this.props.defaultComponentDatas,
            contentComponentDatas: this.props.contentComponentDatas || [],
        };
    }

    getInteractivConfigFeature(){
        if(this.props.page.discriminator != Discriminator.post){
            return undefined;
        }

        return new InteractivConfigFeature([
            new InteractivConfigFeatureUrlItem('imgUrl', '图片地址', (data) => (data.imageList.length > 0 && data.imageList[0] ? data.imageList[0] : "/Picture/SheJi/post/post4.jpg")),
            new InteractivConfigFeatureTextItem('postTitle', '文章标题', (data) => data.title),
            new InteractivConfigFeatureTextItem('postDescribe', '文章描述', (data) => data.describe || "暂无简介"),
            new InteractivConfigFeatureTextItem('postScore', '文章评分', (data) => data.score || '0'),
            new InteractivConfigFeatureTextItem('postClick', '文章点击量', (data) => data.click || '0'),
            new InteractivConfigFeatureTextItem('postTime', '文章发表时间', (data) => data.creator && new Date(data.creator.time).toLocaleDateString()),
            new InteractivConfigFeatureClickItem('postLink', '文章点击', (data) => ()=>{
                this.props.history.push(this.props.pageData.createUrl());
            }),
            new InteractivConfigFeatureUrlItem('userHead', '用户头像', (data) => data.creator && data.creator.headSculpture || "/Picture/SheJi/default_avatar.png"),
            new InteractivConfigFeatureTextItem('userName', '用户名称', (data) => data.creator && data.creator.name),
        ], this.props.pageData)
    }

    render() {
        if (!this.props.rootPageComponent) {
            return <></>
        }

        return (
            <ComponentContext.Provider
                value={{
                    // 可交互配置特征
                    interactivConfigFeature: this.getInteractivConfigFeature(),
                    // 页面配置特征
                    pageConfigFeature: undefined,
                }}
            >
                {
                    this.props.rootPageComponent.pageComponentSigns.map(sign => (
                        <ComponentContainerBox
                            key={sign + this.props.rootPageComponent.os}
                            sign={sign}
                            currentPageAndPost={this.getCurrentPageAndPost()}
                        >
                        </ComponentContainerBox>
                    ))
                }
            </ComponentContext.Provider>
        );
    }
}

RootComponentContainerBox.propTypes = {
    rootPageComponent: PropTypes.object.isRequired,
}


const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageName = ownProps.pageName;
    let pageDataId = ownProps.pageDataId;
    let os = ownProps.os;

    return {
        rootPageComponent: state.pageComponents[pageName] && state.pageComponents[pageName][os][PageComponentModel.RootComponentSign],
        page: state.pages[pageName],
        pageData: state.pageDatas[pageDataId] || pageDataModel,
        pageComponents: state.pageComponents[pageName] && state.pageComponents[pageName][os],
        defaultComponentDatas: state.defaultComponentDatas[pageName],
        contentComponentDatas: state.contentComponentDatas[pageDataId],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(RootComponentContainerBox)

export default withRouter(Contain);