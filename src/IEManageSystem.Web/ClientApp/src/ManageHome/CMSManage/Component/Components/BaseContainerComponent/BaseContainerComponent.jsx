import React from 'react'
import PropTypes from 'prop-types'

import { BaseComponent } from '../BaseComponent'

class BaseContainerComponent extends BaseComponent{
    constructor(props){
        super(props);
    }
}

BaseContainerComponent.propTypes = {
    pageComponentSettings: PropTypes.array
}

BaseContainerComponent.defaultProps = {
};

export default BaseContainerComponent;