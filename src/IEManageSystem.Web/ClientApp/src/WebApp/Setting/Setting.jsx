import React from "react";
import { Switch, Route } from "react-router-dom";
import SiteSetting from './SiteSetting';
import ThemeSetting from './ThemeSetting'

export default class Setting extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        return (
        <div className="w-100 h-100 overflow-auto-y">
            <Switch>
                <Route path="/ManageHome/Setting/SiteSetting" component={SiteSetting} />
                <Route path="/ManageHome/Setting/ThemeSetting" component={ThemeSetting} />
            </Switch>
        </div>);
    }
}