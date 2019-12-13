import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import UserInfo from "./UserInfo/UserInfo.jsx";
import AccountSecurity from "./AccountSecurity/AccountSecurity.jsx";

export default class Personal extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div className="w-100 h-100 overflow-auto-y">
                <Switch>
                    <Route path="/ManageHome/Personal/UserInfo" component={UserInfo} />
                    <Route path="/ManageHome/Personal/AccountSecurity" component={AccountSecurity} />
                </Switch>
            </div>
        );
    }
}