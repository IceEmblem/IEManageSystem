import React from 'react'
import PropTypes from 'prop-types'

class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
    }
}

BaseComponent.propTypes = {
    pageComponentSettings: PropTypes.array
}

BaseComponent.defaultProps = {
};

export default BaseComponent;