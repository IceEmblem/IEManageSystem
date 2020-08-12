import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IESearch/IComponent'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

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

export default (register) => register(IComponent, IESearch);
