import React from 'react'
import PropTypes from 'prop-types'

import { BaseComponent } from '../BaseComponent'

class BaseLeafComponent extends BaseComponent 
{
    constructor(props) {
        super(props);
    }
}

BaseLeafComponent.propTypes = {
    pageComponentSettings: PropTypes.array,
    componentData: PropTypes.object
}

BaseLeafComponent.defaultProps = {
};

export default BaseLeafComponent;