import React from 'react'
import IComponent from 'IETemplateComponents/Container/IComponent'

import './Container.css'

class Component extends IComponent {
    render() {
        let setting = this.getCurrentSetting();
        let cusStyle = this.getCommonStyleSetting().toStyle();

        return (
            <div
                style={{
                    ...this.baseStyle,
                    height: '100%',
                    display: "flex",
                    flexDirection: setting.direction,
                    justifyContent: setting.justifyContent,
                    alignItems: setting.alignItems,
                    alignContent: setting.alignContent,
                    flexWrap: setting.wrap,
                    overflowY: 'hidden',
                    ...cusStyle
                }}
            >
                {this.props.children}
            </div>);
    }
}

export default Component;