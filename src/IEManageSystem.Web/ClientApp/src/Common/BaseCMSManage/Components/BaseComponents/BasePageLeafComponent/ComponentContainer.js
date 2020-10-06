import React from 'react'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import { withRouter } from 'react-router'
import { ieReduxFetch } from "Core/IEReduxFetch"
import PageDataModel from 'BaseCMSManage/Models/PageDatas/PageDataModel'
import TagModel from 'BaseCMSManage/Models/PageDatas/TagModel'

class PostListContain extends React.Component {
    state = {
        posts: [],
        resourceNum: 0,
        postData: {
            pageName: this.props.pageComponent.pageLeafSetting.pageName,
            pageSize: this.props.pageComponent.pageLeafSetting.pageSize,
            top: this.props.pageComponent.pageLeafSetting.top,
            searchKey: this.props.pageComponent.pageLeafSetting.searchKey,
            orderby: this.props.pageComponent.pageLeafSetting.orderby,
            pageIndex: 1,
        },
        isInvalid: false
    }

    constructor(props){
        super(props);
        this.getPostFetchs = this.getPostFetchs.bind(this);
    }

    componentDidMount() {
        this.getPostFetchs(this.state.postData);
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.curtag != this.props.curtag ||
            nextprops.searchKey != this.props.searchKey) {
            this.setState({isInvalid: true});
        }
    }

    componentDidUpdate(){
        if(this.state.isInvalid){
            this.getPostFetchs(this.state.postData);
            this.setState({isInvalid: false})
        }
    }

    createUrl(pageData) {
        return `/Page/${pageData.pageName}/${pageData.name}`
    }

    getPostFetchs(postData) {
        let tags;
        try {
            let tagstr = this.props.curtag;
            tags = JSON.parse(decodeURI(tagstr));
        }
        catch (ex) {
            tags = []
        }

        return ieReduxFetch("/api/PageDataQuery/GetPageDatas", {
            ...postData,
            tags,
            searchKey: this.props.searchKey || this.state.searchKey
        }).then(value => {
            value.pageDatas.forEach(pageData => {
                pageData.__proto__ = PageDataModel.prototype;
                pageData.tags.forEach(tag => {
                    tag.__proto__ = TagModel.prototype;
                })
            })

            this.setState({ 
                posts: value.pageDatas, 
                resourceNum: value.resourceNum,
                postData: {
                    ...this.state.postData,
                    ...postData
                }
            });

            return value.pageDatas;
        });
    }

    render() {
        let { _postListComponent: Component, ...props } = this.props
        return <Component
            {...props}
            createUrl={this.createUrl}
            getPostFetchs={this.getPostFetchs}
            posts={this.state.posts}
            resourceNum={this.state.resourceNum}
            postData={this.state.postData}
        />
    }
}

var queryRegex = /^\?/;

const getQueryVariable = (variable, search) => {
    let query = search.replace(queryRegex, "");

    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return "";
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let curtag = getQueryVariable("tag", ownProps.location.search);
    let searchKey = getQueryVariable("search", ownProps.location.search);

    return {
        curtag,
        searchKey
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

const Contain = withRouter(CmsRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(PostListContain))

export default (component) => (props) => {
    return <Contain
        _postListComponent={component}
        {...props}
    />
}
