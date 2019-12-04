import React from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu/Menu.jsx";
import PageEdit from "./PageEdit"
import PageManage from './PageManage/PageManage.jsx'
import PageData from './PageData/PageData.jsx'
import PostEdit from './PostEdit'
import PictureManage from './PictureManage'

export default class CMSManage extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        return (
        <div className="w-100 h-100 overflow-auto-y">
            <Switch>
                <Route path="/ManageHome/CMSManage/Menu" component={Menu} />
                <Route path="/ManageHome/CMSManage/PageManage" component={PageManage} />
                <Route path="/ManageHome/CMSManage/PageEdit/:pageName" component={PageEdit} />
                <Route path="/ManageHome/CMSManage/PageData/:pageName" component={PageData} />
                <Route path="/ManageHome/CMSManage/PostEdit/:pageName/:pageDataName?" component={PostEdit} />
                <Route path="/ManageHome/CMSManage/PictureManage" component={PictureManage} />
            </Switch>
        </div>);
    }
}