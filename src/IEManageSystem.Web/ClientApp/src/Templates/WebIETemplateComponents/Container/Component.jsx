import React from 'react'
import IComponent from 'IETemplateComponents/Container/IComponent'

import './Container.css'

class Component extends IComponent {
    render() {
        let setting = this.getCurrentSetting();

        return (
            <div
                style={{
                    ...this.baseStyle,
                    width: '100%',
                    height: '100%',
                    display: "flex",
                    flexDirection: setting.direction,
                    justifyContent: setting.justifyContent,
                    alignItems: setting.alignItems,
                    alignContent: setting.alignContent,
                    flexWrap: setting.wrap,
                    overflowY: 'hidden',
                    ...this.getCommonStyleSetting().toStyle(),
                }}
            >
                {this.props.children}
            </div>);
    }
}

export default Component;