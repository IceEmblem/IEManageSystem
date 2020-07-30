import React from 'react';
import { Link } from 'react-router-dom';
import { BankOutlined } from '@ant-design/icons';
import NavToolProvider from '../NavTools/NavToolProvider'

import './Nav.css';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={`d-flex pr-3 ${this.props.className}`}>
                <span className="mr-3">
                    <Link to="/ManageHome/Index" className="antlayout-nav-iconsize"><BankOutlined /></Link>
                </span>
                {
                    NavToolProvider.getLeftComponents()
                }
                <div className="flex-grow-1"></div>
                {
                    NavToolProvider.getRightComponents()
                }
            </div>
        );
    }
}