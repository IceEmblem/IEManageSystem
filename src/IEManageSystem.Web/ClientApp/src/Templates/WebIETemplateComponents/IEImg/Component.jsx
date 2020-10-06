import React from 'react';
import IComponent from 'IETemplateComponents/IEImg/IComponent'
import { withRouter } from 'react-router-dom'
import nofindJpg from 'images/nofind480x300.jpg'
import './index.css'

class Component extends IComponent {
    render() {
        let data = this.getCurrentData();
        let setting = this.getCurrentSetting();

        let child;
        if (this.props.children.length > 0) {
            child = this.props.children[0];
        }

        return <div style={{...this.baseStyle, cursor: 'pointer', position: 'relative' }} className='w-100'
            onClick={()=>{
                if(!this.click()){
                    window.location.href = data.linkUrl
                }
            }}
        >
            <div className='w-100 d-flex justify-content-center'>
                <img alt="未找到图片" src={this.getImgUrl()} style={{...this.getImgStyle(), ...{objectFit: 'cover'}}}></img>
            </div>
            <div style={{
                left: 0,
                top: 0,
                width: '100%',
                height: setting.position == 'onimg' ? '100%' : 'auto',
                position: setting.position == 'onimg' ? 'absolute' : 'relative'
            }}
            >
                {child}
            </div>
        </div>
    }
}

export default withRouter(Component);
