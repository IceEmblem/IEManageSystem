import React from 'react';
import { Switch, Route } from "react-router-native";

import PageContainer from './PageContainer'
import { View } from 'react-native'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/Page/:pageName?/:pageDataName?"
                    render={(props) => <PageContainer {...props} />}
                />
                <Route exact path="/"
                    render={(props) => <PageContainer {...props} />}
                />
            </Switch>
        );
    }
}