import React from 'react'
import { BaseContainerComponent } from '../../BaseComponents/BaseContainerComponent'
import Setting from './Setting'

import './Container.css'


class Container extends BaseContainerComponent {
    constructor(props) {
        super(props);

        this.setting = new Setting(this.getFlexSetting());
    }

    getFlexSetting() {
        return this.props.pageComponentSettings.find(e => e.name == "FlexSetting");
    }

    render() {
        this.setting.setSetting(this.getFlexSetting());


        return (<div className={`containercss ${this.setting.direction || ""} ${this.setting.justifyContent || ""} ${this.setting.alignItems || ""} ${this.setting.wrap || ""} ${this.setting.alignContent || ""} `}>
            {this.props.children}
        </div>);
    }
}

Container.defaultProps = {
};

export default Container;