import React from 'react'

import { Input } from 'antd';
const { Search } = Input;

export default class SearchBoxTool extends React.Component {
    render() {
        return (
            <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
            />
        );
    }
}