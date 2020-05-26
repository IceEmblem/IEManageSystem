import React from 'react';
import { BaseContentLeafComponent } from '../../BaseComponents/BaseContentLeafComponent'

import Data from './Data'

export default class IEImg extends BaseContentLeafComponent {
    constructor(props) {
        super(props);

        this.data = new Data(this.props.componentData);
    }

    render() {
        this.data.setData(this.props.componentData);

        return <div>
            <img alt="未找到图片" src={this.data.imgUrl}></img>
            <p className="mt-3">{this.data.text}</p>
        </div>
    }
}