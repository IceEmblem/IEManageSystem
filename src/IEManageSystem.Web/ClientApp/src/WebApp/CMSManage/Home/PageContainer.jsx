import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

import { pageFetch, pageDataFetch, RootComponentSign, } from 'BaseCMSManage/IEReduxs/Actions'
import Page from './Page'
import ComponentContainerBoxShow from 'CMSManage/Component/ComponentContainerBoxs/ComponentContainerBoxShow'
import ComponentContainerBox from 'BaseCMSManage/ComponentContainerBoxs'
import {PageComponentOSType} from 'BaseCMSManage/Models/Pages/PageComponentModel'

import { IComponentContainerBoxShow } from 'BaseCMSManage/ComponentContainerBoxs'
import IocContainer from 'Core/IocContainer'

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

        this.state = {
            isFetching: false,
        };
    }

    componentWillMount(){
        IocContainer.registerSingleIntances(IComponentContainerBoxShow, HomeComponentContainerBoxShow)
    }

    componentDidMount() {
        this.getPageFetch(this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !nextState.isFetching;
    }

    componentWillUpdate(nextProps) {
        this.getPageFetch(nextProps);
    }

    getPageFetch(props) {
        let waits = [];

        if (!props.page && props.pageName) {
            waits.push(this.props.pageFetch(props.pageName));
        }

        if (!props.pageData && props.pageDataName) {
            waits.push(this.props.pageDataFetch(props.pageName, props.pageDataName));
        }

        if (waits.length > 0) {
            this.setState({ isFetching: true });
            Promise.all(waits).then(() => {
                this.setState({ isFetching: false });
            });
        }
    }

    render() {
        if (!this.props.rootPageComponent) {
            return <div></div>;
        }

        return (
            <Page>
                {
                    this.props.rootPageComponent.pageComponentSigns.map(sign =>
                        <ComponentContainerBox
                            key={sign}
                            sign={sign}
                            pageId={this.props.pageId}
                            pageDataId={this.props.pageDataId}
                            os={this.props.rootPageComponent.os}
                        >
                        </ComponentContainerBox>)
                }
            </Page>
        );
    }
}

PageContainer.propTypes = {
    pageId: PropTypes.number,
    pageDataId: PropTypes.number,
    pageName: PropTypes.string.isRequired,
    pageDataName: PropTypes.string,

    page: PropTypes.object,
    rootPageComponent: PropTypes.object,
    pageFetch: PropTypes.func.isRequired,
    pageDataFetch: PropTypes.func.isRequired,
}

PageContainer.defaultProps = {
    pageName: "Home"
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

    // 获取根组件
    let rootPageComponent = undefined;
    if (state.pageComponents[pageId]) {
        rootPageComponent = state.pageComponents[pageId][PageComponentOSType.Web][RootComponentSign];
    }

    // 获取文章
    let postId = state.pageDataNameToIds[pageDataName];

    return {
        pageId: pageId,
        pageDataId: postId,
        pageName: pageName,
        pageDataName: pageDataName,
        page: state.pages[pageId],
        pageData: state.pageDatas[postId],
        rootPageComponent: rootPageComponent,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageFetch: (name) => {
            return dispatch(pageFetch(name));
        },
        pageDataFetch: (pageName, pageDataName) => {
            return dispatch(pageDataFetch(pageName, pageDataName));
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageContainer)

export default Contain;