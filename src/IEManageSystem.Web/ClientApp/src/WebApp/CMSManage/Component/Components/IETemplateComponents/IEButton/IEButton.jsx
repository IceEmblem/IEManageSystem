import React from 'react';
import {BaseStaticComponent} from '../../BaseComponents/BaseStaticComponent';
import { Button } from 'antd';

import IEButtonSetting from './IEButtonSetting.ts'

export default class IEButton extends BaseStaticComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = new IEButtonSetting(this.getSetting("BtnSetting"));

        return (
        <Button shape={setting.shape} type={setting.btnType} size={setting.size}>
            <a href={setting.url}>
                {setting.text}
            </a>
        </Button>
        );
    }
}