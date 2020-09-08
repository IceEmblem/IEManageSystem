import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

import './index.css'

import PageEditCompontContainer from './ComponentContainer'

import {
    pageFetch,
} from 'BaseCMSManage/IEReduxs/Actions'
import { PageComponentOSType } from 'BaseCMSManage/Models/Pages/PageComponentModel'
import RegisterTemplateManager from 'CMSManage/Component/Components/RegisterTemplateManager'

import BtnLists from './BtnLists'

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // 要将组件添加到那个父组件下，undefined 表示没有父组件
            curParentComponentSign: undefined,
            showComponentListBox: false,
        }
    }

    componentDidMount() {
        if (!this.props.page) {
            this.props.pageFetch(this.props.pageName)
        }
    }

    render() {
        if (!this.props.page) {
            return <div></div>
        }

        return (
            <div className="w-100 h-100">
                <PageEditCompontContainer
                    pageId={this.props.pageId}
                    os={this.props.os}
                />
                <BtnLists
                    pageId={this.props.pageId}
                    os={this.props.os}
                />
            </div>
        );
    }
}

PageContainer.propTypes = {
    pageName: PropTypes.string.isRequired,
    pageId: PropTypes.number,
    page: PropTypes.object,
    pageFetch: PropTypes.func.isRequired,
    os: PropTypes.string.isRequired,
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
        pageName: pageName,
        pageId: pageId,
        page: state.pages[pageId],
        os: os
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageFetch: (name) => {
            return dispatch(pageFetch(name));
        }
    }
}

const PageContainerContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageContainer)

export default PageContainerContain;