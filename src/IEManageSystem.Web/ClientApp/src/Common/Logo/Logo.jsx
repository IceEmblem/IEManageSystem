import 'bootstrap';
import 'bootstrapcss';

import './logo.css';
import Logopng from "./logo.png";
import React from 'react';
import ReactDOM from 'react-dom';

export default class Logo extends React.Component
{
    // props.className
    constructor(props) {
        super(props);
    }

    render()
    {
        return (
            <div className={"logo "+ this.props.className}>
                <div className="w-75">
                    <img src={Logopng} alt="" className="w-100" />
                </div>
            </div>
        );
    }
}
