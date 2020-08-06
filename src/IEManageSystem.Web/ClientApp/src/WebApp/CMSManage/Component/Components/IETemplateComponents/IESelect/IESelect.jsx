import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IESelect/IComponent'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IESelect/Setting'
import IocContainer from 'Core/IocContainer';
import { Select } from 'antd';
const { Option } = Select;

class IESelect extends IComponent {
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

IocContainer.registerSingleIntances(IComponent, IESelect);
