import React from 'react'
import PropTypes from 'prop-types'
import {BaseContentLeafComponent} from '../BaseContentLeafComponent'

class Text extends BaseContentLeafComponent
{
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