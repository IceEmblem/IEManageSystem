import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEImg/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IEImg/Data'
import nofindJpg from 'images/nofind480x300.jpg'
import './index.css'

class IEImg extends IComponent {
    render() {
        let data = new Data(this.props.componentData);

        let child;
        if (this.props.children.length > 0) {
            child = this.props.children[0];
        }

        return <a style={{ textDecoration: 'none', position: 'relative' }} className='w-100' href={data.linkUrl || 'javescript:void(0)'}>
            <img className="w-100" alt="未找到图片" src={data.imgUrl || nofindJpg} style={{ height: data.imgHeigth, width: data.imgWidth }}></img>
            <div style={{
                left: 0,
                top: 0,
                width: '100%',
                height: data.position == 'onimg' ? '100%' : 'auto',
                position: data.position == 'onimg' ? 'absolute' : 'relative'
            }}
            >
                {child}
            </div>
        </a>
    }
}

export default (register) => register(IComponent, IEImg);
