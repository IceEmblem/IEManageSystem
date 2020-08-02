import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'

import './index.css'

import PageEditCompontContainer from './ComponentContainer'

import {
    pageComponentUpdateFetch,
    pageFetch,
    AddComponentAction,
    RootComponentSign,
} from 'CMSManage/IEReduxs/Actions'

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

        this.exportPage = this.exportPage.bind(this);
        this.submitPage = this.submitPage.bind(this);
        this.addComponent = this.addComponent.bind(this);
    }

    componentDidMount() {
        if (!this.props.page) {
            this.props.pageFetch(this.props.pageName)
        }
    }

    exportPage() {
        if (!this.props.page) {
            return;
        }

        let data = JSON.stringify({
            page: this.props.page,
            pageComponents: this.props.pageComponents,
            defaultComponentDatas: this.props.defaultComponentDatas
        })

        var blob = new Blob([data], { type: 'text/json' }),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a')
        a.download = 'page.json'
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }

    submitPage() {
        this.props.pageComponentUpdateFetch(
            this.props.pageName,
            this.props.pageComponents,
            this.props.defaultComponentDatas
        );
    }

    addComponent(selectedComponentDescribe) {
        if (!selectedComponentDescribe) {
            return;
        }

        let pageComponent = selectedComponentDescribe.createPageComponent(this.state.curParentComponentSign);
        let isAddDefaultComponentData = selectedComponentDescribe.isExistComponentData();

        this.props.addComponent(new AddComponentAction(
            this.props.page.id,
            pageComponent,
            isAddDefaultComponentData
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
                <div className="col-md-12 padding-0 pageedit-page-container-btns">
                    <BtnLists
                        addComponent={() => { this.setState({ curParentComponentSign: RootComponentSign, showComponentListBox: true }) }}
                        pageId={this.props.pageId}
                        submitPage={this.submitPage}
                        exportPage={this.exportPage}
                    />
                </div>
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
    pageComponents: PropTypes.object,
    defaultComponentDatas: PropTypes.object,
    addComponent: PropTypes.func.isRequired,
    pageComponentUpdateFetch: PropTypes.func.isRequired,
    pageFetch: PropTypes.func.isRequired,
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

    return {
        pageName: pageName,
        pageId: pageId,
        page: state.pages[pageId],
        rootPageComponent: rootPageComponent,
        pageComponents: state.pageComponents[pageId],
        defaultComponentDatas: state.defaultComponentDatas[pageId],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addComponent: (addComponentAction) => {
            dispatch(addComponentAction);
        },
        pageComponentUpdateFetch: (name, components, defaultComponentDatas) => {
            dispatch(pageComponentUpdateFetch(name, components, defaultComponentDatas));
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