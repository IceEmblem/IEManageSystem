import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'

import './Index.css'

import { pageFetch, pageDataFetch, componentDataUpdateFetch } from 'CMSManage/IEReduxs/Actions'
import PostEditComponentContainer from 'CMSManage/Component/ComponentContainers/PostEditComponentContainer'

class ComponentData extends React.Component {
    constructor(props) {
        super(props);

        this.props.pageFetch(this.props.pageName);
        this.props.pageDataFetch(this.props.pageName, this.props.pageDataName);
    }

    render() {
        return (
            <div className="postedit-page-container">
                <div className="postedit-page-container-header">
                    <button type="button" className="btn btn-warning mr-2"
                        onClick={() => this.props.pageDataFetch(this.props.pageName, this.props.pageDataName)}
                    >
                        取消修改
                        <span className="oi padding-left-10 oi-action-undo" title="icon name" aria-hidden="true"></span>
                    </button>
                    <button type="button" className="btn btn-info"
                        onClick={
                            () => {
                                this.props.componentDataUpdateFetch(this.props.pageName, this.props.pageDataName, this.props.pageData.contentComponentDatas);
                            }
                        }
                    >
                        提交文章
                        <span className="oi padding-left-10 oi-cloud-upload" title="icon name" aria-hidden="true"></span>
                    </button>
                </div>
                <div className="hide-scroll">
                    <div className="front-page-container">
                        {
                            this.props.page.pageComponents.filter(item => !item.parentSign).map(item =>
                                <PostEditComponentContainer
                                    key={item.sign}
                                    pageComponent={item}
                                >
                                </PostEditComponentContainer>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

ComponentData.propTypes = {
    page: PropTypes.object,
    pageData: PropTypes.object,
    pageName: PropTypes.string.isRequired,
    pageDataName: PropTypes.string,
    pageFetch: PropTypes.func.isRequired,
    pageDataFetch: PropTypes.func.isRequired,
    componentDataUpdateFetch: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        page: state.page,
        pageData: state.pageData,
        pageName: ownProps.match.params.pageName,
        pageDataName: ownProps.match.params.pageDataName
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageFetch: (name) => {
            dispatch(pageFetch(name));
        },
        pageDataFetch: (pageName, pageDataName) => {
            dispatch(pageDataFetch(pageName, pageDataName));
        },
        componentDataUpdateFetch: (pageName, pageDataName, componentDatas) => {
            dispatch(componentDataUpdateFetch(pageName, pageDataName, componentDatas));
        }
    }
}

const ComponentDataContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ComponentData)

export default ComponentDataContain;