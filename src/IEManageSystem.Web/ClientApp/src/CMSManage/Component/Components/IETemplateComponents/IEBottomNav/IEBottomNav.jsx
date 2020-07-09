import React from "react";
import { BaseStaticComponent, BaseStaticComponentProps } from '../../BaseComponents/BaseStaticComponent';
import Setting from './Setting'
import './IEBottomNav.css'
import BeianIcon from './BeianIcon.png'

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
        let style = { color: this.setting.color };

        return (
            <div className="iebottomnav">
                <div className="d-flex justify-content-center" style={style}>
                    <small className="mr-3">
                        {this.setting.copyright}
                    </small>
                    <small>
                        {this.setting.text}
                    </small>
                </div>
                {
                    this.setting.code &&
                    <div className="d-flex justify-content-center pt-2 pb-2" style={style}>
                        <div className="d-flex align-items-center mr-1">
                            <img src={this.setting.beianIcon || BeianIcon} alt="" />
                        </div>
                        <div className="d-flex align-items-center" dangerouslySetInnerHTML={{ __html: this.setting.code }}></div>
                    </div>
                }
            </div>
        );
    }
}