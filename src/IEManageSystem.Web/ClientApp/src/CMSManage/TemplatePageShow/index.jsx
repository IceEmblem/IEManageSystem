import React from 'react'
import PropTypes from 'prop-types'

import TemplateList from 'CMSManage/Component/Components/TemplateList'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import { setPage } from '../IEReduxs/Actions'
import FrontCompontContainer from 'CMSManage/Component/ComponentContainers/FrontCompontContainer'
import Page from '../Home/Page'

class TemplatePageShow extends React.Component {
    constructor(props) {
        super(props);

        this.template = TemplateList.find(e => e.name == props.match.params.templateName);
        this.templatePage = this.template.templatePages.find(item => item.page.name == props.match.params.templatePageName);

        this.props.setPage(this.templatePage.page, this.templatePage.defaultComponentDatas)
    }

    render() {
        return (
            <Page>
                {
                    this.props.page.pageComponents.filter(item => !item.parentSign).map(item =>
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

TemplatePageShow.propTypes = {
    page: PropTypes.object,
    setPage: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        page: state.page
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setPage: (page, defaultComponentDatas) => {
            dispatch(setPage(page, defaultComponentDatas));
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(TemplatePageShow)

export default Contain;