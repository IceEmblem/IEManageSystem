import React from 'react';

import { Select } from 'antd';
const { Option } = Select;

export default class IESelect extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        current: 'mail',
    };

    render() {
        return (
            <Select defaultValue="lucy" style={{ width: 120 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                    Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
            </Select>
        );
    }
}