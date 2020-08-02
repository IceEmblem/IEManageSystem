import React from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu/Menu.jsx";
import PageManage from './PageManage/PageManage.jsx'
import PageData from './PageData/PageData.jsx'
import PictureManage from './PictureManage'
import LogicManage from './LogicManage'
import MenuListManage from './MenuListManage'
import TemplateManage from './TemplateManage'
import TemplatePageManage from './TemplatePageManage'

export default class CMSManage extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        return (
        <div className="w-100 h-100 overflow-auto-y">
            <Switch>
                <Route path="/ManageHome/CMSManage/Menu/:menuName" component={Menu} />
                <Route path="/ManageHome/CMSManage/MenuListManage" component={MenuListManage} />
                <Route path="/ManageHome/CMSManage/PageManage" component={PageManage} />
                <Route path="/ManageHome/CMSManage/PageData/:pageName?" component={PageData} />
                <Route path="/ManageHome/CMSManage/PictureManage" component={PictureManage} />
                <Route path="/ManageHome/CMSManage/LogicManage" component={LogicManage} />
                <Route path="/ManageHome/CMSManage/TemplateManage" component={TemplateManage} />
                <Route path="/ManageHome/CMSManage/TemplatePageManage/:templateName" component={TemplatePageManage} />
            </Switch>
        </div>);
    }
}