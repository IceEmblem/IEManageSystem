import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'

import './PageContainer.css'

import { pageFetch, pageDataFetch } from 'CMSManage/IEReduxs/Actions'
import FrontCompontContainer from 'CMSManage/Component/ComponentContainers/FrontCompontContainer'

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.props.pageFetch(this.props.pageName);
        this.props.pageDataFetch(this.props.pageName, this.props.pageDataName);
    }

    componentWillUpdate(nextProps) {
        if(this.props.pageName == nextProps.pageName && this.props.pageDataName == nextProps.pageDataName){
            return;
        }

        this.props.pageFetch(nextProps.pageName);
        this.props.pageDataFetch(nextProps.pageName, nextProps.pageDataName);
    }

    render() {
        return (
            <div className="front-page-container">
                {
                    this.props.page.pageComponents.filter(item => !item.parentSign).map(item =>
                        <FrontCompontContainer
                            key={item.sign}
                            pageComponent={item}
                        >
                        </FrontCompontContainer>)
                }
            </div>
        );
    }
}

PageContainer.propTypes = {
    page: PropTypes.object,
    pageName: PropTypes.string.isRequired,
    pageDataName: PropTypes.string,
    pageFetch: PropTypes.func.isRequired,
    pageDataFetch: PropTypes.func.isRequired
}

PageContainer.defaultProps = {
    pageName: "Home"
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        page: state.page,
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
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageContainer)

export default Contain;