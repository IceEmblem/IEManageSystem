import React from 'react';
import ReactDOM from 'react-dom';

import './Tab.css';

export default class Tab extends React.Component
{
    // props.tabs       []
    // props.nameField
    // props.selectIndex
    // props.children
    // props.selectOnclick(tab, index)
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let lis = this.props.tabs.map((item, index) =>
            <li className="nav-item" key={index}>
                <a className={index == this.props.selectIndex ? "ie-nav-link active" : "ie-nav-link"} href="javascript:void(0)"
                    onClick={() => this.props.selectOnclick(item, index)}>{item[this.props.nameField]}</a>
            </li>);

        return (
            <div className="ie-tab h-100">
                <div>
                    <ul className="nav nav-tabs">
                        {lis}
                    </ul>
                </div>
                <div className="ie-tab-content">
                    {this.props.children}
                </div>
            </div>
            );
    }
}