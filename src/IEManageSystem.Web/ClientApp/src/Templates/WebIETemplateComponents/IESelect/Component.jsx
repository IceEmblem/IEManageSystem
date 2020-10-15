import React from 'react';
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Setting from 'IETemplateComponents/IESelect/Setting'
import { Select } from 'antd';
const { Option } = Select;

class Component extends IComponent {
    render() {
        let setting = new Setting(this.getSetting("Select"));

        return (
            <Select style={this.baseStyle} defaultValue="No Select" size={setting.size} >
                {setting.getSeleteDatas().map((item,index)=>(
                <Option key={index} value={item.url}><a href={item.url}>{item.text}</a></Option>))}
            </Select>
        );
    }
}

export default Component;
