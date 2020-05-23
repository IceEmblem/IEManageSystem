import React from 'react';
import "./Test.css";

import PageEditCompontContainer from 'CMSManage/Component/ComponentContainers/PageEditCompontContainer'

import PageComponentModel from "CMSManage/Models/Pages/PageComponentModel"

const IEButtonData = {
    "name": "IEButton",
    "sign": "1",
    "parentSign": null,
    "pageComponentBaseSetting": {
        "sortIndex": 1,
        "margin": null,
        "backgroundColor": null,
        "className": null,
        "col": null,
        "height": null,
        "padding": null,
        "width": null,
        "backgroundImage": null
    },
    "targetPageId": null,
    "componentType": "LeafComponent",
    "pageComponentSettings": []
}


export default class Test extends React.Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <div style={{width:"100px"}}>
                    <PageEditCompontContainer 
                        pageComponent={new PageComponentModel(IEButtonData)}
                    />
                </div>
            </div>
        );
    }
}