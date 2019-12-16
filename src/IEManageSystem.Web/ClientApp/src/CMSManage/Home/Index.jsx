import React from 'react';
import { Switch, Route } from "react-router-dom";

import PageContainer from './PageContainer/PageContainer.jsx'

require('./Index.css');

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let contentWidth = $(".content").width();

        let contentListWidth = $(".content-list").width();

        let maxoffsetx = contentListWidth - contentWidth;

        $('.content-list').on('mousewheel', function (event) {
            let left = parseInt($(this).css("left").replace("px", ""));
            let offsetx = event.deltaY * 30;
            let newLeft = left + offsetx;

            if (-newLeft >= 0 && -newLeft <= maxoffsetx) {
                //左右滚动时让鼠标水平移动
                $(this).css("left", newLeft + "px");
            }
        });
    }

    render() {
        return (
            <div className="front-container">
                <div>
                    <div className="container-fluid">
                        <Switch>
                            <Route exact path="/Page/:pageName?/:pageDataName?"
                                render={(props) => <PageContainer {...props} />}
                            />
                            <Route exact path="/"
                                render={(props) => <PageContainer {...props} />}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}