import React from 'react';

import { Button } from 'antd';

import IEButtonSetting from './IEButtonSetting.ts'

export default class IEButton extends React.Component {
    constructor(props) {
        super(props);

        this.setting = new IEButtonSetting(this.getButtonSetting());
    }

    getButtonSetting(){
        return this.props.pageComponentSettings.find(e=>e.name == "BtnSetting");
    }

    render() {
        this.setting.setSetting(this.getButtonSetting());

        return (
        <Button shape={this.setting.shape} type={this.setting.btnType} size={this.setting.size}>
            <a href={this.setting.url}>
                {this.setting.text}
            </a>
        </Button>
        );
    }
}