import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'

import './index.css'

import { pageFetch, pageDataFetch, componentDataUpdateFetch, RootComponentSign, } from 'CMSManage/IEReduxs/Actions'
import PostEditComponentContainer from 'CMSManage/Component/ComponentContainers/PostEditComponentContainer'

import { Button } from 'antd';
import { CloudUploadOutlined, UndoOutlined } from '@ant-design/icons'

import Page from 'CMSManage/Home/Page'

class ComponentData extends React.Component {
    constructor(props) {
        super(props);

        if (!this.props.page) {
            this.props.pageFetch(this.props.pageName);
            this.props.pageDataFetch(this.props.pageName, this.props.pageDataName)
        }
        else if (!this.props.pageData) {
            this.props.pageDataFetch(this.props.pageName, this.props.pageDataName)
        }
    }

    render() {
        if (!this.props.rootPageComponent) {
            return (<div className="postedit-page-container"></div>);
        }

        return (
            <div className="postedit-page-container">
                <div className="postedit-page-container-header">
                    <Button
                        className="mr-2"
                        icon={<UndoOutlined />}
                        onClick={() => this.props.pageDataFetch(this.props.pageName, this.props.pageDataName)}
                    >
                        取消修改
                    </Button>
                    <Button
                        type="primary"
                        icon={<CloudUploadOutlined />}
                        onClick={() => this.props.componentDataUpdateFetch(this.props.pageName, this.props.pageDataName, this.props.contentComponentDatas)}
                    >
                        提交文章
                    </Button>
                </div>
                <div>
                    <Page>
                        {
                            this.props.rootPageComponent.pageComponentSigns.map(sign =>
                                <PostEditComponentContainer
                                    key={sign}
                                    sign={sign}
                                    pageId={this.props.pageId}
                                    pageDataId={this.props.pageDataId}
                                >
                                </PostEditComponentContainer>)
                        }
                    </Page>
                </div>
            </div>
        );
    }
}

ComponentData.propTypes = {
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number.isRequired,
    pageName: PropTypes.string.isRequired,
    pageDataName: PropTypes.string.isRequired,
    page: PropTypes.object,
    pageData: PropTypes.object,
    pageFetch: PropTypes.func.isRequired,
    pageDataFetch: PropTypes.func.isRequired,
    componentDataUpdateFetch: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageName = ownProps.match.params.pageName;

    // pageName 即可能是 id, 也肯是 name
    let pageId = parseInt(pageName);
    if (isNaN(pageId)) {
        // 如果为 NaN，那么 pageName 保存的应该是页面的 name
        pageId = state.pageNameToIds[pageName];
    }

    // 获取根组件
    let rootPageComponent = undefined;
    if (state.pageComponents[pageId]) {
        rootPageComponent = state.pageComponents[pageId][RootComponentSign];
    }

    let postName = ownProps.match.params.pageDataName;
    // 获取文章
    let postId = state.pageDataNameToIds[postName];

    return {
        pageId: pageId,
        pageDataId: postId,
        pageName: pageName,
        pageDataName: postName,
        page: state.pages[pageId],
        rootPageComponent: rootPageComponent,
        pageData: state.pageDatas[postId],
        contentComponentDatas: state.contentComponentDatas[postId],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageFetch: (name) => {
            return dispatch(pageFetch(name));
        },
        pageDataFetch: (pageName, pageDataName) => {
            return dispatch(pageDataFetch(pageName, pageDataName));
        },
        componentDataUpdateFetch: (pageName, pageDataName, componentDatas) => {
            return dispatch(componentDataUpdateFetch(pageName, pageDataName, componentDatas));
        }
    }
}

const ComponentDataContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ComponentData)

export default ComponentDataContain;