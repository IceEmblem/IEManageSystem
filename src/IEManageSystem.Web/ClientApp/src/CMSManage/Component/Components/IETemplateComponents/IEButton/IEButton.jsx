import React from 'react';

import { Button } from 'antd';

export default class IEButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button type="primary">开始使用</Button>
        );
    }
}