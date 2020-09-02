import React from 'react'
import PropTypes from 'prop-types'

export default class Page extends React.Component {
    render() {
        return (
            <div className='d-flex flex-column' id="IEHomePage" style={this.props.style}>
                { this.props.children }
            </div>
        );
    }
}