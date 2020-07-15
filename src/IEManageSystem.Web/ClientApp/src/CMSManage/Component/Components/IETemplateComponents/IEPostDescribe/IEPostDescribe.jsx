import React from 'react';
import {BaseStaticComponent} from '../../BaseComponents/BaseStaticComponent';

import { Typography } from 'antd';

export default class IEPostDescribe extends BaseStaticComponent {
    render() {
        let title = this.props.pageData.title || "这里是文章的简短描述";

        return (<p className="mb-0">{title}</p>);
    }
}