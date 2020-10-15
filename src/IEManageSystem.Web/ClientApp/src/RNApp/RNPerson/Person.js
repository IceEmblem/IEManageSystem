import React from 'react';
import { Switch, Route } from 'react-router-native';
import UserInfo from "./UserInfo";
import Login from './Login'

export default class Personal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/Personal" component={UserInfo} />
                <Route path="/Personal/UserInfo" component={UserInfo} />
                <Route path="/Personal/Login" component={Login} />
            </Switch>
        );
    }
}