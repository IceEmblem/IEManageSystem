import React from 'react'
import PropTypes from 'prop-types'
import {LeafComponent} from '../BaseLeafComponent'

class Text extends LeafComponent
{
    constructor(props){
        super(props);
    }

    getComponentData(){
        return this.props.componentData || {};
    }

    
    render()
    {
        let text = this.getComponentData().field1 || "这是一段文本";

        return (<p>{text}</p>);
    }
}

Text.defaultProps = {
};

export default Text;