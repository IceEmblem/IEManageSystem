import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import CreateComponentService from 'CMSManage/Component/ComponentContainers/PageEditCompontContainer/CreateComponentService'

import './PageContainer.css'

import PageEditCompontContainer from 'CMSManage/Component/ComponentContainers/PageEditCompontContainer'

import { pageAddComponent, pageComponentUpdateFetch, pageFetch } from 'CMSManage/IEReduxs/Actions'

import {ieReduxFetch} from 'Core/IEReduxFetch'

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
        .then(value=>{
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

    addComponent(){
        let pageComponent = CreateComponentService.createComponent(
            this.props.page.pageComponents, 
            this.props.selectedComponentDescribe,
            null);

        this.props.addComponent(pageComponent);
    }

    render() {
        return (
            <div className="page-container">
                <div className="page-container-header">
                    <div className="input-group shadow-sm">
                        <input value={this.state.displayName} type="text" className="form-control bg-transparent" placeholder="" disabled />
                        <div className="input-group-append">
                            <span className="input-group-text text-white">显示名称</span>
                        </div>
                    </div>
                    <div className="input-group shadow-sm">
                        <input value={this.state.name} type="text" className="form-control bg-transparent" placeholder="" disabled />
                        <div className="input-group-append">
                            <span className="input-group-text text-white">
                                <span className="oi oi-key mr-2" title="icon name" aria-hidden="true"></span>
                                名称
                            </span>
                        </div>
                    </div>
                    <div className="input-group shadow-sm">
                        <input value={this.state.description} type="text" className="form-control bg-transparent" placeholder="" disabled />
                        <div className="input-group-append">
                            <span className="input-group-text text-white">
                                <span className="oi oi-info mr-2" title="icon name" aria-hidden="true"></span>
                                描述
                            </span>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-warning padding-left-10 padding-right-10 shadow-sm"
                            onClick={
                                () => {
                                    let myEvent = new Event('resize');
                                    window.dispatchEvent(myEvent);
                                }
                            }
                        >
                            <span className="oi oi-loop-circular mr-1" title="icon name" aria-hidden="true"></span>
                            重新渲染
                        </button>
                        <button className="btn btn-info padding-left-10 padding-right-10 shadow-sm"
                            onClick={this.submitPage}
                        >
                            <span className="oi oi-cloud-upload mr-1" title="icon name" aria-hidden="true"></span>
                            提交页面
                        </button>
                    </div>
                </div>
                <div className="page-container-header-hidebtn">
                    <button className="btn btn-info"
                        onClick={() => {
                            $(".page-container-header").slideToggle(300);
                        }}
                    >==</button>
                </div>
                <div className="page-container-body">
                    {
                        this.props.page.pageComponents.filter(item => !item.parentSign).map(item =>
                            <PageEditCompontContainer
                                key={item.sign}
                                pageComponent={item}
                                selectedComponentDescribe={this.props.selectedComponentDescribe}
                            >
                            </PageEditCompontContainer>)
                    }
                    <div className="col-md-12  padding-0">
                        <div className="col-md-2 padding-0 float-right">
                            <a className="add-component-btn" href="javascript:void(0)"
                                onClick={this.addComponent}
                            >
                                <span className="oi oi-plus" title="icon name" aria-hidden="true"></span>
                            </a>
                        </div>
                    </div>
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