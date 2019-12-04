import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import './BodyDiv.css';
import MenuProvider from 'Core/Menu/MenuProvider'

import Index from "./Index/Index.jsx";

export default class BodyDiv extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div className="content-container">
                <Switch>
                    <Route key={0} exact path="/ManageHome" component={Index} />
                    <Route key={1} exact path="/ManageHome/Index" component={Index} />
                    {new MenuProvider().getNavMenuComponents().map(
                        (item, index) => <Route key={2+index} path={item.beseUrl} component={item.component} />)}
                </Switch>
            </div>
        );
    }
}