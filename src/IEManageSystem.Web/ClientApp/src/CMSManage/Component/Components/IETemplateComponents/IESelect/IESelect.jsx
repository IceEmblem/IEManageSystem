import React from 'react';
import {BaseStaticComponent} from '../../BaseComponents/BaseStaticComponent';
import Setting from './Setting'

import { Select } from 'antd';
const { Option } = Select;


export default class IESelect extends BaseStaticComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = new Setting(this.getSetting("Select"));

        return (
            <Select defaultValue="No Select" size={setting.size} >
                {setting.getSeleteDatas().map((item,index)=>(
                <Option key={index} value={item.url}><a href={item.url}>{item.text}</a></Option>))}
            </Select>
        );
    }
}