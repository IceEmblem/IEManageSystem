import React from 'react'
import PropTypes from 'prop-types'

class ComponentFrame extends React.Component{
    render(){
        return (
        <button type="button" className={"pageedit-componentlistbox-frame btn shadow-sm"+(this.props.active ? " pageedit-componentlistbox-frame-active":"")}
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