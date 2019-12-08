import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import ContainerComponentObject from 'CMSManage/Component/Components/BaseContainerComponent'
import PageLeafComponentObject from 'CMSManage/Component/Components/BasePageLeafComponent'
import CreatePageComponentService from './CreatePageComponentService'

import './Index.css'

import EditFrame from './EditFrame.jsx'

import ComponentFactory from '../../Components/ComponentFactory'
import { pageAddComponent, pageRemoveComponent, pageEditComponent } from 'CMSManage/IEReduxs/Actions'

import BaseParentComponent from '../BaseParentComponent.jsx'
import BaseSetting from './BaseSetting'
import PageLeafBaseSetting from './PageLeafBaseSetting'

class EditableParentCom extends BaseParentComponent {
    constructor(props) {
        super(props);

        this.state = {
            openEdit: false
        }

        this.addChildComponent = this.addChildComponent.bind(this);
    }

    createChildrenComponent() {

        let componentDescribe = new ComponentFactory().getComponentDescribeForName(this.props.pageComponent.name);
        let childrens = this.props.childPageComponents.map(item => (
            <EditableParentComContain
                selectedComponentDescribe={this.props.selectedComponentDescribe}
                pageComponent={item}
            >
            </EditableParentComContain>)
        );

        return componentDescribe.componentObject.Component({
            pageComponentSettings:this.getPageComponentSettings() || [],
        }, childrens)
    }

    addChildComponent() {
        var timetamp = Number(new Date());
        while (true) {
            if (!this.props.childPageComponents.some(item => item.sign === timetamp)) {
                break;
            }

            timetamp = Number(new Date());
        }

        let pageComponent;
        if (this.props.selectedComponentDescribe.componentObject.prototype instanceof ContainerComponentObject) 
        {
            pageComponent = CreatePageComponentService.createCompositeComponent(timetamp, this.props.selectedComponentDescribe.name)
        }
        else if(this.props.selectedComponentDescribe.componentObject.prototype instanceof PageLeafComponentObject)
        {
            pageComponent = CreatePageComponentService.createPageLeafComponent(timetamp, this.props.selectedComponentDescribe.name)
        }
        else {
            pageComponent = CreatePageComponentService.createContentLeafComponent(timetamp, this.props.selectedComponentDescribe.name)
        }

        pageComponent.parentSign = this.props.pageComponent.sign;

        this.props.addComponent(pageComponent);
    }

    getTools()
    {
        let componentDescribe = new ComponentFactory().getComponentDescribeForName(this.props.pageComponent.name);

        // PageLeafBaseSetting
        let tools = [];

        let baseSetting = BaseSetting;
        let isShowAddBtn = false;
        if(componentDescribe.componentObject.prototype instanceof ContainerComponentObject){
            isShowAddBtn = true;
        }
        else if(componentDescribe.componentObject.prototype instanceof PageLeafComponentObject){
            baseSetting = PageLeafBaseSetting;
        }

        tools.push(<EditFrame 
            baseSetting={baseSetting}
            pageComponent={this.props.pageComponent} 
            pageComponentSettingConfigs={componentDescribe.componentObject.ComponentSettingConfigs}
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

EditableParentCom.propTypes = {
    selectedComponentDescribe: PropTypes.object.isRequired,
    pageComponent: PropTypes.object.isRequired,
    childPageComponents: PropTypes.array.isRequired,
    addComponent: PropTypes.func.isRequired,
    removeComponent: PropTypes.func.isRequired,
    editComponent: PropTypes.func.isRequired
}

EditableParentCom.defaultProps = {
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    // 新增属性 parentSign
    let childPageComponents = state.pageComponents.filter(item => item.parentSign == ownProps.pageComponent.sign);

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

const EditableParentComContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(EditableParentCom)

export default EditableParentComContain;