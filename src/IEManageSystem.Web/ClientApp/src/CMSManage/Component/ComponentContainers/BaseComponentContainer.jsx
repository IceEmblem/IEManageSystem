import React from 'react'
import PropTypes from 'prop-types'

import ComponentFactory from '../Components/ComponentFactory'

import './BaseComponentContainer.css'

class BaseComponentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.componentObject = new ComponentFactory().getComponentDescribeForName(this.props.pageComponent.name).componentObject;
    }

    getStyle(){
        let style =
            {
                padding: "0rem"
            }

        if (this.props.pageComponent.height) {
            style.height = this.props.pageComponent.height;
        }

        if (this.props.pageComponent.padding) {
            style.padding = this.props.pageComponent.padding;
        }

        if(this.props.pageComponent.margin){
            style.margin = this.props.pageComponent.margin;
        }

        if(this.props.pageComponent.backgroundColor){
            style.backgroundColor = this.props.pageComponent.backgroundColor;
        }

        return style;
    }

    getClassName(){
        let className = `col-md-${this.props.pageComponent.col || 12} ${this.props.pageComponent.className || ""}`;

        return className;
    }

    createChildComponent(){
        return undefined;
    }

    createComponent() 
    {
        return this.componentObject.Component({
            componentData: this.props.contentComponentData,
            pageComponentSettings:this.getPageComponentSettings() || [],
            targetPageId: this.props.pageComponent.targetPageId
        }, this.createChildComponent())
    }

    getTools(){
        return undefined;
    }

    getPageComponentSettings(){
        return this.props.pageComponent.pageComponentSettings
    }

    render() 
    {
        return (
            <div style={this.getStyle()} className={`parentcomponent ${this.getClassName()}`}>
                <div className="w-100">
                    {this.createComponent()}
                </div>
                {this.getTools()}
            </div>
        );
    }
}

BaseComponentContainer.propTypes = {
    pageComponent: PropTypes.object.isRequired,
    contentComponentData: PropTypes.object
}

BaseComponentContainer.defaultProps = {
};

export default BaseComponentContainer;