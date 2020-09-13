import React from 'react'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

import { pageFetch, pageDataFetch, setCurrentPageAndPost, } from 'BaseCMSManage/IEReduxs/Actions'
import Page from './Page'
import ComponentContainerBoxShow from 'CMSManage/Component/ComponentContainerBoxs/ComponentContainerBoxShow'
import { PageComponentOSType } from 'BaseCMSManage/Models/Pages/PageComponentModel'

import { IComponentContainerBoxShow } from 'BaseCMSManage/ComponentContainerBoxs'
import IocContainer from 'Core/IocContainer'

import RootComponentContainerBox from 'BaseCMSManage/RootComponentContainerBox'

import RegisterTemplateManager from 'CMSManage/Component/Components/RegisterTemplateManager'

class HomeComponentContainerBoxShow extends React.Component {
    render() {
        return <ComponentContainerBoxShow
            style={this.props.style}
            className={this.props.className}
        >
            {this.props.children}
        </ComponentContainerBoxShow>
    }
}

class PageContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        RegisterTemplateManager.applyOSComponents(this.props.os);
        IocContainer.registerSingleIntances(IComponentContainerBoxShow, HomeComponentContainerBoxShow)
    }

    componentDidMount() {
        this.getPageFetch(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.getPageFetch(nextProps);
    }

    getPageFetch(props) 
    {
        if (props.isNeedDataFetch) {
            props.dataFetch();
        }
    }

    render() {
        return (
            <Page>
                <RootComponentContainerBox 
                    currentPageAndPost={{
                        pageId: this.props.pageId,
                        pageDataId: this.props.pageDataId,
                        os: this.props.os
                    }}
                />
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageName = ownProps.match.params.pageName || "Home";
    let pageDataName = ownProps.match.params.pageDataName;

    // pageName 即可能是 id, 也肯是 name
    let pageId = parseInt(pageName);
    if (isNaN(pageId)) {
        // 如果为 NaN，那么 pageName 保存的应该是页面的 name
        pageId = state.pageNameToIds[pageName];
    }

    // 获取文章
    let postId = state.pageDataNameToIds[pageDataName];

    return {
        // store 没有页面数据
        isExistPage: state.pages[pageId] != undefined,
        // 路由上具有文章名但 store 中没有文章数据
        isExistPageData: !(pageDataName && state.pageDatas[postId] != undefined),
        pageId: pageId,
        pageDataId: postId
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    let pageName = ownProps.match.params.pageName || "Home";
    let pageDataName = ownProps.match.params.pageDataName;

    return {
        pageFetch: () => {
            return dispatch(pageFetch(pageName));
        },
        pageDataFetch: () => {
            if(!pageDataName){
                return Promise.resolve();
            }
            return dispatch(pageDataFetch(pageName, pageDataName));
        },
        setCurrentPageAndPost: (pageId, pageDataId, os) => {
            return dispatch(setCurrentPageAndPost(pageId, pageDataId, os));
        }
    }
}

const megre = (stateProps, dispatchToProps, ownProps) => {
    return {
        isNeedDataFetch: !(stateProps.isExistPage && stateProps.isExistPageData),
        pageId: stateProps.pageId,
        pageDataId: stateProps.pageDataId,
        os: PageComponentOSType.Web,
        dataFetch: () => {
            let waits = [];

            if(!stateProps.isExistPage){
                waits.push(dispatchToProps.pageFetch())
            }

            if(!stateProps.isExistPageData){
                waits.push(dispatchToProps.pageDataFetch())
            }

            return Promise.all(waits);
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
    megre
)(PageContainer)

export default Contain;