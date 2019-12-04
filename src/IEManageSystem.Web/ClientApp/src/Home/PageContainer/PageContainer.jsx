import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'

import './PageContainer.css'

import { pageComponentFetch, componentDatasFetch } from 'CMSManage/IEReduxs/Actions'
import FrontParentCompont from 'CMSManage/Component/ParentComponent/FrontParentCompont'

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.props.pageComponentFetch(this.props.pageName);
        this.props.componentDatasFetch(this.props.pageName, this.props.pageDataName);
    }

    componentWillUpdate(nextProps) {
        if(this.props.pageName == nextProps.pageName && this.props.pageDataName == nextProps.pageDataName){
            return;
        }

        this.props.pageComponentFetch(nextProps.pageName);
        this.props.componentDatasFetch(nextProps.pageName, nextProps.pageDataName);
    }

    render() {
        return (
            <div className="front-page-container">
                {
                    this.props.pageComponents.filter(item => !item.parentSign).map(item =>
                        <FrontParentCompont
                            key={item.sign}
                            pageComponent={item}
                        >
                        </FrontParentCompont>)
                }
            </div>
        );
    }
}

PageContainer.propTypes = {
    pageComponents: PropTypes.array,
    componentDatasDidInvalidate: PropTypes.bool.isRequired,
    pageName: PropTypes.string.isRequired,
    pageDataName: PropTypes.string,
    pageComponentFetch: PropTypes.func.isRequired,
    componentDatasFetch: PropTypes.func.isRequired
}

PageContainer.defaultProps = {
    pageName: "Home"
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        pageComponents: state.pageComponents,
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
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageContainer)

export default Contain;