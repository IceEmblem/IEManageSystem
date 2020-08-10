import React from 'react'
import './ComponentContainerBoxShow.css'

export default (props) => (
    <div
        style={props.style}
        className={`cms-componentcontainerboxshow ${props.className}`}
        {...props.propsEX}
    >
        {props.children}
        {props.ToolBtn}
    </div>
);