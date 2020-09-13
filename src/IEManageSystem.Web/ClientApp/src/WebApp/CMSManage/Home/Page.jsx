import React from 'react'

export default class Page extends React.Component {
    render() {
        return (
            <div className='d-flex flex-column' id="__IEHomePage__" style={this.props.style}>
                { this.props.children }
            </div>
        );
    }
}