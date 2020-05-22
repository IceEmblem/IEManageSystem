import React from "react";
import { BaseStaticComponent, BaseStaticComponentProps } from '../../BaseComponents/BaseStaticComponent';

import './IEBottomNav.css'

export default class IEBottomNav extends BaseStaticComponent {
    render() {
        return (
            <div className="iebottomnav">
                <small>&nbsp;</small>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-bottom">
                    <small className="text-white">
                        Copyright © 2019 by IceEmblem. All rights reserved.
                    </small>
                    <small className="text-white ml-auto">
                        由冰纹工作室开发开发
                    </small>
                </nav>
            </div>
        );
    }
}