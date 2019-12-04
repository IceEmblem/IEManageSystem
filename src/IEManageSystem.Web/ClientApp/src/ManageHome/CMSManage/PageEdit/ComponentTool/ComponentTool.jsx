import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'

import './ComponentTool.css'

import ComponentFrame from './ComponentFrame.jsx'
import ComponentFactory, { componentType, componentTypes } from 'CMSManage/Component/Components/ComponentFactory'

class ComponentTool extends React.Component 
{
    constructor(props){
        super(props);

        this.state = {
            activeIndex: 0
        }
    }

    createComponent(item)
    {
        return (<a key={item.name} href="javascript:void(0)">
        <ComponentFrame
            active={this.props.selectedComponentDescribe.name == item.name}
            componentOnClick={
                () => {
                    this.props.selectComponentDescribe(item);
                }
            }
        >
            <item.componentObject.Preview />
        </ComponentFrame>
    </a>);
    }

    render() {
        let componentDescribes = new ComponentFactory().getComponentDescribes();
        let list = componentTypes.map((componentType, index) => {
            let childComponentDescribes = componentDescribes.filter(e => e.componentType == componentType.name)
            let childComponents = childComponentDescribes.map(item => this.createComponent(item))
            componentDescribes = componentDescribes.filter(e => e.componentType != componentType.name)

            return (<li key={index} className="component-tool-item" id={componentType.name}>
                <a href="javascript:void(0)"
                    onClick={()=>{this.setState({activeIndex: index})}}
                >
                    <span className={`oi ${componentType.icon}`} title="icon name" aria-hidden="true"></span>
                    <span className="ml-2">{componentType.text}</span>
                </a>
                <div className={`subMenu ${this.state.activeIndex == index && "subMenu-active"}`}>
                    {childComponents}
                </div>
            </li>);
        });
        // 
        let otherIndex = list.length;
        list.push(
            <li key={otherIndex} className="component-tool-item" id="other">
                <a href="javascript:void(0)"
                    onClick={()=>{this.setState({activeIndex: otherIndex})}}
                >
                    <span className={`oi oi-puzzle-piece`} title="icon name" aria-hidden="true"></span>
                    <span className="ml-2">其他组件</span>
                </a>
                <div className={`subMenu ${this.state.activeIndex == otherIndex && "subMenu-active"}`}>
                    {componentDescribes.map(item=> this.createComponent(item))}
                </div>
            </li>
        );


        return (<div className="component-tool">
            <div>
                <ul className="component-tool-list">
                    {list}
                </ul>
            </div>
        </div>);
    }
}

ComponentTool.propTypes = {
    selectedComponentDescribe: PropTypes.object,
    selectComponentDescribe: PropTypes.func.isRequired
}

ComponentTool.defaultProps = {
    selectedComponentDescribe: {}
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const ComponentToolContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(ComponentTool)

export default ComponentToolContain;