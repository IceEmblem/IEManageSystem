import React from 'react';
import { Switch, Route } from "react-router-dom";

import PageContainer from './PageContainer.jsx'

require('./index.css');

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="front-container">
                <Switch>
                    <Route exact path="/Page/:pageName?/:pageDataName?"
                        render={(props) => <PageContainer {...props} />}
                    />
                    <Route exact path="/"
                        render={(props) => <PageContainer {...props} />}
                    />
                </Switch>
            </div>
        );
    }
}