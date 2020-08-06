import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IESearch/IComponent'
import IocContainer from 'Core/IocContainer';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

import './IESearch.css'

class IESearch extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ie-search">
                <Input placeholder="在 IceEmblem 中搜索" style={{border:"0px", backgroundColor: "fff0"}} prefix={<SearchOutlined />}  />
            </div>
        );
    }
}

IocContainer.registerSingleIntances(IComponent, IESearch);
