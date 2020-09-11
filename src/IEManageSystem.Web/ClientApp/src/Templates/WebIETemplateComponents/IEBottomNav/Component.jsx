import React from "react";
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Setting from 'IETemplateComponents/IEBottomNav/Setting'
import BeianIcon from 'IETemplateComponents/IEBottomNav/BeianIcon.png'
import './IEBottomNav.css'

class Component extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = new Setting(this.getSetting("Setting"));

        let style = { color: setting.color };

        return (
            <div className="iebottomnav">
                <div className="d-flex justify-content-center" style={style}>
                    <small className="mr-3">
                        {setting.copyright}
                    </small>
                    <small>
                        {setting.text}
                    </small>
                </div>
                {
                    setting.code &&
                    <div className="d-flex justify-content-center pt-2 pb-2" style={style}>
                        <div className="d-flex align-items-center mr-1">
                            <img src={setting.beianIcon || BeianIcon} alt="" />
                        </div>
                        <div className="d-flex align-items-center" dangerouslySetInnerHTML={{ __html: setting.code }}></div>
                    </div>
                }
            </div>
        );
    }
}

export default Component;