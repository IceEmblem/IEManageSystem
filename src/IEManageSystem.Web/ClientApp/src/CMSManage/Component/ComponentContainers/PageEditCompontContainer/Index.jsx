import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import ContainerComponentObject from 'CMSManage/Component/Components/BaseContainerComponent'
import {pageFetch, pageDataFetch} from 'CMSManage/IEReduxs/Actions'

import './Index.css'

import EditFrame from './EditFrame'

import { pageAddComponent, pageRemoveComponent, pageEditComponent } from 'CMSManage/IEReduxs/Actions'

import BaseComponentContainer from '../BaseComponentContainer'

class PageEditCompontContainer extends BaseComponentContainer {
    constructor(props) {
        super(props);

        this.state = {
            openEdit: false
        }
    }

    createChildComponent(){
        return this.props.childPageComponents.map(item => (
            <Contain
                key={item.sign}
                pageComponent={item}
            >
            </Contain>)
        );
    }

    getTools()
    {
        // PageLeafBaseSetting
        let tools = [];

        let isShowAddBtn = false;
        if(this.componentObject instanceof ContainerComponentObject){
            isShowAddBtn = true;
        }

        tools.push(<EditFrame 
            key={"EditFrame"}
            componentObject={this.componentObject}
            pageComponent={this.props.pageComponent} 
            editComponent={this.props.editComponent}
            show={this.state.openEdit}
            close={()=>{this.setState({openEdit: false})}}
        ></EditFrame>);
        tools.push(
            <div key={"EditFrameBtn"} className="editableparentcom-btns">
                    <button type="button" className="btn btn-danger btn-sm"
                        onClick={
                            () => { this.props.removeComponent(this.props.pageComponent) }
                        }
                    >
                        <span className="oi oi-trash" title="icon name" aria-hidden="true"></span>
                    </button>
                    <button type="button" className="btn btn-info btn-sm"
                        onClick={
                            () => { this.setState({ openEdit: true }) }
                        }
                    >
                        <span className="oi oi-pencil" title="icon name" aria-hidden="true"></span>
                    </button>
                    {
                        isShowAddBtn &&
                        <button type="button" className="btn btn-success btn-sm"
                            onClick={
                                () => { this.props.addChildComponent(this.props.pageComponent) }
                            }
                        >
                            <span className="oi oi-plus" title="icon name" aria-hidden="true"></span>
                        </button>}
                </div>
        );

        return tools;
    }

    execLogic(requestData){
        throw new Error("不能在编辑页面时执行逻辑");
    }
}

PageEditCompontContainer.propTypes = {
    addChildComponent: PropTypes.func.isRequired,
    pageComponent: PropTypes.object.isRequired,
    childPageComponents: PropTypes.array.isRequired,
    removeComponent: PropTypes.func.isRequired,
    editComponent: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
    pageData: PropTypes.object.isRequired,
    pageFreshen: PropTypes.func.isRequired
}

PageEditCompontContainer.defaultProps = {
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    // 新增属性 parentSign
    let childPageComponents = state.page.pageComponents.filter(item => item.parentSign == ownProps.pageComponent.sign);

    return {
        childPageComponents: childPageComponents,
        page: state.page,
        pageData: state.pageData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeComponent: (pageComponent) => {
            dispatch(pageRemoveComponent(pageComponent));
        },
        editComponent: (pageComponent) => {
            dispatch(pageEditComponent(pageComponent));
        },
        pageFreshen: (pageName, pageDataName) => {
            return Promise.all([dispatch(pageFetch(pageName)), dispatch(pageDataFetch(pageName, pageDataName))]);
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageEditCompontContainer)

export default Contain;