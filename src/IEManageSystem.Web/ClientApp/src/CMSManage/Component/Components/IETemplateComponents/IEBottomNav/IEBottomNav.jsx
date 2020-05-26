import React from "react";
import { BaseStaticComponent, BaseStaticComponentProps } from '../../BaseComponents/BaseStaticComponent';
import Setting from './Setting'
import './IEBottomNav.css'

export default class IEBottomNav extends BaseStaticComponent {
    constructor(props) {
        super(props);

        this.setting = new Setting(this.getPageComponentSetting());
    }

    getPageComponentSetting() {
        return this.props.pageComponentSettings.find(e => e.name == "Setting");
    }

    render() {
        this.setting.setSetting(this.getPageComponentSetting());

        return (
            <div className="iebottomnav">
                <small>&nbsp;</small>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-bottom">
                    <small className="text-white">
                        {this.setting.copyright}
                    </small>
                    <small className="text-white ml-auto">
                        {this.setting.text}
                    </small>
                </nav>
            </div>
        );
    }
}