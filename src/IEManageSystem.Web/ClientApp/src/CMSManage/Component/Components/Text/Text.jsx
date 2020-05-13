import React from 'react'
import PropTypes from 'prop-types'
import {BaseContentLeafComponent} from '../BaseContentLeafComponent'

class Text extends BaseContentLeafComponent
{
    render()
    {
        let text;
        if(this.props.componentData && this.props.componentData.getDefauleData().field1){
            text = this.props.componentData.getDefauleData().field1;
        }
        else{
            text = "这是一段文本";
        }

        return (<p>{text}</p>);
    }
}

Text.defaultProps = {
};

export default Text;