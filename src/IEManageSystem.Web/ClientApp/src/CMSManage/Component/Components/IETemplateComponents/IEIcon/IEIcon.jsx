import React from 'react';

import { GithubOutlined } from '@ant-design/icons';

export default class IEIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href="javascript:void(0)">
                <GithubOutlined />
            </a>
        );
    }
}