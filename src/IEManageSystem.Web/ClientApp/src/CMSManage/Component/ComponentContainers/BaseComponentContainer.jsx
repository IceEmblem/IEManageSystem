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

        if (this.props.pageComponent.pageComponentBaseSetting.height) {
            style.height = this.props.pageComponent.pageComponentBaseSetting.height;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.padding) {
            style.padding = this.props.pageComponent.pageComponentBaseSetting.padding;
        }

        if(this.props.pageComponent.pageComponentBaseSetting.margin){
            style.margin = this.props.pageComponent.pageComponentBaseSetting.margin;
        }

        if(this.props.pageComponent.pageComponentBaseSetting.backgroundColor){
            style.backgroundColor = this.props.pageComponent.pageComponentBaseSetting.backgroundColor;
        }

        return style;
    }

    getClassName(){
        let className = `col-md-${this.props.pageComponent.pageComponentBaseSetting.col || 12} ${this.props.pageComponent.pageComponentBaseSetting.className || ""}`;

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