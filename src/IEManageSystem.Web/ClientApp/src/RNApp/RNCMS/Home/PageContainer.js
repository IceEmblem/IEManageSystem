import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView } from 'react-native';

import { PageComponentOSType } from 'BaseCMSManage/Models/Pages/PageComponentModel'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import { pageFetch, pageDataFetch } from 'BaseCMSManage/IEReduxs/Actions'

import ComponentContainerBoxShow from 'RNCMS/Component/ComponentContainerBoxs/ComponentContainerBoxShow'
import { IComponentContainerBoxShow } from 'BaseCMSManage/ComponentContainerBoxs'
import IocContainer from 'Core/IocContainer'

import RootComponentContainerBox from 'BaseCMSManage/RootComponentContainerBox'

import Video from 'react-native-video';


class PageContainer extends Component {
  state = {
    isFetching: false,
  };

  componentWillMount() {
    IocContainer.registerSingleIntances(IComponentContainerBoxShow, ComponentContainerBoxShow)
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
    // return <Video
    //   source={{ uri: "https://www.w3school.com.cn/example/html5/mov_bbb.mp4" }}          // Can be a URL or a local file.
    //   ref={(ref) => {
    //     this.player = ref
    //   }}
    //   // 缩放模式
    //   resizeMode='contain'
    //   // 是否暂停
    //   paused={false}
    //   // 是否全屏
    //   fullscreen={true}
    //   onBuffer={this.onBuffer}                // Callback when remote video is buffering
    //   onError={this.videoError}               // Callback when video cannot be loaded
    //   style={{
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     bottom: 0,
    //     right: 0,
    //   }}
    //   controls
    // />

    return (
      <RootComponentContainerBox
        pageName={this.props.pageName}
        pageDataId={this.props.pageDataId}
        os={PageComponentOSType.Native}
      />
    )
  }
}

PageContainer.propTypes = {
  pageDataId: PropTypes.number,
  pageName: PropTypes.string.isRequired,
  pageDataName: PropTypes.string,

  page: PropTypes.object,
  pageData: PropTypes.object,
  pageFetch: PropTypes.func.isRequired,
  pageDataFetch: PropTypes.func.isRequired,
}


PageContainer.defaultProps = {
  pageName: "Home"
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
  let pageName = ownProps.match.params.pageName || "Home";
  let pageDataName = ownProps.match.params.pageDataName;

  // 获取文章
  let postId = state.pageDataNameToIds[pageDataName];

  return {
    pageDataId: postId,
    pageName: pageName,
    pageDataName: pageDataName,
    page: state.pages[pageName],
    pageData: state.pageDatas[postId],
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