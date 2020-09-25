import React from 'react'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

import './index.css'

import {
    pageFetch,
} from 'BaseCMSManage/IEReduxs/Actions'
import { PageComponentOSType } from 'BaseCMSManage/Models/Pages/PageComponentModel'
import RegisterTemplateManager from 'CMSManage/Component/Components/RegisterTemplateManager'

import BtnLists from './BtnLists'


import Page from 'CMSManage/Home/Page'
import { IComponentContainerBoxShow } from 'BaseCMSManage/ComponentContainerBoxs'
import IocContainer from 'Core/IocContainer'

import EditComponentContainerBoxShow from './ComponentContainer/EditComponentContainerBoxShow'
import SignSquareFrame from './ComponentContainer/SignSquareFrame'
import CurrentToolBtns from './ComponentContainer/CurrentToolBtns'

import RootComponentContainerBox from 'BaseCMSManage/RootComponentContainerBox'

import RNPageLayout from 'Adapters/RNPageLayout'

import Hotkey from './Hotkey'
import ClipBoard from './ClipBoard'
import CancelAndReload from './CancelAndReload'

const RNPageRootId = '__PageEditRN__';
const RNPage = (props) => {
    return <div class="phone">
        <div className="phone-cover">
            <div className="phone-light"></div>
            <div className="phone-camera"></div>
            <div className="phone-speaker"></div>
            <div class="phone-screen">
                <div className='h-100'>
                    <RNPageLayout
                        tools={<>
                            <SignSquareFrame
                                color="#13c2c2"
                                currentPageAndPost={props.currentPageAndPost}
                                rootElementId={RNPageRootId}
                            />
                            <CurrentToolBtns
                                currentPageAndPost={props.currentPageAndPost}
                                rootElementId={RNPageRootId}
                            />
                        </>}
                        rootId={RNPageRootId}
                    >
                        <RootComponentContainerBox
                            currentPageAndPost={props.currentPageAndPost}
                        />
                    </RNPageLayout>
                </div>
            </div>
            <div className="phone-homebtn"></div>
        </div>
    </div>
}

const WebPage = (props) => {
    return <>
        <Page>
            <RootComponentContainerBox
                currentPageAndPost={props.currentPageAndPost}
            />
        </Page>
        <SignSquareFrame
            color="#13c2c2"
            currentPageAndPost={props.currentPageAndPost}
        />
        <CurrentToolBtns
            currentPageAndPost={props.currentPageAndPost}
        />
    </>
}

class PageContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        IocContainer.registerSingleIntances(IComponentContainerBoxShow, EditComponentContainerBoxShow)
    }

    componentDidMount() {
        if (this.props.isNeedDataFetch) {
            this.props.pageFetch()
        }
    }

    render() {
        if (this.props.isNeedDataFetch) {
            return <div></div>
        }

        let style = {};
        if (this.props.os == PageComponentOSType.Native) {
            style.width = "400px"
            style.margin = "auto"
        }

        let currentPageAndPost = {
            pageId: this.props.pageId,
            pageDataId: undefined,
            os: this.props.os
        };

        return (
            <div>
                {
                    this.props.os == PageComponentOSType.Native ?
                        <RNPage
                            currentPageAndPost={currentPageAndPost}
                        /> :
                        <WebPage
                            currentPageAndPost={currentPageAndPost}
                        />
                }
                {/* 这是一个 react 插槽，不要随意更改 id */}
                <div id='PageEditPortals'>
                </div>
                <BtnLists
                    currentPageAndPost={currentPageAndPost}
                />
                <div style={{ display: 'flex', position: 'fixed', bottom: 60, left: 40 }}>
                    <CancelAndReload 
                        currentPageAndPost={currentPageAndPost}
                    />
                    <ClipBoard
                        currentPageAndPost={currentPageAndPost}
                    />
                    <Hotkey
                        currentPageAndPost={currentPageAndPost}
                    />
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageName = ownProps.match.params.pageName;
    let os = ownProps.match.params.os || PageComponentOSType.Web;
    RegisterTemplateManager.applyOSComponents(os);

    // pageName 即可能是 id, 也肯是 name
    let pageId = parseInt(pageName);
    if (isNaN(pageId)) {
        // 如果为 NaN，那么 pageName 保存的应该是页面的 name
        pageId = state.pageNameToIds[pageName];
    }

    return {
        isNeedDataFetch: state.pages[pageId] == undefined,
        pageId: pageId,
        os: os
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    let pageName = ownProps.match.params.pageName;

    return {
        pageFetch: () => {
            return dispatch(pageFetch(pageName));
        }
    }
}

const PageContainerContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageContainer)

export default PageContainerContain;