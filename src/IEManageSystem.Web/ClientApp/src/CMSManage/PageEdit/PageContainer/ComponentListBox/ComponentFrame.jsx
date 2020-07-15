import React from 'react'
import PropTypes from 'prop-types'

import { Tooltip  } from 'antd';

class ComponentFrame extends React.Component {
    render() {
        return (
            <Tooltip overlayStyle={{zIndex: 9999}} title={this.props.alterText}>
                <button type="button" className={"pageedit-componentlistbox-frame btn shadow-sm" + (this.props.active ? " pageedit-componentlistbox-frame-active" : "")}
                    onClick={this.props.componentOnClick}
                >
                    {this.props.children}
                </button>
            </Tooltip >
        );
    }
}

ComponentFrame.propTypes = {
    componentOnClick: PropTypes.func.isRequired,
    active: PropTypes.bool
}

export default ComponentFrame;