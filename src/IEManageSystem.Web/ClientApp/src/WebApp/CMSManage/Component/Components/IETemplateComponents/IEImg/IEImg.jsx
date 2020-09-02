import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEImg/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IEImg/Data'
import { Empty } from 'antd'

import './index.css'

class IEImg extends IComponent {
    render() {
        let data = new Data(this.props.componentData);

        let child;
        if(this.props.children.length > 0){
            child = this.props.children[0];
        }

        return <a className='w-100 h-100' style={{overflow: 'hidden'}} href={data.linkUrl || 'javescript:void(0)'}>
            <div className="w-100">
                {
                    data.imgUrl ?
                        <img className="w-100" alt="未找到图片" src={data.imgUrl} style={{ height: data.imgHeigth, width: data.imgWidth }}></img>
                        : <Empty />
                }
                {child}
            </div>
        </a>
    }
}

export default (register) => register(IComponent, IEImg);
