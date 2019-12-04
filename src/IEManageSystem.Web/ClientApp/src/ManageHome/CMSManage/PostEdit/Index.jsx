import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'

import './Index.css'

import { pageComponentFetch, componentDatasFetch, componentDataUpdateFetch, componentDataUpdate } from 'CMSManage/IEReduxs/Actions'
import PostEditParentComponent from 'CMSManage/Component/ParentComponent/PostEditParentComponent'

class ComponentData extends React.Component {
    constructor(props) {
        super(props);

        this.props.pageComponentFetch(this.props.pageName);
        this.props.componentDatasFetch(this.props.pageName, this.props.pageDataName);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.componentDatasDidInvalidate) {
            this.props.componentDatasFetch(this.props.pageName, this.props.pageDataName);
        }
    }

    render() {
        return (
            <div className="page-container">
                <div className="">
                    <button type="button" className="btn btn-warning mr-2"
                        onClick={()=>this.props.componentDatasFetch(this.props.pageName, this.props.pageDataName)}
                    >
                        取消修改
                        <span className="oi padding-left-10 oi-action-undo" title="icon name" aria-hidden="true"></span>
                    </button>
                    <button type="button" className="btn btn-info"
                        onClick={
                            ()=>{
                                this.props.componentDataUpdateFetch(this.props.pageName, this.props.pageDataName, this.props.componentDatas);
                            }
                        }
                    >
                        提交文章
                        <span className="oi padding-left-10 oi-cloud-upload" title="icon name" aria-hidden="true"></span>
                    </button>
                </div>
                <div className="page-container-body">
                    {
                        this.props.pageComponents.filter(item => !item.parentSign).map(item =>
                            <PostEditParentComponent
                                key={item.sign}
                                pageComponent={item}
                                componentDataUpdate={this.props.componentDataUpdate}
                            >
                            </PostEditParentComponent>)
                    }
                </div>
            </div>
        );
    }
}

ComponentData.propTypes = {
    pageComponents: PropTypes.array,
    componentDatas: PropTypes.array,
    componentDatasDidInvalidate: PropTypes.bool.isRequired,
    pageName: PropTypes.string.isRequired,
    pageDataName: PropTypes.string,
    pageComponentFetch: PropTypes.func.isRequired,
    componentDatasFetch: PropTypes.func.isRequired,
    componentDataUpdateFetch: PropTypes.func.isRequired,
    componentDataUpdate: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        pageComponents: state.pageComponents,
        componentDatas: state.componentData.componentDatas,
        componentDatasDidInvalidate: state.componentData.componentDatasDidInvalidate,
        pageName: ownProps.match.params.pageName,
        pageDataName: ownProps.match.params.pageDataName
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageComponentFetch: (name) => {
            dispatch(pageComponentFetch(name));
        },
        componentDatasFetch: (pageName, pageDataName) => {
            dispatch(componentDatasFetch(pageName, pageDataName));
        },
        componentDataUpdateFetch: (pageName, pageDataName, componentDatas) => {
            dispatch(componentDataUpdateFetch(pageName, pageDataName, componentDatas));
        },
        componentDataUpdate: (resource) => {
            dispatch(componentDataUpdate(resource));
        }
    }
}

const ComponentDataContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ComponentData)

export default ComponentDataContain;