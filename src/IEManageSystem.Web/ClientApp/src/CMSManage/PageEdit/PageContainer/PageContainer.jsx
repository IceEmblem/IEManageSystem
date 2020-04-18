import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import CreateComponentService from 'CMSManage/Component/ComponentContainers/PageEditCompontContainer/CreateComponentService'

import './PageContainer.css'

import PageEditCompontContainer from 'CMSManage/Component/ComponentContainers/PageEditCompontContainer'

import { pageAddComponent, pageComponentUpdateFetch, pageFetch } from 'CMSManage/IEReduxs/Actions'

import { ieReduxFetch } from 'Core/IEReduxFetch'

import BtnLists from './BtnLists'
import PromptBox from 'PromptBox'

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            displayName: "",
            description: ""
        }

        this.getPage(props.pageName);

        this.submitPage = this.submitPage.bind(this);
        this.addComponent = this.addComponent.bind(this);

        this.props.pageFetch(props.pageName);
    }

    getPage(name) {
        let postData = {
            name: name
        };

        ieReduxFetch("/api/PageQuery/GetPage", postData)
            .then(value => {
                this.setState({
                    name: value.page.name,
                    displayName: value.page.displayName,
                    description: value.page.description
                })
            });
    }

    submitPage() {
        this.props.pageComponentUpdateFetch(
            this.props.pageName,
            this.props.page.pageComponents
        );
    }

    addComponent() {
        if (!this.props.selectedComponentDescribe) {
            return;
        }

        let pageComponent = CreateComponentService.createComponent(
            this.props.page.pageComponents,
            this.props.selectedComponentDescribe,
            null);

        this.props.addComponent(pageComponent);
    }

    render() {
        let promptBox = (<PromptBox>
            <div className="pageedit-page-container-header-info">
                <div className="input-group shadow-sm">
                    <input value={this.state.displayName} type="text" className="form-control" placeholder="" disabled />
                    <div className="input-group-append">
                        <span className="input-group-text text-white">显示名称</span>
                    </div>
                </div>
                <div className="input-group shadow-sm">
                    <input value={this.state.name} type="text" className="form-control" placeholder="" disabled />
                    <div className="input-group-append">
                        <span className="input-group-text text-white">
                            <span className="oi oi-key" title="icon name" aria-hidden="true"></span>
                                &#12288;名称
                            </span>
                    </div>
                </div>
                <div className="input-group shadow-sm">
                    <input value={this.state.description} type="text" className="form-control" placeholder="" disabled />
                    <div className="input-group-append">
                        <span className="input-group-text text-white">
                            <span className="oi oi-info mr-2" title="icon name" aria-hidden="true"></span>
                                &#12288;描述
                            </span>
                    </div>
                </div>
            </div>
        </PromptBox>);

        return (
            <div className="pageedit-page-container">
                <div className="hide-scroll">
                    <div className="front-page-container">
                        {
                            this.props.page.pageComponents.filter(item => !item.parentSign).map(item =>
                                <PageEditCompontContainer
                                    key={item.sign}
                                    pageComponent={item}
                                    selectedComponentDescribe={this.props.selectedComponentDescribe}
                                >
                                </PageEditCompontContainer>)
                        }
                    </div>
                </div>
                <div className="col-md-12 padding-0 pageedit-page-container-btns">
                    <BtnLists
                        addComponent={this.addComponent}
                        submitPage={this.submitPage}
                        pageInfoComponent={promptBox}
                        pageUpdate={
                            () => {
                                let myEvent = new Event('resize');
                                window.dispatchEvent(myEvent);
                            }
                        }
                    />
                </div>
            </div>
        );
    }
}

PageContainer.propTypes = {
    selectedComponentDescribe: PropTypes.object,
    page: PropTypes.object,
    pageName: PropTypes.string.isRequired,
    addComponent: PropTypes.func.isRequired,
    pageComponentUpdateFetch: PropTypes.func.isRequired,
    pageFetch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        page: state.page,
        pageName: ownProps.pageName
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addComponent: (pageComponent) => {
            dispatch(pageAddComponent(pageComponent));
        },
        pageComponentUpdateFetch: (name, components) => {
            dispatch(pageComponentUpdateFetch(name, components));
        },
        pageFetch: (name) => {
            dispatch(pageFetch(name));
        }
    }
}

const PageContainerContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageContainer)

export default PageContainerContain;