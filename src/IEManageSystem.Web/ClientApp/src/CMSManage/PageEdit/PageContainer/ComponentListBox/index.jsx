import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

import Modal from 'Modal/Modal';
import ComponentFrame from './ComponentFrame.jsx'
import ComponentFactory, { componentTypes } from 'CMSManage/Component/Components/ComponentFactory'

class ComponentListBox extends React.Component 
{
    constructor(props){
        super(props);

        this.state = {
            selectedComponentDescribe: undefined,
            activeIndex: 0
        }
    }

    createComponent(item)
    {
        return (
        <ComponentFrame
            active={this.state.selectedComponentDescribe && this.state.selectedComponentDescribe.name == item.name}
            componentOnClick={
                () => {
                    // 如果点中的不是之前选择的项目
                    if(this.state.selectedComponentDescribe != item){
                        this.setState({selectedComponentDescribe: item});
                        return;
                    }
                    
                    this.props.close();
                    this.props.addComponent(item);
                }
            }
        >
            {item.componentObject.Preview()}
        </ComponentFrame>);
    }

    render() {
        let componentDescribes = new ComponentFactory().getComponentDescribes();
        let list = componentTypes.map((componentType, index) => {
            let childComponentDescribes = componentDescribes.filter(e => e.componentType == componentType.name)
            let childComponents = childComponentDescribes.map(item => this.createComponent(item))
            componentDescribes = componentDescribes.filter(e => e.componentType != componentType.name)

            return (
            <div key={index}>
                <div className="pageedit-componentlistbox-components-title">
                    <span className={`oi ${componentType.icon}`} title="icon name" aria-hidden="true"></span>
                    <span className="ml-2">{componentType.text}</span>
                </div>
                <div className="card">
                    <div className="card-body">
                        {childComponents}
                    </div>
                </div>
            </div>);
        });

        return (
        <Modal show={this.props.show}>
            <div className="d-flex justify-content-center pageedit-componentlistbox align-items-center w-100">
                <div className="card w-75">
                    <div class="pageedit-componentlistbox-header card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 text-white">请选择组件</h5>
                        <a href="javascript:void(0)" className="pageedit-componentlistbox-close text-white"
                            onClick={()=>{this.props.close()}}
                        >
                            <span class="oi oi-x" title="icon name" aria-hidden="true"></span>
                        </a>
                    </div>
                    <div className="card-body pageedit-componentlistbox-body">
                        {list}
                    </div>
                </div>
            </div>
        </Modal>);
    }
}

ComponentListBox.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    addComponent: PropTypes.func.isRequired
}

ComponentListBox.defaultProps = {
}

export default ComponentListBox;