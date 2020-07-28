import React from 'react'
import PropTypes from 'prop-types'

import TemplateList from 'CMSManage/Component/Components/TemplateList'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import { setPage, RootComponentSign } from '../IEReduxs/Actions'
import ComponentContainerBox from 'CMSManage/Component/ComponentContainerBoxs/ComponentContainerBox'
import Page from '../Home/Page'

const pageId = 999999;

class TemplatePageShow extends React.Component {
    constructor(props) {
        super(props);

        this.template = TemplateList.find(e => e.name == props.match.params.templateName);
        this.templatePage = this.template.templatePages.find(item => item.page.name == props.match.params.templatePageName);

        this.props.setPage({ ...this.templatePage.page, ...{ id: pageId, name: `TemplatePageShow_${this.templatePage.page}` } }, this.templatePage.pageComponents, this.templatePage.defaultComponentDatas)
    }

    render() {
        if(!this.props.rootPageComponent){
            return <div></div>
        }

        return (
            <Page>
                {
                    this.props.rootPageComponent.pageComponentSigns.map(sign =>
                        <ComponentContainerBox
                            key={sign}
                            sign={sign}
                            pageId={pageId}
                            pageDataId={undefined}
                        >
                        </ComponentContainerBox>)
                }
            </Page>
        );
    }
}

TemplatePageShow.propTypes = {
    rootPageComponent: PropTypes.object,
    setPage: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    // ownProps为当前组件的props
    // 获取根组件
    let rootPageComponent = undefined;
    if (state.pageComponents[pageId]) {
        rootPageComponent = state.pageComponents[pageId][RootComponentSign];
    }

    return {
        rootPageComponent: rootPageComponent,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setPage: (page, pageComponents, defaultComponentDatas) => {
            dispatch(setPage(page, pageComponents, defaultComponentDatas));
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(TemplatePageShow)

export default Contain;