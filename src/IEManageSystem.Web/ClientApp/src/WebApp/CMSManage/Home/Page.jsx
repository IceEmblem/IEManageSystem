import React from 'react'
import PropTypes from 'prop-types'

export default class Page extends React.Component {
    render() {
        return (
            <div id="IEHomePage">
                { this.props.children }
            </div>
        );
    }
}