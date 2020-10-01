import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

import './index.css'

import { pageFetch, pageDataFetch, componentDataUpdateFetch } from 'BaseCMSManage/IEReduxs/Actions'
import { PageComponentOSType } from 'BaseCMSManage/Models/Pages/PageComponentModel'

import { Button } from 'antd';
import { CloudUploadOutlined, UndoOutlined } from '@ant-design/icons'

import Page from 'CMSManage/Home/Page'
import ToolBtns from './ToolBtns'

import { IComponentContainerBoxShow } from 'BaseCMSManage/ComponentContainerBoxs'
import IocContainer from 'Core/IocContainer'

import RootComponentContainerBox from 'BaseCMSManage/RootComponentContainerBox'
import ComponentContainerBoxShow from 'CMSManage/Component/ComponentContainerBoxs/ComponentContainerBoxShow'

class EditComponentContainerBoxShow extends React.Component {
    render() {
        return <ComponentContainerBoxShow
            style={this.props.style}
            className={this.props.className}
            ToolBtn={
                <ToolBtns
                    sign={this.props.sign}
                    currentPageAndPost={this.props.currentPageAndPost}
                />
            }
        >
            {this.props.children}
        </ComponentContainerBoxShow>
    }
}

class ComponentData extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        if(this.props.isNeedDataFetch){
            this.props.dataFetch();
        }
    }

    componentWillMount() {
        IocContainer.registerSingleIntances(IComponentContainerBoxShow, EditComponentContainerBoxShow)
    }

    render() {
        if (this.props.isNeedDataFetch) {
            return (<></>);
        }

        return (
            <div className="postedit-page-container">
                <div className="postedit-page-container-header">
                    <Button
                        className="mr-2"
                        icon={<UndoOutlined />}
                        onClick={() => this.props.reloadData()}
                    >
                        取消修改
                    </Button>
                    <Button
                        type="primary"
                        icon={<CloudUploadOutlined />}
                        onClick={() => this.props.componentDataUpdateFetch()}
                    >
                        提交文章
                    </Button>
                </div>
                <div>
                    <Page>
                        <RootComponentContainerBox
                            currentPageAndPost={{
                                pageName: this.props.pageName,
                                pageDataId: this.props.pageDataId,
                                os: this.props.os
                            }}
                        />
                    </Page>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageName = ownProps.match.params.pageName;

    let postName = ownProps.match.params.pageDataName;
    // 获取文章
    let postId = state.pageDataNameToIds[postName];

    return {
        // store 没有页面数据
        isExistPage: state.pages[pageName] != undefined,
        // 路由上具有文章名但 store 中没有文章数据
        isExistPageData: state.pageDatas[postId] != undefined,
        pageName: pageName,
        pageDataId: postId,
        contentComponentDatas: state.contentComponentDatas[postId],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageFetch: () => {
            return dispatch(pageFetch(ownProps.match.params.pageName));
        },
        pageDataFetch: () => {
            return dispatch(pageDataFetch(ownProps.match.params.pageName, ownProps.match.params.pageDataName));
        },
        componentDataUpdateFetch: (componentDatas) => {
            return dispatch(componentDataUpdateFetch(
                ownProps.match.params.pageName, 
                ownProps.match.params.pageDataName, 
                componentDatas));
        }
    }
}

const meger = (stateProps, dispatchProps, ownProps) => {
    return {
        pageName: stateProps.pageName,
        pageDataId: stateProps.pageDataId,
        os: PageComponentOSType.Web,
        isNeedDataFetch: !(stateProps.isExistPage && stateProps.isExistPageData),
        dataFetch: () => {
            let waits = [];

            if(!stateProps.isExistPage){
                waits.push(dispatchProps.pageFetch())
            }

            if(!stateProps.isExistPageData){
                waits.push(dispatchProps.pageDataFetch())
            }

            return Promise.all(waits);
        },
        reloadData: () => {
            let waits = [dispatchProps.pageFetch(), dispatchProps.pageDataFetch()];

            return Promise.all(waits);
        },
        componentDataUpdateFetch: () => {
            return dispatchProps.componentDataUpdateFetch(stateProps.contentComponentDatas);
        }
    }
}

const ComponentDataContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
    meger
)(ComponentData)

export default ComponentDataContain;