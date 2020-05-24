import React from 'react';
import {Link} from 'react-router-dom'
import Setting from './Setting'

import { Select } from 'antd';
const { Option } = Select;


export default class IESelect extends React.Component {
    constructor(props) {
        super(props);

        this.setting = new Setting(this.getPageComponentSetting());
    }
    
    getPageComponentSetting(){
        return this.props.pageComponentSettings.find(e=>e.name == "Select");
    }

    render() {
        this.setting.setSetting(this.getPageComponentSetting());

        return (
            <Select defaultValue="" >
                {this.setting.getSeleteDatas().map((item,index)=>(
                <Option key={index} value={item.url}><a href={item.url}>{item.text}</a></Option>))}
            </Select>
        );
    }
}