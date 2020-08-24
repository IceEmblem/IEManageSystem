import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

import './index.css'

import PageEditCompontContainer from './ComponentContainer'

import {
    pageFetch,
    AddComponentAction,
    RootComponentSign,
} from 'BaseCMSManage/IEReduxs/Actions'
import { PageComponentOSType } from 'BaseCMSManage/Models/Pages/PageComponentModel'
import RegisterTemplateManager from 'CMSManage/Component/Components/RegisterTemplateManager'

import BtnLists from './BtnLists'
import ComponentListBox from "./ComponentListBox"

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // 要将组件添加到那个父组件下，undefined 表示没有父组件
            curParentComponentSign: undefined,
            showComponentListBox: false,
        }

        this.addComponent = this.addComponent.bind(this);
    }

    componentDidMount() {
        if (!this.props.page) {
            this.props.pageFetch(this.props.pageName)
        }
    }

    addComponent(selectedComponentDescribe) {
        if (!selectedComponentDescribe) {
            return;
        }

        let pageComponent = selectedComponentDescribe.createPageComponent(this.state.curParentComponentSign);

        this.props.addComponent(new AddComponentAction(
            this.props.page.id,
            this.props.rootPageComponent.os,
            pageComponent
        ));
    }

    render() {
        if (!this.props.rootPageComponent) {
            return <div></div>
        }

        return (
            <div className="w-100 h-100">
                <PageEditCompontContainer
                    pageId={this.props.pageId}
                    pageDataId={this.props.pageDataId}
                    rootPageComponent={this.props.rootPageComponent}
                    addChildComponent={(curParentComponentSign) => {
                        this.setState({ curParentComponentSign: curParentComponentSign, showComponentListBox: true });
                    }}
                />
                <BtnLists
                    addComponent={() => { this.setState({ curParentComponentSign: RootComponentSign, showComponentListBox: true }) }}
                    pageId={this.props.pageId}
                    os={this.props.rootPageComponent.os}
                />
                <ComponentListBox
                    show={this.state.showComponentListBox}
                    close={() => { this.setState({ showComponentListBox: false }) }}
                    addComponent={this.addComponent}
                />
            </div>
        );
    }
}

PageContainer.propTypes = {
    pageName: PropTypes.string.isRequired,
    pageId: PropTypes.number,
    page: PropTypes.object,
    rootPageComponent: PropTypes.object,
    addComponent: PropTypes.func.isRequired,
    pageFetch: PropTypes.func.isRequired,
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

    // 获取根组件
    let rootPageComponent = undefined;
    if (state.pageComponents[pageId]) {
        rootPageComponent = state.pageComponents[pageId][os][RootComponentSign];
    }

    return {
        pageName: pageName,
        pageId: pageId,
        page: state.pages[pageId],
        rootPageComponent: rootPageComponent,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addComponent: (addComponentAction) => {
            dispatch(addComponentAction);
        },
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