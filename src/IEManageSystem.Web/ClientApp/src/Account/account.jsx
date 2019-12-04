import React from 'react';
import Title from "./Title.jsx";
import Content from "./Content.jsx";

import "./account.css";

export default class Account extends React.Component {
    render() {
        return (
            <div class="Content">
                <div class="space">
                    <div class="stars">
                        <div class="star"></div>
                        <div class="star pink"></div>
                        <div class="star blue"></div>
                        <div class="star yellow"></div>
                        <div class="star white"></div>
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