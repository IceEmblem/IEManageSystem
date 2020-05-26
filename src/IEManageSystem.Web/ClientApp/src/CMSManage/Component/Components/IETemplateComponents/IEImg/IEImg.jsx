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

        return <div className="w-100">
            <img className="w-100" alt="未找到图片" src={this.data.imgUrl}></img>
            <p style={{textAlign: "center"}} className="mt-3">{this.data.text}</p>
        </div>
    }
}