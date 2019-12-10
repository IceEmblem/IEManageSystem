import React from 'react';
import Title from "./Title.jsx";
import Content from "./Content.jsx";

import "./account.css";

export default class Account extends React.Component {
    render() {
        return (
            <div className="Content">
                <div className="space">
                    <div className="stars">
                        <div className="star"></div>
                        <div className="star pink"></div>
                        <div className="star blue"></div>
                        <div className="star yellow"></div>
                        <div className="star white"></div>
                    </div>
                </div>
                <div className="row account">
                    <Title />
                    <Content />
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-bottom">
                        <small className="text-white">
                            Copyright © 2019 by IceEmblem. All rights reserved.
                        </small>
                        <small className="text-white ml-auto">
                            由冰纹工作室开发开发
                        </small>
                    </nav>
                </div>
            </div>
        );
    }
}