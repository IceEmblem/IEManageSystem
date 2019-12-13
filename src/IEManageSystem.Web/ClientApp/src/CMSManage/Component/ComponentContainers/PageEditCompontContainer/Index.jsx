import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import ContainerComponentObject from 'CMSManage/Component/Components/BaseContainerComponent'
import PageLeafComponentObject from 'CMSManage/Component/Components/BasePageLeafComponent'
import CreateComponentService from './CreateComponentService'

import './Index.css'

import EditFrame from './EditFrame'

import { pageAddComponent, pageRemoveComponent, pageEditComponent } from 'CMSManage/IEReduxs/Actions'

import BaseComponentContainer from '../BaseComponentContainer'
import BaseSetting from './BaseSetting'
import PageLeafBaseSetting from './PageLeafBaseSetting'

class PageEditCompontContainer extends BaseComponentContainer {
    constructor(props) {
        super(props);

        this.state = {
            openEdit: false
        }

        this.addChildComponent = this.addChildComponent.bind(this);
    }

    createChildComponent(){
        return this.props.childPageComponents.map(item => (
            <Contain
                selectedComponentDescribe={this.props.selectedComponentDescribe}
                pageComponent={item}
            >
            </Contain>)
        );
    }

    addChildComponent() {
        let pageComponent = CreateComponentService.createComponent(
            this.props.childPageComponents, 
            this.props.selectedComponentDescribe,
            this.props.pageComponent.sign);

        this.props.addComponent(pageComponent);
    }

    getTools()
    {
        // PageLeafBaseSetting
        let tools = [];

        let baseSetting = BaseSetting;
        let isShowAddBtn = false;
        if(this.componentObject instanceof ContainerComponentObject){
            isShowAddBtn = true;
        }
        else if(this.componentObject instanceof PageLeafComponentObject){
            baseSetting = PageLeafBaseSetting;
        }

        tools.push(<EditFrame 
            baseSetting={baseSetting}
            pageComponent={this.props.pageComponent} 
            componentSettingConfigs={this.componentObject.ComponentSettingConfigs}
            editComponent={this.props.editComponent}
            show={this.state.openEdit}
            close={()=>{this.setState({openEdit: false})}}
        ></EditFrame>);
        tools.push(
            <div className="editableparentcom-btns">
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
                                () => { this.addChildComponent() }
                            }
                        >
                            <span className="oi oi-plus" title="icon name" aria-hidden="true"></span>
                        </button>}
                </div>
        );

        return tools;
    }
}

PageEditCompontContainer.propTypes = {
    selectedComponentDescribe: PropTypes.object.isRequired,
    pageComponent: PropTypes.object.isRequired,
    childPageComponents: PropTypes.array.isRequired,
    addComponent: PropTypes.func.isRequired,
    removeComponent: PropTypes.func.isRequired,
    editComponent: PropTypes.func.isRequired
}

PageEditCompontContainer.defaultProps = {
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    // 新增属性 parentSign
    let childPageComponents = state.page.pageComponents.filter(item => item.parentSign == ownProps.pageComponent.sign);

    return {
        childPageComponents: childPageComponents
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addComponent: (pageComponent) => {
            dispatch(pageAddComponent(pageComponent));
        },
        removeComponent: (pageComponent) => {
            dispatch(pageRemoveComponent(pageComponent));
        },
        editComponent: (pageComponent) => {
            dispatch(pageEditComponent(pageComponent));
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageEditCompontContainer)

export default Contain;