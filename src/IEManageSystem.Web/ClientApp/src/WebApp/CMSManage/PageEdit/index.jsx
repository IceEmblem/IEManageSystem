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
import {IocContainer} from 'ice-common'

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
                                pageInfos={props.pageInfos}
                                rootElementId={RNPageRootId}
                            />
                            <CurrentToolBtns
                                pageInfos={props.pageInfos}
                                rootElementId={RNPageRootId}
                            />
                        </>}
                        rootId={RNPageRootId}
                    >
                        <RootComponentContainerBox
                            pageName={props.pageInfos.pageName}
                            pageDataId={props.pageInfos.pageDataId}
                            os={props.pageInfos.os}
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
                pageName={props.pageInfos.pageName}
                pageDataId={props.pageInfos.pageDataId}
                os={props.pageInfos.os}
            />
        </Page>
        <SignSquareFrame
            color="#13c2c2"
            pageInfos={props.pageInfos}
        />
        <CurrentToolBtns
            pageInfos={props.pageInfos}
        />
    </>
}

class PageContainer extends React.Component {
    state = {
        isFetching: false
    }

    componentWillMount() {
        IocContainer.registerSingleIntances(IComponentContainerBoxShow, EditComponentContainerBoxShow)
    }

    componentDidMount() {
        if (this.props.isNeedDataFetch && !this.state.isFetching) {
            this.setState({ isFetching: true })
            this.props.pageFetch().then(() => {
                this.setState({ isFetching: false });
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isNeedDataFetch && !this.state.isFetching) {
            this.setState({ isFetching: true })
            nextProps.pageFetch().then(() => {
                this.setState({ isFetching: false });
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !nextProps.isNeedDataFetch;
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

        let pageInfos = {
            pageName: this.props.pageName,
            pageDataId: undefined,
            os: this.props.os
        };

        return (
            <div>
                {
                    this.props.os == PageComponentOSType.Native ?
                        <RNPage
                            pageInfos={pageInfos}
                        /> :
                        <WebPage
                            pageInfos={pageInfos}
                        />
                }
                {/* 这是一个 react 插槽，不要随意更改 id */}
                <div id='PageEditPortals'>
                </div>
                <BtnLists
                    pageInfos={pageInfos}
                />
                <div style={{ display: 'flex', position: 'fixed', bottom: 60, left: 40 }}>
                    <CancelAndReload
                        pageInfos={pageInfos}
                    />
                    <ClipBoard
                        pageInfos={pageInfos}
                    />
                    <Hotkey
                        pageInfos={pageInfos}
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

    return {
        isNeedDataFetch: state.pages[pageName] == undefined,
        pageName: pageName,
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