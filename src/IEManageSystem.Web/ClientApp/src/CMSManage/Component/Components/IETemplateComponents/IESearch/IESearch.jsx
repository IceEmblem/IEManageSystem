import React from 'react';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

import './IESearch.css'

export default class IESearch extends React.Component {
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