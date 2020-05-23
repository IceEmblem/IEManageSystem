import React from 'react';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

export default class IESearch extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Input placeholder="在 IceEmblem 中搜索" style={{width:"200px", border:"0px"}} prefix={<SearchOutlined />}  />
        );
    }
}