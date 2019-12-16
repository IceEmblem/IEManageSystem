import React from 'react'
import PropTypes from 'prop-types'

class ComponentFrame extends React.Component{
    render(){
        return (
        <button type="button" className={"pageedit-component-tool-frame btn btn-outline-info"+(this.props.active ? " active":"")}
            onClick={this.props.componentOnClick}
        >
            {this.props.children}
        </button>);
    }
}

ComponentFrame.propTypes = {
    componentOnClick: PropTypes.func.isRequired,
    active: PropTypes.bool
}

export default ComponentFrame;