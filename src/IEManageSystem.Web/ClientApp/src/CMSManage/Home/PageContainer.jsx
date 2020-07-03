import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'

import { pageFetch, pageDataFetch } from 'CMSManage/IEReduxs/Actions'
import FrontCompontContainer from 'CMSManage/Component/ComponentContainers/FrontCompontContainer'
import Page from './Page'

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoad: false
        };

        Promise.all([
            this.props.pageFetch(this.props.pageName),
            this.getpageData()
        ]).then(() => {
            this.setState({ isLoad: true });
        });
    }

    componentWillUpdate(nextProps) {
        if (this.props.pageName != nextProps.pageName) {
            this.props.pageFetch(this.props.pageName);
            this.getpageData();

            return;
        }

        if (this.props.pageDataName != nextProps.pageDataName) {
            this.getpageData();

            return;
        }
    }

    getpageData() {
        if (this.props.pageDataName) {
            return this.props.pageDataFetch(this.props.pageName, this.props.pageDataName);
        }

        return new Promise(function (resolve, reject) { resolve(); });
    }

    render() {
        if (!this.state.isLoad) {
            return <div></div>;
        }

        return (
            <Page>
                {
                    this.props.page.pageComponentCollection.pageComponents.filter(item => !item.parentSign).map(item =>
                        <FrontCompontContainer
                            key={item.sign}
                            pageComponent={item}
                        >
                        </FrontCompontContainer>)
                }
            </Page>
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