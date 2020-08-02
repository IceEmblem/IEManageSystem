import React from 'react'
import { BaseContainerComponent } from '../../BaseComponents/BaseContainerComponent'
import Setting from './Setting'

import './Container.css'


class Container extends BaseContainerComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = new Setting(this.getSetting("FlexSetting"));

        return (<div className={`containercss ${setting.direction || ""} ${setting.justifyContent || ""} ${setting.alignItems || ""} ${setting.wrap || ""} ${setting.alignContent || ""} `}>
            {this.props.children}
        </div>);
    }
}

Container.defaultProps = {
};

export default Container;