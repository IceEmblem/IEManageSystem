import React from 'react'
import PropTypes from 'prop-types'

import ComponentFactory from 'BaseCMSManage/Components/ComponentFactory'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import { setPage } from 'BaseCMSManage/IEReduxs/Actions'
import ComponentContainerBoxShow from 'CMSManage/Component/ComponentContainerBoxs/ComponentContainerBoxShow'
import { PageComponentOSType } from 'BaseCMSManage/Models/Pages/PageComponentModel'

import Page from '../Home/Page'
import IETool from 'BaseCommon/ToolLibrary/IETool'

import { IComponentContainerBoxShow } from 'BaseCMSManage/ComponentContainerBoxs'
import IocContainer from 'Core/IocContainer'

import RootComponentContainerBox from 'BaseCMSManage/RootComponentContainerBox'

const pageName = "999999";

class TemplateComponentContainerBoxShow extends React.Component {
    render() {
        return <ComponentContainerBoxShow
            style={this.props.style}
            className={this.props.className}
        >
            {this.props.children}
        </ComponentContainerBoxShow>
    }
}

class TemplatePageShow extends React.Component {
    state = {
        show: false
    }

    constructor(props) {
        super(props);

        this.template = ComponentFactory.TemplateList.find(e => e.name == props.match.params.templateName);
        this.templatePage = IETool.deepCopy(this.template.templatePages.find(item => item.page.name == props.match.params.templatePageName));
    }

    componentWillMount() {
        IocContainer.registerSingleIntances(IComponentContainerBoxShow, TemplateComponentContainerBoxShow)
    }

    componentDidMount() {
        this.props.setPage({ ...this.templatePage.page, ...{ name: pageName } }, this.templatePage.pageComponents, this.templatePage.defaultComponentDatas)
        this.setState({ show: true });
    }

    render() {
        if (!this.state.show) {
            return <></>;
        }

        return (
            <Page>
                <RootComponentContainerBox
                    currentPageAndPost={{
                        pageName: pageName,
                        pageDataId: undefined,
                        os: this.props.os
                    }}
                />
            </Page>
        );
    }
}

TemplatePageShow.propTypes = {
    os: PropTypes.string.isRequired,
    setPage: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
        os: PageComponentOSType.Web,
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