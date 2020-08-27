import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEImg/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IEImg/Data'
import { Empty } from 'antd'

class IEImg extends IComponent {
    render() {
        let data = new Data(this.props.componentData);

        return <a href={data.linkUrl || 'javescript:void(0)'}>
            <div className="w-100">
                {
                    data.imgUrl ?
                        <img className="w-100" alt="未找到图片" src={data.imgUrl} style={{ height: data.imgHeigth }}></img>
                        : <Empty />
                }
                <p style={{ textAlign: "center" }} className="mt-3">{data.text}</p>
            </div>
        </a>
    }
}

export default (register) => register(IComponent, IEImg);
