import React from 'react';
import PropTypes from "prop-types"
import './index.css'

class ListBtn extends React.Component
{
    render(){
        return (
            <button className={`listbtn ${this.props.className} ${this.props.open==true && "on"}`} 
                onClick={this.props.onClick}
            >
                <span></span><span></span><span></span>
            </button>
        );
    }
}

ListBtn.propTypes = {
    open: PropTypes.bool.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
}

export default ListBtn;